import { motion } from 'framer-motion'

function CategoryCard({ category, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onClick(category.strCategory)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800/60 to-transparent z-10"></div>
      
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      <div className="absolute inset-x-0 bottom-0 p-4 z-20">
        <h3 className="text-lg font-semibold text-white">
          {category.strCategory}
        </h3>
        <p className="text-xs text-gray-300 line-clamp-2 mt-1">
          {category.strCategoryDescription.split('. ')[0]}.
        </p>
      </div>
    </motion.div>
  )
}

export default CategoryCard