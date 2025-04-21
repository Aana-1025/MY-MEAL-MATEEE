import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

/**
 * Search for meals by name
 * @param {string} query - Search query
 * @returns {Promise} - Promise with meal results
 */
export const searchMealsByName = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`)
    return response.data.meals || []
  } catch (error) {
    console.error('Error searching meals:', error)
    return []
  }
}

/**
 * Get meal details by ID
 * @param {string} id - Meal ID
 * @returns {Promise} - Promise with meal details
 */
export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
    return response.data.meals ? response.data.meals[0] : null
  } catch (error) {
    console.error('Error fetching meal details:', error)
    return null
  }
}

/**
 * Get all meal categories
 * @returns {Promise} - Promise with meal categories
 */
export const getMealCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`)
    return response.data.categories || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Get meals by category
 * @param {string} category - Category name
 * @returns {Promise} - Promise with meals in the category
 */
export const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`)
    return response.data.meals || []
  } catch (error) {
    console.error('Error fetching meals by category:', error)
    return []
  }
}

/**
 * Get random meal
 * @returns {Promise} - Promise with random meal
 */
export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random.php`)
    return response.data.meals ? response.data.meals[0] : null
  } catch (error) {
    console.error('Error fetching random meal:', error)
    return null
  }
}

/**
 * Format meal ingredients and measurements
 * @param {Object} meal - Meal object
 * @returns {Array} - Array of ingredient objects with name and measure
 */
export const formatMealIngredients = (meal) => {
  if (!meal) return []
  
  const ingredients = []
  
  // MealDB stores ingredients as ingredient1, ingredient2, etc.
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      })
    }
  }
  
  return ingredients
}