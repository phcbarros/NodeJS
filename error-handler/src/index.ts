import dotenv from 'dotenv'
import {app} from './app'

dotenv.config()

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

function handle(signal: unknown) {
  console.log(`*^!@4=> Received event: ${signal}`)
}
process.on('SIGHUP', handle)
