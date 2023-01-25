import express from 'express'
import {getRoutes} from './routes'

const app = express()

app.use(getRoutes())

export {app}
