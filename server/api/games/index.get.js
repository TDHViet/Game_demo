import { getAllGames, getGamesCount } from '../../data/games.js'

export default defineEventHandler(async event => {
  try {
    console.log('GET /api/games called')
    // Get query parameters
    const query = getQuery(event)
    const {
      page = 1,
      limit = 20,
      category,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query

    // Build filter object
    const filter = {}
    if (category) {
      filter.category = category
    }

    // Build sort object - default to sorting by id since createdAt doesn't exist
    const sort = {}
    if (sortBy === 'createdAt') {
      sort['id'] = sortOrder === 'desc' ? -1 : 1
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    }

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)

    // Get games and count
    console.log('Fetching games with filter:', filter, 'sort:', sort)
    const [games, totalCount] = await Promise.all([
      getAllGames({
        limit: parseInt(limit),
        skip,
        sort,
        filter,
      }),
      getGamesCount(filter),
    ])

    console.log('Games fetched:', games.length, 'Total count:', totalCount)

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit))
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return {
      success: true,
      data: games,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    }
  } catch (error) {
    console.error('Error in GET /api/games:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch games',
    })
  }
})
