import * as path from 'path'
import * as fs from 'fs/promises'
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import express from 'express'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient()

const app = express()
const port = 3000

async function saveImageFromCanvasBuffer(canvasBuffer, filename) {
  try {
    await fs.writeFile(filename, canvasBuffer)
    console.log("The file was saved!");
  } catch (error) {
    console.log(error)
  }
}

async function buildImg() {
  const countries = await prisma.country.findMany({
    include: {
      ips: {
        include: {
          requests: true
        }
      }
    }
  })

  const countriesData = countries.map(country => {
    return {
      country: country.country,
      country_code: country.country_code,
      ips: country.ips.length,
      requests: country.ips.reduce((acc, current) => acc + current.requests.length, 0)
    }
  }).sort((a, b) => b.requests - a.requests)

  const flagDims = {
    width: 144,
    height: 108
  }
  const matrixWidth = Math.ceil(Math.sqrt(countriesData.length))
  const matrixHeight = Math.ceil(countriesData.length / matrixWidth)
  const width = matrixWidth * flagDims.width
  const height = flagDims.height * matrixWidth - (98/108 * flagDims.height) * (matrixHeight === matrixWidth ? 0 : 1)
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')



  let flagImagePromises = []
  countriesData.forEach((country) => {
    flagImagePromises.push(loadImage(`https://flagpedia.net/data/flags/icon/${flagDims.width}x${flagDims.height}/${country.country_code.toLowerCase()}.png`))
  })

  let loadedImages = await Promise.all(flagImagePromises)

  loadedImages.forEach((image, index) => {
    const row = Math.floor(index / matrixWidth)
    const col = index % matrixWidth
    const x = (index % matrixWidth) * flagDims.width
    const y = Math.floor(index / matrixWidth) * flagDims.height - (Math.floor(flagDims.height * 0.1) * row)
    ctx.drawImage(image, x, y + (matrixWidth - col - 1) * flagDims.height * 0.1, flagDims.width, flagDims.height)

    ctx.font = "18px sans-serif";
    const reqOrReqs = countriesData[index].requests === 1 ? 'req' : 'reqs'
    const reqOrReqsMesure = ctx.measureText(reqOrReqs)
    ctx.fillStyle = 'white'
    ctx.fillText(reqOrReqs, (col + 1) * flagDims.width - reqOrReqsMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1))
    ctx.fillStyle = 'black'
    ctx.strokeText(reqOrReqs, (col + 1) * flagDims.width - reqOrReqsMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1))

    ctx.font = "24px sans-serif";
    const reqNumberMesure = ctx.measureText(countriesData[index].requests)
    ctx.fillStyle = 'white'
    ctx.fillText(countriesData[index].requests, (col + 1) * flagDims.width - reqOrReqsMesure.width - reqNumberMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1))
    ctx.fillStyle = 'black'
    ctx.strokeText(countriesData[index].requests, (col + 1) * flagDims.width - reqOrReqsMesure.width - reqNumberMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1))

    ctx.font = "18px sans-serif";
    const ipOrIps = countriesData[index].ips === 1 ? 'ip' : 'ips'
    const ipOrIpsMesure = ctx.measureText(ipOrIps)
    ctx.fillStyle = 'white'
    ctx.fillText(ipOrIps, (col + 1) * flagDims.width - ipOrIpsMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1) - reqOrReqsMesure.emHeightAscent * 1.2)
    ctx.fillStyle = 'black'
    ctx.strokeText(ipOrIps, (col + 1) * flagDims.width - ipOrIpsMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1) - reqOrReqsMesure.emHeightAscent * 1.2)

    ctx.font = "24px sans-serif";
    const ipNumberMesure = ctx.measureText(countriesData[index].ips)
    ctx.fillStyle = 'white'
    ctx.fillText(countriesData[index].ips, (col + 1) * flagDims.width - ipOrIpsMesure.width - ipNumberMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1) - reqOrReqsMesure.emHeightAscent * 1.2)
    ctx.fillStyle = 'black'
    ctx.strokeText(countriesData[index].ips, (col + 1) * flagDims.width - ipOrIpsMesure.width - ipNumberMesure.width, flagDims.height * (row + 1.05) - reqOrReqsMesure.emHeightAscent + (matrixWidth - col - 1) * flagDims.height * 0.1 - (flagDims.height * row * 0.1) - reqOrReqsMesure.emHeightAscent * 1.2)
  })

  return canvas.toBuffer()
}

async function buildAndSaveImg() {
  saveImageFromCanvasBuffer(await buildImg(), 'public/img.png')
}

buildAndSaveImg()
const interval = setInterval(() => {
  console.log('Building and saving image at ' + (new Date()).toISOString() + '...')
  buildAndSaveImg()
}, 1000 * 60 * 10)

app.use('/public', express.static('public'))
app.use(async (req, res, next) => {
  if(['/app','/ip', '/request', '/country', '/favicon.ico'].includes(req.url) || req.url.startsWith('/public') || req.url.startsWith('/img')) return next()
  try {
    let ip = req.headers['x-forwarded-for']
    if(!ip) ip = ['12.76.98.121', '54.13.197.201', '112.76.98.121', '154.13.197.201', '122.100.100.100', '123.100.100.100', '124.100.100.100', '128.100.100.100'][Math.floor(Math.random() * 8)] // for dev only, never true in prod
    console.log(ip)
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
  res.send(ips.map(ipObj => {
    const {ip, ...noIp} = ipObj
    return noIp
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
  res.send(countries.sort((a, b) => b.ips.reduce((acc, current) => acc + current.requests.length, 0) - a.ips.reduce((acc, current) => acc + current.requests.length, 0)).map(countryObj => {
    countryObj.ips = countryObj.ips.map(ipObj => {
      const {ip, ...noIp} = ipObj
      return noIp
    })
    return countryObj
    }))
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
  res.send(requests.map(requestObj => {
    let {ip: ipObj, ...noIp} = requestObj
    let {ip, ...noIpObj} = ipObj
    requestObj.ip = noIpObj
    return requestObj
  }))
})

app.get('/img', async (req, res) => {
  let img
  try {
    img = await fs.readFile('public/img.png')
  } catch (error) {
    res.status(500).send('Error')
  }

  res.setHeader('Content-Type', 'image/png')
  res.send(img)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

