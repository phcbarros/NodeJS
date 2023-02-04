import dotenv from 'dotenv'
import {app} from './app'

dotenv.config()

const port = process.env.PORT || 3000

function startServer() {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    process.exit(1)
  }
}

function handle(signal: string) {
  console.log(`*^!@4=> Received event: ${signal}`)
}
process.on('SIGHUP', handle)

function closeGracefully(signal: string) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`)

  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.kill(process.pid, signal)
}
process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

startServer()
