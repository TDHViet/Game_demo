import { searchGames } from '../../data/games.js'

export default defineEventHandler(async event => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const { q = '', page = 1, limit = 20 } = query

    if (!q.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Search term is required',
      })
    }

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)

    // Search games
    const games = await searchGames(q.trim(), {
      limit: parseInt(limit),
      skip,
    })

    return {
      success: true,
      data: games,
      searchTerm: q.trim(),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    }
  } catch (error) {
    console.error('Error in GET /api/games/search:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search games',
    })
  }
})
