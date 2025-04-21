import { useState } from 'react'
import { FiCalendar, FiPlus } from 'react-icons/fi'
import { motion } from 'framer-motion'
import PlannerForm from '../components/planner/PlannerForm'
import PlanCard from '../components/planner/PlanCard'
import EmptyState from '../components/ui/EmptyState'
import { usePlanner } from '../contexts/PlannerContext'
import { useAuth } from '../contexts/AuthContext'

function Planner() {
  const [creatingPlan, setCreatingPlan] = useState(false)
  const { mealPlans } = usePlanner()
  const { currentUser, openLoginModal } = useAuth()
  
  const handleStartPlanning = () => {
    setCreatingPlan(true)
  }
  
  const handlePlanComplete = () => {
    setCreatingPlan(false)
  }
  
  // Render content based on auth state and plan creation mode
  const renderContent = () => {
    if (!currentUser) {
      return (
        <EmptyState
          title="Sign in to create meal plans"
          message="Create an account to plan and organize your meals"
          icon={FiCalendar}
          action={{
            label: "Sign In",
            onClick: openLoginModal
          }}
        />
      )
    }
    
    if (creatingPlan) {
      return <PlannerForm onComplete={handlePlanComplete} />
    }
    
    if (mealPlans.length === 0) {
      return (
        <EmptyState
          title="No meal plans yet"
          message="Create your first meal plan to get started"
          icon={FiCalendar}
          action={{
            label: "Create a Plan",
            onClick: handleStartPlanning
          }}
        />
      )
    }
    
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Meal Plans</h2>
          <button
            onClick={handleStartPlanning}
            className="btn btn-primary flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            New Plan
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Sort plans by date (most recent first) */}
          {[...mealPlans]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
        </div>
      </>
    )
  }
  
  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meal Planner</h1>
          <p className="text-gray-400">
            Organize your meals and plan your week
          </p>
        </div>
        
        {renderContent()}
      </motion.div>
    </div>
  )
}

export default Planner