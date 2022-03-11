import chalk from "chalk"
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import morgan from "morgan"
const debug = require('debug')('app')

import authCookieRouter from './src/router/AuthCookieRouter'
import databaseService from "./src/service/database/DatabaseService"

class App {
  private port = process.env.PORT || 3000
  private app = express()

  constructor() {
    this.setup()
  }

  private async setup() {
    await databaseService.connect()
    this.setupRoutes()
  }

  private setupRoutes() {
    this.app.use(morgan('tiny'))
    this.app.use(express.json())
    
    this.app.use('/authcookie', authCookieRouter)
    
    
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello World')
    })
    
    
    this.app.listen(this.port, () => {
      debug(`Listening on port ${chalk.green(this.port)}`)
    })
  }
}

new App()
