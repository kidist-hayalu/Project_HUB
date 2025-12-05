import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function MotionWrapper({ children }) {
    const location = useLocation(); //window.location.pathname;*/
    const fade = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
    };
  return (
    <AnimatePresence mode="wait" initial={false}>
    <motion.div
     key={location.pathname}
    variants={fade}
      initial="hidden"   
      animate="visible"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen min-w-screen"
    >
      {children}
    </motion.div>
    </AnimatePresence>
  );
}