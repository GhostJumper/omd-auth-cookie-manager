import mongoose from 'mongoose'
import DatabaseConfig from '../../config/DatabaseConfig'

class DatabaseService {

  private address = `mongodb://${DatabaseConfig.user}:${DatabaseConfig.pass}@${DatabaseConfig.host}:${DatabaseConfig.port}/${DatabaseConfig.name}`

  private parserOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  }

  async connect() {
    const connection = await mongoose.connect(this.address, this.parserOptions)
    console.log(`Connected to ${connection.connection.host}`)
  }
}

const databaseService = new DatabaseService()

export default databaseService