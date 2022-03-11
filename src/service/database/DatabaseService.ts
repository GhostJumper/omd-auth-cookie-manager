import mongoose from 'mongoose'
import DatabaseConfig from '../../config/DatabaseConfig'
const debug = require('debug')('app:DatabaseService')

class DatabaseService {

  private address = `mongodb://${DatabaseConfig.user}:${DatabaseConfig.pass}@${DatabaseConfig.host}:${DatabaseConfig.port}/${DatabaseConfig.name}`

  private parserOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000,          // Close sockets after 45 seconds of inactivity
  }

  private connection = mongoose.connection

  async connect() {
    await mongoose.connect(this.address, this.parserOptions)
  }
}

const databaseService = new DatabaseService()

export default databaseService