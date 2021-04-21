import express from 'express'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { get } from 'lodash'

import { apiLogger, loggerMiddleware } from '../logger'
import { env, root } from '../../config'

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  const isJoi = get(err, 'error.isJoi', false)
  if (isJoi) {
    return res.status(400).json({
      error: err.error.toString()
    })
  }

  if (err.status && err.status < 500) {
    return res.status(err.status).send(err.message)
  }

  const axiosResponseData = err.isAxiosError && err.response && err.response.data
  const axiosError = err.isAxiosError && err.toJSON()


  const errMessage = typeof err === 'string' ? err : err.message

  apiLogger.error(`[Error] Message: ${errMessage}`, {
    meta: {
      user_id: get(req, ['user', 'id'], ''),
      axios_response: axiosResponseData,
      axios_error: axiosError,
      req: {
        url: req.url,
        originalUrl: req.originalUrl,
        headers: req.headers,
        method: req.method
      }
    }
  })

  return res.status(500).send('Internal Server Error');
}

export default (apiRoot, routes) => {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(root, 'src/views'))

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(loggerMiddleware);
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(errorHandler)

  return app
}
