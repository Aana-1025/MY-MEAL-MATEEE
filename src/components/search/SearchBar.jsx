import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

function SearchBar({ onSearch, placeholder = 'Search for meals...' }) {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-3 pr-12 bg-dark-800 border border-dark-600 rounded-full shadow-inner
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   placeholder-gray-500 text-gray-200"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  )
}

export default SearchBar