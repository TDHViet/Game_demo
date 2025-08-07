import Game from '../models/Game.js'
import { connectToDatabase } from '../config/database.js'

/**
 * Get all games from the database
 * @param {Object} options - Query options (limit, skip, sort, filter)
 * @returns {Promise<Array>} Array of games
 */
export async function getAllGames(options = {}) {
  try {
    // Ensure database connection
    await connectToDatabase()
    
    const {
      limit = 50,
      skip = 0,
      sort = { id: 1 },
      filter = {},
    } = options

    console.log('Querying with filter:', filter, 'sort:', sort, 'skip:', skip, 'limit:', limit)
    
    const games = await Game
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean() // Convert to plain JavaScript objects

    console.log('Found games:', games.length)
    return games
  } catch (error) {
    console.error('Error fetching games:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    throw new Error('Failed to fetch games from database')
  }
}

/**
 * Get a single game by ID
 * @param {string} gameId - The game ID
 * @returns {Promise<Object|null>} Game object or null
 */
export async function getGameById(gameId) {
  try {
    // Ensure database connection
    await connectToDatabase()
    
    // Find by id field
    const game = await Game.findOne({ id: gameId }).lean()
    
    return game
  } catch (error) {
    console.error('Error fetching game by ID:', error)
    throw new Error('Failed to fetch game from database')
  }
}

/**
 * Create a new game
 * @param {Object} gameData - The game data to create
 * @returns {Promise<Object>} Created game object
 */
export async function createGame(gameData) {
  try {
    // Ensure database connection
    await connectToDatabase()

    const newGame = new Game(gameData)
    const savedGame = await newGame.save()
    
    return savedGame.toObject()
  } catch (error) {
    console.error('Error creating game:', error)
    throw new Error('Failed to create game in database')
  }
}

/**
 * Update an existing game
 * @param {string} gameId - The game ID to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object|null>} Updated game object or null
 */
export async function updateGame(gameId, updateData) {
  try {
    // Ensure database connection
    await connectToDatabase()

    const updatedGame = await Game.findOneAndUpdate(
      { id: gameId },
      updateData,
      { new: true, runValidators: true }
    ).lean()

    return updatedGame
  } catch (error) {
    console.error('Error updating game:', error)
    throw new Error('Failed to update game in database')
  }
}

/**
 * Delete a game by ID
 * @param {string} gameId - The game ID to delete
 * @returns {Promise<boolean>} Success status
 */
export async function deleteGame(gameId) {
  try {
    // Ensure database connection
    await connectToDatabase()
    
    const result = await Game.deleteOne({ id: gameId })
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting game:', error)
    throw new Error('Failed to delete game from database')
  }
}

/**
 * Delete multiple games by IDs
 * @param {Array<string>} gameIds - Array of game IDs to delete
 * @returns {Promise<number>} Number of deleted games
 */
export async function deleteMultipleGames(gameIds) {
  try {
    // Ensure database connection
    await connectToDatabase()
    
    const result = await Game.deleteMany({ id: { $in: gameIds } })
    return result.deletedCount
  } catch (error) {
    console.error('Error deleting multiple games:', error)
    throw new Error('Failed to delete games from database')
  }
}

/**
 * Search games by title or description
 * @param {string} searchTerm - The search term
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of matching games
 */
export async function searchGames(searchTerm, options = {}) {
  try {
    // Ensure database connection
    await connectToDatabase()

    const { limit = 20, skip = 0 } = options

    const searchFilter = {
      $or: [
        { id: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { 'name.value': { $regex: searchTerm, $options: 'i' } },
      ],
    }

    const games = await Game
      .find(searchFilter)
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return games
  } catch (error) {
    console.error('Error searching games:', error)
    throw new Error('Failed to search games in database')
  }
}

/**
 * Get games by category
 * @param {string} category - The category to filter by
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of games in the category
 */
export async function getGamesByCategory(category, options = {}) {
  try {
    // Ensure database connection
    await connectToDatabase()

    const { limit = 20, skip = 0, sort = { id: 1 } } = options

    const games = await Game
      .find({ category })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    return games
  } catch (error) {
    console.error('Error fetching games by category:', error)
    throw new Error('Failed to fetch games by category from database')
  }
}

/**
 * Get total count of games
 * @param {Object} filter - Optional filter
 * @returns {Promise<number>} Total count
 */
export async function getGamesCount(filter = {}) {
  try {
    // Ensure database connection
    await connectToDatabase()
    
    return await Game.countDocuments(filter)
  } catch (error) {
    console.error('Error counting games:', error)
    throw new Error('Failed to count games in database')
  }
}
