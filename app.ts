import express from "express"
import morgan from "morgan"

import authCookieRouter from './src/router/AuthCookieRouter'
import botRouter from "./src/router/BotRouter"
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
    this.app.use('/bot', botRouter)

    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`)
    })
  }
}

new App()
