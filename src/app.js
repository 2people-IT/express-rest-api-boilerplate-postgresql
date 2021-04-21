import http from 'http'
import { env, port, ip, apiRoot } from './config'
import express from './services/express'
import { sequelize } from './services/postgres'
import routes from './routes'

const app = express(apiRoot, routes)
const server = http.createServer(app)

setImmediate(async () => {
  await sequelize.authenticate()
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
