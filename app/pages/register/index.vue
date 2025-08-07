<template>
  <div class="min-h-screen bg-[#EEF1F8] text-gray-800 relative">
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
    <!-- Add Language Card (no overlay) -->
    <div
      v-if="showAddLanguageCard"
      class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-96 max-w-full p-6 flex flex-col items-center border border-gray-200"
    >
      <div class="flex items-center justify-between w-full mb-4">
        <span class="text-base font-medium text-gray-700">Add Language</span>
        <button
          class="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600"
          @click="closeAddLanguageCard"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <input
        v-model="languageSearch"
        type="text"
        placeholder="Search language..."
        class="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div class="overflow-y-auto w-full" style="max-height: 260px">
        <ul>
          <li v-for="lang in filteredAvailableLanguages" :key="lang.code">
            <button
              class="w-full text-left px-3 py-2 rounded hover:bg-blue-100 flex items-center gap-2"
              :disabled="formData.languages.some(l => l.code === lang.code)"
              @click="addLanguageFromCard(lang)"
            >
              <span>{{ lang.name }}</span>
              <span
                v-if="formData.languages.some(l => l.code === lang.code)"
                class="text-xs text-gray-400"
                >(Added)</span
              >
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
      <div class="bg-white rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
        <form @submit.prevent="handleSubmit">
          <!-- Basic Info Component -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">Basic Info</h2>
            <div
              class="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <table class="w-full">
                <tbody>
                  <!-- Category Row -->
                  <tr class="border-b border-gray-200">
                    <td
                      class="px-6 py-4 text-gray-700 font-medium w-1/3 border-r border-gray-300"
                    >
                      Category
                    </td>
                    <td class="px-6 py-4">
                      <div class="relative">
                        <select
                          v-model="formData.category"
                          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                          :class="{ 'border-red-500': errors.category }"
                        >
                          <option value="">Select Category</option>
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
                        <div
                          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                        >
                          <svg
                            class="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div
                        v-if="errors.category"
                        class="text-red-500 text-sm mt-1"
                      >
                        {{ errors.category }}
                      </div>
                    </td>
                  </tr>
                  <!-- ID Row -->
                  <tr>
                    <td
                      class="px-6 py-4 text-gray-700 font-medium border-r border-gray-300"
                    >
                      ID
                    </td>
                    <td class="px-6 py-4">
                      <div class="relative">
                        <input
                          v-model="formData.id"
                          type="text"
                          placeholder="Enter game ID (e.g., GAME_123)"
                          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                          :class="{ 'border-red-500': errors.id, 'border-green-500': formData.id && !errors.id }"
                          @input="validateId"
                        />
                        <button
                          v-if="formData.id"
                          type="button"
                          class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                          @click="formData.id = ''"
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
                      <div v-if="errors.id" class="text-red-500 text-sm mt-1">
                        {{ errors.id }}
                      </div>
                      <div v-else-if="formData.id" class="text-green-500 text-sm mt-1">
                        ✓ Valid ID format
                      </div>
                      <div v-else class="text-gray-500 text-sm mt-1">
                        Only uppercase letters, numbers, and underscores allowed
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Multi-language Component -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">
              Multi-language
            </h2>
            <div
              class="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <table class="w-full">
                <tbody>
                  <!-- Input by Language Row -->
                  <tr class="border-b border-gray-200">
                    <td
                      class="px-6 py-4 text-gray-700 font-medium w-1/3 border-r border-gray-300"
                    >
                      Input by Language
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input
                            id="defaultLanguage"
                            v-model="formData.defaultLanguage"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <label
                            for="defaultLanguage"
                            class="ml-2 text-sm text-gray-700"
                            >Default Language</label
                          >
                        </div>
                        <button
                          type="button"
                          class="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                          :disabled="formData.languages.length <= 1"
                          @click="deleteLanguage"
                        >
                          <svg
                            class="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Delete Language
                        </button>
                      </div>
                    </td>
                  </tr>
                  <!-- Language List Row -->
                  <tr>
                    <td
                      class="px-6 py-4 text-gray-700 font-medium border-r border-gray-300"
                    >
                      <div class="space-y-2">
                        <div
                          v-for="(language, index) in formData.languages"
                          :key="index"
                          class="text-sm text-gray-600 py-2 px-3 rounded cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
                          :class="{
                            'bg-blue-50 text-blue-700 border border-blue-200':
                              formData.selectedLanguage === index,
                          }"
                          @click="selectLanguage(index)"
                        >
                          <span>{{ language.name }}</span>
                          <svg
                            v-if="formData.selectedLanguage === index"
                            class="w-4 h-4 text-blue-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </div>
                        <!-- Add Language Button -->
                        <button
                          type="button"
                          class="mt-4 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full justify-center"
                          @click.prevent="openAddLanguageCard"
                        >
                          <svg
                            class="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          Add language
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div
                        v-if="formData.selectedLanguage !== null"
                        class="space-y-3"
                      >
                        <div class="space-y-2">
                          <span class="text-sm text-gray-600 font-medium"
                            >Name</span
                          >
                          <div class="relative">
                            <input
                              v-model="
                                formData.languages[formData.selectedLanguage]
                                  .value
                              "
                              type="text"
                              :placeholder="`Enter ${formData.languages[formData.selectedLanguage].name} name`"
                              class="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              :class="{
                                'border-red-500':
                                  errors.languages &&
                                  errors.languages[formData.selectedLanguage],
                                'border-green-500': 
                                  formData.languages[formData.selectedLanguage]?.value && 
                                  !errors.languages?.[formData.selectedLanguage],
                                'border-orange-300': 
                                  !formData.languages[formData.selectedLanguage]?.value
                              }"
                              @input="validateLanguageName"
                            />
                            <button
                              v-if="
                                formData.languages[formData.selectedLanguage]
                                  .value
                              "
                              type="button"
                              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                              @click="
                                formData.languages[
                                  formData.selectedLanguage
                                ].value = ''
                              "
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
                          <div
                            v-if="
                              errors.languages &&
                              errors.languages[formData.selectedLanguage]
                            "
                            class="text-red-500 text-sm"
                          >
                            {{ errors.languages[formData.selectedLanguage] }}
                          </div>
                          <div
                            v-else-if="
                              formData.languages[formData.selectedLanguage]?.value &&
                              !errors.languages?.[formData.selectedLanguage]
                            "
                            class="text-green-500 text-sm"
                          >
                            ✓ Valid name format
                          </div>
                          <div v-else-if="formData.languages[formData.selectedLanguage]?.value" class="text-gray-500 text-sm">
                            Only letters, numbers, and spaces allowed
                          </div>
                          <div v-else class="text-orange-500 text-sm">
                            ⚠️ This field cannot be left blank
                          </div>
                        </div>
                      </div>
                      <div v-else class="text-sm text-gray-500 italic">
                        Click on a language from the list to enter its name
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              @click="returnToList"
            >
              Return to List Page
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Game' : 'Register Game') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Data
const formData = ref({
  category: '',
  id: '',
  defaultLanguage: false,
  selectedLanguage: null,
  languages: [
    {
      name: 'English',
      code: 'EN',
      value: '',
    },
    {
      name: 'Korean',
      code: 'KO',
      value: '',
    },
  ],
})

const errors = ref({})
const isSubmitting = ref(false)
const toast = ref({
  show: false,
  message: '',
  type: 'info'
})
const isEditMode = ref(false)
const gameId = ref(null)

const defaultLanguages = [
  { name: 'English', code: 'EN' },
  { name: 'Korean', code: 'KO' },
  { name: 'Japanese', code: 'JA' }
]

const availableLanguages = ref([...defaultLanguages])
const showAddLanguageCard = ref(false)
const languageSearch = ref('')

onMounted(async () => {
  // Check if we're in edit mode by looking for game ID in route
  const route = useRoute()
  if (route.query.id) {
    isEditMode.value = true
    gameId.value = route.query.id
    await loadGameForEdit(route.query.id)
  }

  try {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const countries = await res.json()
    // Extract all languages from all countries
    const langMap = {}
    countries.forEach(country => {
      if (country.languages) {
        Object.entries(country.languages).forEach(([code, name]) => {
          if (!langMap[code]) {
            langMap[code] = name
          }
        })
      }
    })
    // Convert to array and sort
    const langArr = Object.entries(langMap).map(([code, name]) => ({
      code: code.toUpperCase(),
      name,
    }))
    langArr.sort((a, b) => a.name.localeCompare(b.name))
    // If the API returns a reasonable list, use it
    if (langArr.length > 0) {
      availableLanguages.value = langArr
    }
  } catch (e) {
    // fallback to defaultLanguages
    availableLanguages.value = [...defaultLanguages]
  }
})

const filteredAvailableLanguages = computed(() => {
  const search = languageSearch.value.trim().toLowerCase()
  if (!search) return availableLanguages.value
  return availableLanguages.value.filter(
    lang =>
      lang.name.toLowerCase().includes(search) ||
      lang.code.toLowerCase().includes(search)
  )
})

const openAddLanguageCard = () => {
  languageSearch.value = ''
  showAddLanguageCard.value = true
}
const closeAddLanguageCard = () => {
  showAddLanguageCard.value = false
}
const addLanguageFromCard = lang => {
  if (!lang) return
  if (formData.value.languages.some(l => l.code === lang.code)) {
    closeAddLanguageCard()
    return
  }
  formData.value.languages.push({ name: lang.name, code: lang.code, value: '' })
  formData.value.selectedLanguage = formData.value.languages.length - 1
  closeAddLanguageCard()
}

// Methods
const selectLanguage = index => {
  formData.value.selectedLanguage = index
}

const deleteLanguage = () => {
  if (formData.value.languages.length > 1) {
    const deletedIndex = formData.value.languages.length - 1
    formData.value.languages.splice(deletedIndex, 1)

    // Adjust selected language if needed
    if (formData.value.selectedLanguage === deletedIndex) {
      formData.value.selectedLanguage = formData.value.languages.length - 1
    } else if (formData.value.selectedLanguage > deletedIndex) {
      formData.value.selectedLanguage--
    }
  }
}

const validateId = () => {
  if (!formData.value.id) {
    errors.value.id = 'Game ID is required'
  } else if (!/^[A-Z0-9_]+$/.test(formData.value.id)) {
    errors.value.id = 'Game ID must contain only uppercase letters, numbers, and underscores'
  } else if (formData.value.id.length < 2) {
    errors.value.id = 'Game ID must be at least 2 characters long'
  } else {
    delete errors.value.id
  }
}

const validateLanguageName = () => {
  if (formData.value.selectedLanguage === null) return
  
  const language = formData.value.languages[formData.value.selectedLanguage]
  if (!language.value || !language.value.trim()) {
    errors.value.languages = { ...errors.value.languages, [formData.value.selectedLanguage]: `${language.name} name cannot be left blank` }
  } else if (language.value.trim().length < 2) {
    errors.value.languages = { ...errors.value.languages, [formData.value.selectedLanguage]: `${language.name} name must be at least 2 characters long` }
  } else {
    if (errors.value.languages) {
      delete errors.value.languages[formData.value.selectedLanguage]
    }
  }
}

const validateForm = () => {
  errors.value = {}

  // Validate category
  if (!formData.value.category) {
    errors.value.category = 'Category is required'
  }

  // Validate ID - only uppercase letters, underscores, and numbers
  if (!formData.value.id) {
    errors.value.id = 'Game ID is required'
  } else if (!/^[A-Z0-9_]+$/.test(formData.value.id)) {
    errors.value.id = 'Game ID must contain only uppercase letters, numbers, and underscores'
  } else if (formData.value.id.length < 2) {
    errors.value.id = 'Game ID must be at least 2 characters long'
  }

  // Validate languages
  errors.value.languages = {}
  let hasValidLanguage = false
  let allLanguagesEmpty = true

  formData.value.languages.forEach((language, index) => {
    if (!language.value || !language.value.trim()) {
      errors.value.languages[index] = `${language.name} name cannot be left blank`
    } else {
      allLanguagesEmpty = false
      if (language.value.trim().length < 2) {
        errors.value.languages[index] = `${language.name} name must be at least 2 characters long`
      } else {
        hasValidLanguage = true
      }
    }
  })

  if (allLanguagesEmpty) {
    errors.value.general = 'At least one language name must be provided'
  } else if (!hasValidLanguage) {
    errors.value.general = 'At least one valid language name is required'
  }

  // Check if there are any errors - simplified logic
  const hasCategoryError = !!errors.value.category
  const hasIdError = !!errors.value.id
  const hasGeneralError = !!errors.value.general
  const hasLanguageErrors = Object.keys(errors.value.languages).length > 0

  const hasErrors = hasCategoryError || hasIdError || hasGeneralError || hasLanguageErrors

  return !hasErrors
}

const handleSubmit = async () => {
  // Validate form first
  const isValid = validateForm()
  
  if (!isValid) {
    // Show specific validation errors
    const errorMessages = []
    
    if (errors.value.category) {
      errorMessages.push(errors.value.category)
    }
    if (errors.value.id) {
      errorMessages.push(errors.value.id)
    }
    if (errors.value.general) {
      errorMessages.push(errors.value.general)
    }
    if (errors.value.languages) {
      Object.values(errors.value.languages).forEach(msg => {
        if (msg) errorMessages.push(msg)
      })
    }
    
    const errorMessage = errorMessages.length > 0 
      ? `Please fix the following errors: ${errorMessages.join(', ')}`
      : 'Please fix the validation errors before submitting'
    
    showToast(errorMessage, 'error')
    return
  }

  isSubmitting.value = true

  try {
    // Prepare the data in the correct format for MongoDB
    const gameData = {
      id: formData.value.id.toUpperCase().trim(),
      category: formData.value.category,
      name: formData.value.languages
        .filter(lang => lang.value.trim()) // Only include languages with values
        .map(lang => ({
          language: lang.code,
          value: lang.value.trim()
        }))
    }

    let response
    if (isEditMode.value) {
      // Update existing game
      response = await $fetch(`/api/games/${gameId.value}`, {
        method: 'PUT',
        body: gameData,
      })
    } else {
      // Create new game
      response = await $fetch('/api/games', {
        method: 'POST',
        body: gameData,
      })
    }

    if (response.success) {
      // Show success toast with more details
      const action = isEditMode.value ? 'updated' : 'registered'
      const gameName = gameData.name.find(n => n.language === 'EN')?.value || gameData.id
      showToast(
        `Game "${gameName}" ${action} successfully! Redirecting to list...`, 
        'success'
      )
      
      // Navigate back to list after a short delay
      setTimeout(() => {
        navigateTo('/')
      }, 2000)
    } else {
      throw new Error(response.message || `Failed to ${isEditMode.value ? 'update' : 'register'} game`)
    }
  } catch (error) {
    let errorMessage = `Error ${isEditMode.value ? 'updating' : 'registering'} game. Please try again.`

    // Check for specific error types
    if (error.data?.statusMessage) {
      errorMessage = error.data.statusMessage
    } else if (error.message) {
      errorMessage = error.message
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please check if MongoDB is connected.'
    } else if (error.status === 404) {
      errorMessage = 'API endpoint not found. Please check server configuration.'
    } else if (error.status === 0 || error.message?.includes('fetch')) {
      errorMessage = 'Cannot connect to server. Please check if the server is running and MongoDB is configured.'
    } else if (error.status === 400) {
      errorMessage = 'Invalid data. Please check your input and try again.'
    }

    showToast(errorMessage, 'error')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    category: '',
    id: '',
    defaultLanguage: false,
    selectedLanguage: null,
    languages: [
      {
        name: 'English',
        code: 'EN',
        value: '',
      },
      {
        name: 'Korean',
        code: 'KO',
        value: '',
      },
    ],
  }
  errors.value = {}
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

const loadGameForEdit = async (gameId) => {
  try {
    const response = await $fetch(`/api/games/${gameId}`)
    if (response.success && response.data) {
      const game = response.data
      
      // Populate form with existing game data
      formData.value.id = game.id
      formData.value.category = game.category
      
      // Convert name array to languages array
      formData.value.languages = game.name.map(name => ({
        name: getLanguageName(name.language),
        code: name.language,
        value: name.value
      }))
      
      // Select first language by default
      formData.value.selectedLanguage = 0
      
      showToast('Game loaded for editing', 'info')
    } else {
      showToast('Failed to load game for editing', 'error')
    }
  } catch (error) {
    console.error('Error loading game for edit:', error)
    showToast('Error loading game for editing', 'error')
  }
}

const getLanguageName = (code) => {
  const language = availableLanguages.value.find(lang => lang.code === code)
  return language ? language.name : code
}

const returnToList = () => {
  navigateTo('/')
}
</script>

<style scoped>
/* Custom scrollbar for select dropdown */
select::-ms-expand {
  display: none;
}

/* Focus styles */
input:focus,
select:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Table styles */
table {
  border-collapse: collapse;
}

td {
  vertical-align: top;
}
</style>
