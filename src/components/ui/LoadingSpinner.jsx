import { motion } from 'framer-motion'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default LoadingSpinner