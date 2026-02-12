// import mongoose from 'mongoose'

// let isConnected = false

// export async function connectToDatabase() {
//   if (isConnected) {
//     console.log('✅ Using existing database connection')
//     return mongoose.connection
//   }

//   try {
//     console.log('🔌 Connecting to MongoDB Atlas...')

//     // Get MongoDB URI from environment
//     const mongoUri = process.env.MONGODB_URI

//     if (!mongoUri) {
//       throw new Error('MONGODB_URI environment variable is required')
//     }

//     console.log('📊 Database config:', {
//       mongoUri: mongoUri ? 'SET' : 'NOT SET'
//     })

//     // Connect to MongoDB using Mongoose
//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })

//     isConnected = true
//     console.log('✅ Connected to MongoDB Atlas successfully')
//     console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)

//     // Test the connection by listing collections
//     try {
//       const collections = await mongoose.connection.db.listCollections().toArray()
//       console.log('📋 Available collections:', collections.map(c => c.name))
//     } catch (e) {
//       console.error('❌ Error listing collections:', e)
//     }

//     return mongoose.connection
//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB Atlas:', error)
//     throw error
//   }
// }

// export async function getDatabase() {
//   if (!isConnected) {
//     await connectToDatabase()
//   }
//   return mongoose.connection.db
// }

// export async function getCollection(collectionName) {
//   if (!isConnected) {
//     await connectToDatabase()
//   }
//   return mongoose.connection.db.collection(collectionName)
// }

// export async function closeConnection() {
//   if (isConnected) {
//     await mongoose.connection.close()
//     isConnected = false
//     console.log('🔌 MongoDB connection closed')
//   }
// }
import mongoose from 'mongoose'

let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection
  }

  try {
    console.log('🔌 Connecting to MongoDB Atlas...')

    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is required')
    }

    // Mongoose 8 không cần useNewUrlParser và useUnifiedTopology nữa
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    })

    isConnected = true
    console.log('✅ Connected to MongoDB Atlas successfully')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)

    // Lắng nghe sự kiện mất kết nối để tự động reconnect
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected')
      isConnected = false
    })

    mongoose.connection.on('error', err => {
      console.error('❌ MongoDB connection error:', err)
      isConnected = false
    })

    return mongoose.connection
  } catch (error) {
    isConnected = false
    console.error('❌ Failed to connect to MongoDB Atlas:', error.message)
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
