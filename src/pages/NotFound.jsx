import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

function NotFound() {
  return (
    <div className="container-custom h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/"
        className="btn btn-primary flex items-center gap-2"
      >
        <FiHome />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound