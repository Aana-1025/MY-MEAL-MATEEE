import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const PlannerContext = createContext()

export function usePlanner() {
  return useContext(PlannerContext)
}

export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACKS: 'snacks',
  OTHER: 'other'
}

export function PlannerProvider({ children }) {
  const [mealPlans, setMealPlans] = useState([])
  const [currentPlan, setCurrentPlan] = useState(null)
  const { currentUser } = useAuth()

  // Load meal plans from localStorage when component mounts or user changes
  useEffect(() => {
    const loadPlans = () => {
      if (currentUser) {
        const storedPlans = localStorage.getItem(`mealPlans_${currentUser.id}`)
        if (storedPlans) {
          setMealPlans(JSON.parse(storedPlans))
        }
      } else {
        setMealPlans([])
      }
    }
    
    loadPlans()
  }, [currentUser])

  // Save meal plans to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`mealPlans_${currentUser.id}`, JSON.stringify(mealPlans))
    }
  }, [mealPlans, currentUser])

  // Start a new meal plan for a specific date
  const startPlan = (date) => {
    const newPlan = {
      id: Date.now().toString(),
      date,
      meals: {
        [MEAL_TYPES.BREAKFAST]: [],
        [MEAL_TYPES.LUNCH]: [],
        [MEAL_TYPES.DINNER]: [],
        [MEAL_TYPES.SNACKS]: [],
        [MEAL_TYPES.OTHER]: []
      },
      customMealTypes: {}
    }
    
    setCurrentPlan(newPlan)
    return newPlan
  }

  // Add a custom meal type
  const addCustomMealType = (planId, name) => {
    if (!name.trim()) return null
    
    const id = Date.now().toString()
    
    setCurrentPlan(prevPlan => {
      if (!prevPlan || prevPlan.id !== planId) return prevPlan
      
      return {
        ...prevPlan,
        customMealTypes: {
          ...prevPlan.customMealTypes,
          [id]: name
        },
        meals: {
          ...prevPlan.meals,
          [id]: []
        }
      }
    })
    
    return id
  }

  // Add a meal to the current plan
  const addMealToPlan = (planId, mealType, meal) => {
    setCurrentPlan(prevPlan => {
      if (!prevPlan || prevPlan.id !== planId) return prevPlan
      
      return {
        ...prevPlan,
        meals: {
          ...prevPlan.meals,
          [mealType]: [...(prevPlan.meals[mealType] || []), meal]
        }
      }
    })
  }

  // Remove a meal from the current plan
  const removeMealFromPlan = (planId, mealType, mealId) => {
    setCurrentPlan(prevPlan => {
      if (!prevPlan || prevPlan.id !== planId) return prevPlan
      
      return {
        ...prevPlan,
        meals: {
          ...prevPlan.meals,
          [mealType]: prevPlan.meals[mealType].filter(meal => meal.idMeal !== mealId)
        }
      }
    })
  }

  // Save the current plan
  const savePlan = () => {
    if (!currentPlan) return
    
    setMealPlans(prevPlans => {
      const existingPlanIndex = prevPlans.findIndex(p => p.id === currentPlan.id)
      
      if (existingPlanIndex >= 0) {
        // Update existing plan
        const updatedPlans = [...prevPlans]
        updatedPlans[existingPlanIndex] = currentPlan
        return updatedPlans
      } else {
        // Add new plan
        return [...prevPlans, currentPlan]
      }
    })
    
    return currentPlan
  }

  // Delete a meal plan
  const deletePlan = (planId) => {
    setMealPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId))
    
    if (currentPlan && currentPlan.id === planId) {
      setCurrentPlan(null)
    }
  }

  // Get plan by ID
  const getPlanById = (planId) => {
    return mealPlans.find(plan => plan.id === planId) || null
  }

  const value = {
    mealPlans,
    currentPlan,
    startPlan,
    addCustomMealType,
    addMealToPlan,
    removeMealFromPlan,
    savePlan,
    deletePlan,
    getPlanById,
    setCurrentPlan,
    MEAL_TYPES
  }

  return (
    <PlannerContext.Provider value={value}>
      {children}
    </PlannerContext.Provider>
  )
}