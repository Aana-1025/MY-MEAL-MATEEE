import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiHeart, FiCalendar, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from '../auth/AuthModal'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, openLoginModal, loginModalOpen, closeLoginModal } = useAuth()
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <>
      <nav className="bg-dark-800 bg-opacity-95 backdrop-blur-sm fixed w-full top-0 z-40 shadow-glow">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-white">
                <span className="text-primary-400 animate-glow">My</span>
                <span className="text-primary-500">Meal</span>
                <span className="text-primary-600">Mate</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `navbar-link ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}`
                }
              >
                <div className="flex items-center space-x-1">
                  <FiHome />
                  <span>Home</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => 
                  `navbar-link ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}`
                }
              >
                <div className="flex items-center space-x-1">
                  <FiHeart />
                  <span>Favorites</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/planner" 
                className={({ isActive }) => 
                  `navbar-link ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}`
                }
              >
                <div className="flex items-center space-x-1">
                  <FiCalendar />
                  <span>Planner</span>
                </div>
              </NavLink>
            </div>

            <div className="flex items-center">
              <button 
                onClick={openLoginModal}
                className="flex items-center space-x-1 px-3 py-2 rounded-full bg-dark-600 hover:bg-dark-500 transition-colors duration-200 shadow-glow-sm hover:shadow-glow"
              >
                <FiUser className="text-primary-400" />
                <span className="text-sm font-medium">
                  {currentUser ? currentUser.name : 'Login'}
                </span>
              </button>

              <div className="ml-4 md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-600 focus:outline-none"
                >
                  {isOpen ? (
                    <FiX className="block h-6 w-6" />
                  ) : (
                    <FiMenu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-dark-700 shadow-glow"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `block navbar-link ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}`
                }
              >
                <div className="flex items-center space-x-2">
                  <FiHome />
                  <span>Home</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => 
                  `block navbar-link ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}`
                }
              >
                <div className="flex items-center space-x-2">
                  <FiHeart />
                  <span>Favorites</span>
                </div>
              </NavLink>
              
              <NavLink 
                to="/planner" 
                className={({ isActive }) => 
                  `block navbar-link ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}`
                }
              >
                <div className="flex items-center space-x-2">
                  <FiCalendar />
                  <span>Planner</span>
                </div>
              </NavLink>
            </div>
          </motion.div>
        )}
      </nav>

      <AuthModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  )
}

export default Navbar