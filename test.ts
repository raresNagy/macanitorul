import fs from "fs"
const file = JSON.parse(fs.readFileSync('Bots.json', 'utf8'))
console.log(file.object.color)