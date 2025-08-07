<template>
  <div class="px-4 mx-auto py-8 bg-[#EEF1F8] ">
    <!-- Toast Notification -->
    <div v-if="toast.show" class="fixed top-4 right-4 z-50">
      <div
        :class="[
          'px-6 py-4 rounded-lg shadow-lg max-w-sm',
          toast.type === 'success'
            ? 'bg-green-500 text-white'
            : toast.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white',
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg
              v-if="toast.type === 'success'"
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <svg
              v-else-if="toast.type === 'error'"
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span class="font-medium">{{ toast.message }}</span>
          </div>
          <button
            class="ml-4 text-white hover:text-gray-200"
            @click="hideToast"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Card -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
        <div class="flex items-center justify-center mb-4">
          <div class="bg-red-100 rounded-full p-3">
            <svg
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="text-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Confirm Delete
          </h3>
          <p class="text-gray-600">
            Are you sure you want to delete {{ selectedGames.length }} selected
            game(s)?
          </p>
        </div>
        <div class="flex gap-3">
          <button
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            @click="confirmDelete"
          >
            Yes, Delete
          </button>
          <button
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            @click="cancelDelete"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
      <form
        class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6"
        @submit.prevent="handleSearch"
      >
        <div class="md:col-span-2">
          <div class="text-sm font-medium text-gray-900 mb-2">Category</div>
          <select
            v-model="filters.category"
            class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="ADVENTURE">Adventure</option>
            <option value="ACTION">Action</option>
            <option value="RPG">RPG</option>
            <option value="SURVIVAL">Survival</option>
            <option value="FPS">FPS</option>
            <option value="BATTLE_ROYALE">Battle Royale</option>
            <option value="CREATIVE">Creative</option>
            <option value="PLATFORMER">Platformer</option>
            <option value="SPORTS">Sports</option>
            <option value="RACING">Racing</option>
            <option value="SIMULATION">Simulation</option>
          </select>
        </div>

        <div class="md:col-span-4">
          <div class="text-sm font-medium text-gray-900 mb-2">Keyword</div>
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                v-model="filters.keyword"
                type="search"
                class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by ID or name"
              />
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center whitespace-nowrap w-32"
            >
              <svg
                class="w-4 h-4 mr-2 -ml-1 inline"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>

        <div class="md:col-span-3 self-end">
          <button
            type="button"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
            :disabled="selectedGames.length === 0"
            @click="showDeleteConfirmDialog"
          >
            <svg
              class="w-4 h-4 mr-1 -ml-1 inline"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
              />
            </svg>
            Delete Selected ({{ selectedGames.length }})
          </button>
        </div>

        <div class="md:col-span-3 self-end">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
            @click="navigateToRegister"
          >
            <svg
              class="w-4 h-4 mr-1 -ml-1 inline"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            Register New Game
          </button>
        </div>

      </form>

      <div
        class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white rounded-lg"
      >
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="p-4 border-r border-gray-200">
                <div class="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                  />
                  <label for="checkbox-all" class="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 border-r border-gray-200">ID</th>
              <th scope="col" class="px-6 py-3 border-r border-gray-200">
                Name (EN)
              </th>
              <th scope="col" class="px-6 py-3 border-r border-gray-200">
                Name (KO)
              </th>
              <th scope="col" class="px-6 py-3 border-r border-gray-200">
                Name (JA)
              </th>
              <th scope="col" class="px-6 py-3">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="games.length === 0 && !isLoading"
              class="bg-white border-b"
            >
              <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <svg
                    class="w-12 h-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p class="text-lg font-medium">No games found</p>
                  <p class="text-sm">
                    Try adding some games or check your filters.
                  </p>
                </div>
              </td>
            </tr>
            <tr v-if="isLoading" class="bg-white border-b">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                <div class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading games...
                </div>
              </td>
            </tr>
            <tr
              v-for="game in paginatedGames"
              :key="game.id"
              class="bg-white border-b hover:bg-gray-50"
            >
              <td class="w-4 p-4 border-r border-gray-200">
                <div class="flex items-center">
                  <input
                    :id="`checkbox-${game.id}`"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    :checked="selectedGames.includes(game.id)"
                    @change="toggleGameSelection(game.id)"
                  />
                  <label :for="`checkbox-${game.id}`" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td
                class="px-6 py-4 border-r border-gray-200 font-medium text-gray-900"
              >
                {{ game.id }}
              </td>
              <td class="px-6 py-4 border-r border-gray-200">
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getCategoryClass(game.category)"
                >
                  {{ getGameName(game, 'EN') }}
                </span>
              </td>
              <td class="px-6 py-4 border-r border-gray-200">
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getCategoryClass(game.category)"
                >
                  {{ getGameName(game, 'KO') }}
                </span>
              </td>
              <td class="px-6 py-4 border-r border-gray-200">
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getCategoryClass(game.category)"
                >
                  {{ getGameName(game, 'JA') }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-900">{{ game.category }}</span>
                  <button
                    @click="editGame(game.id)"
                    class="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
      >
        <div class="flex items-center gap-4">
          <div class="text-sm font-normal text-gray-500">
            Showing
            <span class="font-semibold text-gray-900"
              >{{ startIndex + 1 }}-{{ endIndex }}</span
            >
            of
            <span class="font-semibold text-gray-900">{{
              filteredGames.length
            }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Rows:</span>
            <select
              v-model="itemsPerPage"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="handlePageSizeChange"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <nav aria-label="Page navigation">
          <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
              <button
                :disabled="currentPage === 1"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="previousPage"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            <li v-for="page in visiblePages" :key="page">
              <button
                :class="[
                  'flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
                  page === currentPage
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                    : 'text-gray-500 bg-white',
                ]"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                :disabled="currentPage === totalPages"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="nextPage"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>

<script setup>
// Data
const games = ref([])
const filters = ref({
  category: '',
  keyword: '',
})
const selectedGames = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10) // Default to 10 items per page
const isLoading = ref(true)
const showDeleteConfirm = ref(false)
const toast = ref({
  show: false,
  message: '',
  type: 'info',
})

// Load games data from API
onMounted(async () => {
  await loadGames()
})

// Computed properties
const filteredGames = computed(() => {
  let filtered = games.value || []

  // Filter by category
  if (filters.value.category) {
    filtered = filtered.filter(game => game.category === filters.value.category)
  }

  // Filter by keyword
  if (filters.value.keyword) {
    const keyword = filters.value.keyword.toLowerCase()
    filtered = filtered.filter(
      game =>
        game.id.toLowerCase().includes(keyword) ||
        game.name.some(name => name.value.toLowerCase().includes(keyword))
    )
  }

  return filtered
})

const totalPages = computed(() => {
  const total = Math.ceil(filteredGames.value.length / parseInt(itemsPerPage.value))
  return Math.max(1, total) // Ensure at least 1 page
})

const startIndex = computed(() => (currentPage.value - 1) * parseInt(itemsPerPage.value))
const endIndex = computed(() => {
  const end = startIndex.value + parseInt(itemsPerPage.value)
  return Math.min(end, filteredGames.value.length)
})

const paginatedGames = computed(() => {
  const start = startIndex.value
  const end = endIndex.value
  return filteredGames.value.slice(start, end)
})

const isAllSelected = computed(() => {
  return (
    paginatedGames.value.length > 0 &&
    paginatedGames.value.every(game => selectedGames.value.includes(game.id))
  )
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const getGameName = (game, language) => {
  const nameEntry = game.name.find(n => n.language === language)
  return nameEntry ? nameEntry.value : 'NO INFORMATION'
}

const handleSearch = () => {
  currentPage.value = 1
}

const handlePageSizeChange = () => {
  // Reset to first page when changing page size
  currentPage.value = 1
}

const toggleGameSelection = gameId => {
  const index = selectedGames.value.indexOf(gameId)
  if (index > -1) {
    selectedGames.value.splice(index, 1)
  } else {
    selectedGames.value.push(gameId)
  }
}

const getCategoryClass = (category) => {
  const classes = {
    'ADVENTURE': 'bg-green-100 text-green-800',
    'ACTION': 'bg-red-100 text-red-800',
    'RPG': 'bg-purple-100 text-purple-800',
    'SURVIVAL': 'bg-orange-100 text-orange-800',
    'FPS': 'bg-blue-100 text-blue-800',
    'BATTLE_ROYALE': 'bg-pink-100 text-pink-800',
    'CREATIVE': 'bg-indigo-100 text-indigo-800',
    'PLATFORMER': 'bg-yellow-100 text-yellow-800',
    'SPORTS': 'bg-teal-100 text-teal-800',
    'RACING': 'bg-cyan-100 text-cyan-800',
    'SIMULATION': 'bg-gray-100 text-gray-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedGames.value = selectedGames.value.filter(
      id => !paginatedGames.value.some(game => game.id === id)
    )
  } else {
    const pageGameIds = paginatedGames.value.map(game => game.id)
    selectedGames.value = [...new Set([...selectedGames.value, ...pageGameIds])]
  }
}

const showDeleteConfirmDialog = () => {
  if (selectedGames.value.length === 0) {
    showToast('Please select games to delete', 'error')
    return
  }
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    // Delete games one by one since we don't have a bulk delete endpoint
    for (const gameId of selectedGames.value) {
      await $fetch(`/api/games/${gameId}`, {
        method: 'DELETE'
      })
    }

    // Remove selected games from the local array
    games.value = games.value.filter(
      game => !selectedGames.value.includes(game.id)
    )
    selectedGames.value = []

    // Reset to first page if current page is empty
    if (paginatedGames.value.length === 0 && currentPage.value > 1) {
      currentPage.value = 1
    }

    showDeleteConfirm.value = false
    showToast(`${selectedGames.value.length} game(s) deleted successfully from MongoDB Atlas`, 'success')
  } catch (error) {
    console.error('Error deleting games:', error)

    let errorMessage = 'Error deleting games. Please try again.'

    if (error.data?.statusMessage) {
      errorMessage = error.data.statusMessage
    } else if (error.message) {
      errorMessage = error.message
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please check if MongoDB is connected.'
    } else if (error.status === 0 || error.message?.includes('fetch')) {
      errorMessage = 'Cannot connect to server. Please check if MongoDB is configured.'
    }

    showDeleteConfirm.value = false
    showToast(errorMessage, 'error')
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
}

const showToast = (message, type = 'info') => {
  toast.value = {
    show: true,
    message,
    type,
  }

  // Auto hide after 3 seconds
  setTimeout(() => {
    hideToast()
  }, 3000)
}

const hideToast = () => {
  toast.value.show = false
}

const goToPage = page => {
  currentPage.value = page
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const navigateToRegister = () => {
  navigateTo('/register')
}

const seedTestData = async () => {
  try {
    const response = await $fetch('/api/seed', {
      method: 'POST'
    })
    
    if (response.success) {
      showToast('Test data seeded successfully!', 'success')
      // Reload games after seeding
      await loadGames()
    } else {
      showToast('Failed to seed test data', 'error')
    }
  } catch (error) {
    console.error('Error seeding test data:', error)
    showToast('Error seeding test data', 'error')
  }
}

const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...')
    const response = await $fetch('/api/test-connection')
    console.log('Database test response:', response)
    
    if (response.success) {
      showToast(`Database connected successfully! Games in DB: ${response.data.gameCount}`, 'success')
    } else {
      showToast('Database connection failed: ' + response.message, 'error')
    }
  } catch (error) {
    console.error('Error testing database connection:', error)
    showToast('Database connection test failed: ' + (error.message || 'Unknown error'), 'error')
  }
}

const editGame = (gameId) => {
  navigateTo(`/register?id=${gameId}`)
}

const loadGames = async () => {
  try {
    isLoading.value = true
    console.log('Loading games...')
    const response = await $fetch('/api/games')
    console.log('API Response:', response)
    
    if (response.success) {
      games.value = response.data
      console.log('Games loaded:', games.value)
    } else {
      throw new Error('Failed to load games')
    }
  } catch (error) {
    console.error('Error loading games:', error)
    console.error('Error details:', {
      message: error.message,
      data: error.data,
      status: error.status,
      statusText: error.statusText
    })
    
    let errorMessage = 'Error loading games from server'
    
    // Check for specific error types
    if (error.data?.statusMessage) {
      errorMessage = error.data.statusMessage
    } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
      errorMessage = 'Cannot connect to server. Please check if MongoDB is configured and running.'
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please check if MongoDB is connected.'
    } else if (error.status === 404) {
      errorMessage = 'API endpoint not found. Please check server configuration.'
    } else if (error.status === 0) {
      errorMessage = 'Cannot connect to server. Please check if the server is running.'
    }
    
    showToast(errorMessage, 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
