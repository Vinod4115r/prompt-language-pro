import { motion } from "framer-motion";

/**
 * Component to display language typography images
 */
export function LanguageImages() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6" aria-hidden="true">
      {/* Hindi Typography */}
      <motion.div 
        className="rounded-lg overflow-hidden h-16 bg-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <svg 
          viewBox="0 0 150 100" 
          className="w-full h-full object-cover text-primary-500"
          fill="currentColor"
        >
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                fontSize="24" fontFamily="Arial, sans-serif">हिन्दी</text>
        </svg>
      </motion.div>
      
      {/* Tamil Typography */}
      <motion.div 
        className="rounded-lg overflow-hidden h-16 bg-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <svg 
          viewBox="0 0 150 100" 
          className="w-full h-full object-cover text-primary-500"
          fill="currentColor"
        >
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                fontSize="24" fontFamily="Arial, sans-serif">தமிழ்</text>
        </svg>
      </motion.div>
      
      {/* Bengali Typography */}
      <motion.div 
        className="rounded-lg overflow-hidden h-16 bg-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <svg 
          viewBox="0 0 150 100" 
          className="w-full h-full object-cover text-primary-500"
          fill="currentColor"
        >
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                fontSize="24" fontFamily="Arial, sans-serif">বাংলা</text>
        </svg>
      </motion.div>
      
      {/* Kannada Typography */}
      <motion.div 
        className="rounded-lg overflow-hidden h-16 bg-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <svg 
          viewBox="0 0 150 100" 
          className="w-full h-full object-cover text-primary-500"
          fill="currentColor"
        >
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                fontSize="24" fontFamily="Arial, sans-serif">ಕನ್ನಡ</text>
        </svg>
      </motion.div>
    </div>
  );
}
