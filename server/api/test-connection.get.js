import { connectToDatabase } from '../config/database.js'
import Game from '../models/Game.js'

export default defineEventHandler(async event => {
  try {
    console.log('Testing database connection...')
    
    // Test connection
    const connection = await connectToDatabase()
    console.log('✅ Database connection successful')
    
    // Test database access
    const dbName = connection.db.databaseName
    console.log('📊 Database name:', dbName)
    
    // Test collection listing
    const collections = await connection.db.listCollections().toArray()
    console.log('📋 Collections found:', collections.map(c => c.name))
    
    // Test Game model
    const gameCount = await Game.countDocuments()
    console.log('🎮 Games in database:', gameCount)
    
    // Test runtime config
    const config = useRuntimeConfig()
    console.log('⚙️ Runtime config:', {
      mongoUri: config.mongodbUri ? 'SET' : 'NOT SET'
    })
    
    return {
      success: true,
      message: 'Database connection test successful',
      data: {
        database: dbName,
        collections: collections.map(c => c.name),
        gameCount: gameCount,
        config: {
          mongoUri: config.mongodbUri ? 'SET' : 'NOT SET'
        }
      }
    }
  } catch (error) {
    console.error('❌ Database connection test failed:', error)
    return {
      success: false,
      message: 'Database connection test failed',
      error: error.message
    }
  }
}) 