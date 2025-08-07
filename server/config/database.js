import mongoose from 'mongoose'

let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    console.log('✅ Using existing database connection')
    return mongoose.connection
  }

  try {
    console.log('🔌 Connecting to MongoDB Atlas...')
    
    // Get MongoDB URI from environment
    const mongoUri = process.env.MONGODB_URI
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is required')
    }

    console.log('📊 Database config:', { 
      mongoUri: mongoUri ? 'SET' : 'NOT SET'
    })

    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('✅ Connected to MongoDB Atlas successfully')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
    
    // Test the connection by listing collections
    try {
      const collections = await mongoose.connection.db.listCollections().toArray()
      console.log('📋 Available collections:', collections.map(c => c.name))
    } catch (e) {
      console.error('❌ Error listing collections:', e)
    }

    return mongoose.connection
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error)
    throw error
  }
}

export async function getDatabase() {
  if (!isConnected) {
    await connectToDatabase()
  }
  return mongoose.connection.db
}

export async function getCollection(collectionName) {
  if (!isConnected) {
    await connectToDatabase()
  }
  return mongoose.connection.db.collection(collectionName)
}

export async function closeConnection() {
  if (isConnected) {
    await mongoose.connection.close()
    isConnected = false
    console.log('🔌 MongoDB connection closed')
  }
}
