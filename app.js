import * as path from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use('/public', express.static('public'))
app.use(async (req, res, next) => {
  if(['/app','/ip', '/request', '/country', '/favicon.ico'].includes(req.url) || req.url.startsWith('/public')) return next()
  try {
    const ip = req.headers['x-forwarded-for']
    const method = req.method
    const route = req.url
    const protocol = req.protocol
    const referer = req.headers.referer
    const user_agent = req.headers['user-agent']
    
    let ipData = await prisma.ip.findUnique({
      where: {
        ip
      }
    })
  
    let location = null
    if(!ipData) {
        location = (await axios.get(`http://ip-api.com/json/${ip}`))
  
        await prisma.organization.upsert({
            where: {
              org: location.data.org
            },
            create: {
                isp: location.data.org,
                org: location.data.org,
                as: location.data.as,
            },
            update: {}
        })
  
        const country = await prisma.country.upsert({
            where: {
              country: location.data.country
            },
            create: {
                country: location.data.country,
                country_code: location.data.countryCode,
            },
            update: {}
        })
  
        let region = await prisma.region.findFirst({
          where: {
            region: location.data.region,
            country: {
              id: country.id
            }
          }
        })
  
        if(!region) {
          region = await prisma.region.create({
            data: {
                region: location.data.region,
                region_name: location.data.regionName,
                country: {
                  connect: {
                    country: location.data.country
                  }
                }
            }
          })
        }
  
        let city = await prisma.city.findFirst({
          where: {
            city: location.data.city,
            region: {
              id: region.id
            }
          }
        })
  
        if(!city) {
          city = await prisma.city.create({
            data: {
              city: location.data.city,
              zip: location.data.zip,
              region: {
                connect: {
                  id: region.id
                }
              }
            }
          })
        }
  
        const timezone = await prisma.timezone.upsert({
          where: {
            timezone: location.data.timezone
          },
          create: {
            timezone: location.data.timezone,
          },
          update: {}
        })

        ipData = await prisma.ip.upsert({
          where: {
            ip
          },
          create: {
              ip,
              organization: {
                connect: {
                  org: location.data.org
                }
              },
              country: {
                connect: {
                  country: location.data.country
                }
              },
          },
          update: {}
        })
  
        let coordinate = await prisma.coordinate.findFirst({
          where: {
            latitude: location.data.lat,
            longitude: location.data.lon
          }
        })
  
        if(!coordinate) {
          coordinate = await prisma.coordinate.create({
            data: {
              latitude: location.data.lat,
              longitude: location.data.lon,
              timezone: {
                connect: {
                  timezone: location.data.timezone,
                },
              },
              ip: {
                connect: {
                  ip: ipData.ip
                }
              }

            }
          })
        }
  
        
  
      }

      const request = await prisma.request.create({
        data: {
          horo: (new Date()).toISOString(),
          method,
          route,
          protocol,
          referer,
          user_agent,
          ip: {
            connect: {
              ip
            }
          }
        }
      })

  } catch (error) {
    console.log(error)
  }
    next()
})

app.get('/', (req, res) => {
  res.redirect('/app')
})

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/ip', async (req, res) => {
  let ips = await prisma.ip.findMany({
    include: {
      organization: true,
      coordinate: {
        include: {
          timezone: true
        }
      },
      requests: true,
      country: {
        include: {
          regions: {
            include: {
              cities: true
            }
          }
        }
      }
    }
  })
  res.send(ips.map(ip => {
    delete ip.ip
    
  }))
})

app.get('/country', async (req, res) => {
  let countries = await prisma.country.findMany({
    include: {
      regions: {
        include: {
          cities: true
        }
      },
      ips: {
        include: {
          organization: true,
          requests: true,
          coordinate: {
            include: {
              timezone: true
            }
          }
        }
      }
    }
  })
  res.send(countries.sort((a, b) => b.ips.reduce((acc, current) => acc + current.requests.length, 0) - a.ips.reduce((acc, current) => acc + current.requests.length, 0)))
})



app.get('/request', async (req, res) => {
  let requests = await prisma.request.findMany({
    include: {
      ip: {
        include: {
          organization: true,
          country: true
        }
      }
    }
  })
  res.send(requests)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

