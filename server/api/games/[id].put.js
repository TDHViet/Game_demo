import { updateGame, getGameById } from '../../data/games.js'

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

    // Create update data object
    const updateData = {
      id: body.id,
      category: body.category,
      name: body.name
    }

    // Update the game
    const updatedGame = await updateGame(id, updateData)

    return {
      success: true,
      data: updatedGame,
      message: 'Game updated successfully',
    }
  } catch (error) {
    console.error('Error in PUT /api/games/[id]:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update game',
    })
  }
})
