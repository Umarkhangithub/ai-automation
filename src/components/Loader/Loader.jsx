import { motion } from "framer-motion";

const Loader = ({ height = 'screen', bgColor='gray-100' }) => {
  return (
    <div className={`flex items-center justify-center  bg-${bgColor} h-${height}`}>
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="w-4 h-4 bg-blue-500 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;
