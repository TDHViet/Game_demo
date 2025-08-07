import { connectToDatabase } from '../config/database.js'

export default defineEventHandler(async (event) => {
  try {
    // Test database connection
    const { client, db } = await connectToDatabase()
    
    // Test collection access
    const collection = db.collection('games')
    const count = await collection.countDocuments()
    
    return {
      success: true,
      message: 'MongoDB connection successful',
      data: {
        database: db.databaseName,
        collection: 'games',
        documentCount: count,
        connectionStatus: 'connected'
      }
    }
  } catch (error) {
    console.error('MongoDB connection test failed:', error)
    
    return {
      success: false,
      message: 'MongoDB connection failed',
      error: error.message,
      data: {
        database: 'unknown',
        collection: 'games',
        documentCount: 0,
        connectionStatus: 'failed'
      }
    }
  }
}) 