import { createGame } from '../../data/games.js'

export default defineEventHandler(async event => {
  try {
    // Get request body
    const body = await readBody(event)

    // Validate required fields
    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Game ID is required',
      })
    }

    if (!body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category is required',
      })
    }

    if (!body.name || !Array.isArray(body.name) || body.name.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'At least one name entry is required',
      })
    }

    // Validate name structure
    for (const nameEntry of body.name) {
      if (!nameEntry.language || !nameEntry.value) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Each name entry must have language and value fields',
        })
      }
    }

    // Create game data object
    const gameData = {
      id: body.id,
      category: body.category,
      name: body.name
    }

    // Create the game
    const newGame = await createGame(gameData)

    return {
      success: true,
      data: newGame,
      message: 'Game created successfully',
    }
  } catch (error) {
    console.error('Error in POST /api/games:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create game',
    })
  }
})
