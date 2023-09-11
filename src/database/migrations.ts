export function migrations(): void {
  const fs = require('fs')
  fs.readdir(
    __dirname,
    async function (err: NodeJS.ErrnoException | null, files: string[]) {
      if (err) {
        return console.log('Unable to scan directory: ' + err)
      }

      for (const file of files) {
        if (file.endsWith('Table.ts')) {
          const migrateFile = require(`../database/${file}`)
          await migrateFile['default'].run()
        }
      }
    }
  )
}

migrations()
