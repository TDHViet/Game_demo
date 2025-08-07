import { connectToDatabase, getDatabase } from '../config/database.js'

export default defineEventHandler(async event => {
  try {
    // Connect to database
    await connectToDatabase()
    const db = await getDatabase()
    
    // Get runtime config
    const config = useRuntimeConfig()
    const collectionName = config.mongodbCollectionName
    
    // List all collections
    const collections = await db.listCollections().toArray()
    
    // Check the target collection
    const collection = db.collection(collectionName)
    const count = await collection.countDocuments()
    
    // Get a sample document if any exists
    let sampleDoc = null
    if (count > 0) {
      sampleDoc = await collection.findOne({})
    }
    
    return {
      success: true,
      data: {
        database: db.databaseName,
        targetCollection: collectionName,
        allCollections: collections.map(c => c.name),
        documentCount: count,
        sampleDocument: sampleDoc
      }
    }
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}) 