import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext()

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const { currentUser } = useAuth()

  // Load favorites from localStorage when component mounts or user changes
  useEffect(() => {
    const loadFavorites = () => {
      if (currentUser) {
        const storedFavorites = localStorage.getItem(`favorites_${currentUser.id}`)
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } else {
        setFavorites([])
      }
    }
    
    loadFavorites()
  }, [currentUser])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(favorites))
    }
  }, [favorites, currentUser])

  // Add a meal to favorites
  const addFavorite = (meal) => {
    if (!meal) return
    
    setFavorites(prevFavorites => {
      // Check if already in favorites
      if (prevFavorites.some(fav => fav.idMeal === meal.idMeal)) {
        return prevFavorites
      }
      
      return [...prevFavorites, meal]
    })
  }

  // Remove a meal from favorites
  const removeFavorite = (mealId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(meal => meal.idMeal !== mealId)
    )
  }

  // Check if a meal is in favorites
  const isFavorite = (mealId) => {
    return favorites.some(meal => meal.idMeal === mealId)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}