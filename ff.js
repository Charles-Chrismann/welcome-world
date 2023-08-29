import * as fs from 'fs/promises'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  let rows = []
  const logsFiles = await fs.readdir('./logs')
  let fileContentPromises = []
  logsFiles.forEach(async (file) => {
    fileContentPromises.push(fs.readFile(`./logs/${file}`, 'utf8'))
  })
  let fileContent = await Promise.all(fileContentPromises)
  fileContent.forEach(async (fileContentPromise) => {
    fileContentPromise = fileContentPromise.split('\n')
    fileContentPromise.pop()
    rows = rows.concat(fileContentPromise)
  })
  console.log(rows.length)

  const rowsPromises = rows.map(async (row) => {
    const rowArray = row.split(' ')
    const ip = rowArray.splice(0, 1)[0]
    rowArray.splice(0, 1)
    const remote_user = rowArray.splice(0, 1)[0]

    // Diviser la chaîne en parties pour extraire les éléments nécessaires
    const [day, month, year, hour, min, sec] = (rowArray.splice(0, 1)[0].replace('[', '') + ' ' + rowArray.splice(0, 1)[0].replace(']', '')).split(/[/:\s]/);

    // Convertir le mois en valeur numérique (0-11)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = months.indexOf(month);
    const numericMonth = monthIndex >= 0 ? monthIndex : 0;

    // Créer un objet Date en utilisant les éléments extraits
    const date = new Date(Date.UTC(Number(year), numericMonth, Number(day), hour, min, sec));
    const horo = date.toISOString();

    let method = rowArray.splice(0, 1)[0].replace('"', '')
    if(!["GET", "POST", "HEAD", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH" ].includes(methode)) {
      // if(!rowArray[1].startsWith('HTTP/')) rowArray.unshift(null, null)

      while(!(rowArray[0] && !isNaN(parseInt(rowArray[0])) && rowArray[0] < 550)) {
        // console.log(rowArray[0])
        methode += ' ' + rowArray.splice(0, 1)[0].replace('"', '')
      }
      rowArray.unshift(null, null)
      
      if(rowArray.length !== 7) {
        // console.log(methode)
        console.log(row)
        console.log(rowArray)
        return
      }
    }
    const route = rowArray.splice(0, 1)[0]
    const protocol = rowArray[0] ? rowArray.splice(0, 1)[0].replace('"', '') : rowArray.splice(0, 1)[0]
    const status = parseInt(rowArray.splice(0, 1)[0])
    const size = parseInt(rowArray.splice(0, 1)[0])
    const referer = rowArray.splice(0, 1)[0].replaceAll('"', '')
    const forwarded_for = rowArray.pop().replaceAll('"', '')
    const user_agent = rowArray.join(' ').replaceAll('"', '')
    return prisma.ip.create({
      data: {
        ip,
        horo,
        method,
        route,
        protocol,
        referer,
        user_agent,
      }
    })
  })
  await Promise.all(rowsPromises)
  console.log('done')
}


main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })