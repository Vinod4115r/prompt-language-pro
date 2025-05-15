import { motion } from "framer-motion";
import { Languages, MoveRight } from "lucide-react";

/**
 * Component to display translation concept images
 */
export function TranslationImages() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6" aria-hidden="true">
      {/* Translation concept image 1 */}
      <motion.div 
        className="rounded-lg overflow-hidden h-24 bg-gray-100 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-center w-full h-full p-4">
          <Languages className="h-12 w-12 text-primary-500 mr-2" />
          <span className="text-xl font-medium text-gray-700">Detect</span>
        </div>
      </motion.div>
      
      {/* Translation concept image 2 */}
      <motion.div 
        className="rounded-lg overflow-hidden h-24 bg-gray-100 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-center w-full h-full p-4">
          <span className="text-xl font-medium text-gray-700 mr-2">Enhance</span>
          <MoveRight className="h-8 w-8 text-primary-500" />
        </div>
      </motion.div>
    </div>
  );
}
