import { getGameById } from '../../data/games.js'

export default defineEventHandler(async event => {
  try {
    // Get game ID from URL parameters
    const { id } = event.context.params

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Game ID is required',
      })
    }

    // Get the game
    const game = await getGameById(id)

    if (!game) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Game not found',
      })
    }

    return {
      success: true,
      data: game,
    }
  } catch (error) {
    console.error('Error in GET /api/games/[id]:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch game',
    })
  }
})
