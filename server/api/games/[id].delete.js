import { deleteGame, getGameById } from '../../data/games.js'

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

    // Check if game exists
    const existingGame = await getGameById(id)
    if (!existingGame) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Game not found',
      })
    }

    // Delete the game
    const success = await deleteGame(id)

    if (!success) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete game',
      })
    }

    return {
      success: true,
      message: 'Game deleted successfully',
    }
  } catch (error) {
    console.error('Error in DELETE /api/games/[id]:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete game',
    })
  }
})
