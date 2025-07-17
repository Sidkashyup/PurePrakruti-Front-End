/*
FadeInSection is a wrapper component that uses Framer Motion to apply a smooth animation (like fade-in or slide-up) to its children when they are rendered.

You typically wrap lazy-loaded components in it so they don’t just “pop in” abruptly after loading — they animate into view smoothly.
*/

import { motion } from "framer-motion";

const FadeInSection = ({ Children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // 👈 start invisible, 20px lower
      animate={{ opacity: 1, y: 0 }}    // 👈 animate to fully visible, original position
      transition={{ duration: 0.5 }}    // 👈 animation lasts 0.5 seconds
    >
      {Children}
    </motion.div>
  );
};

export default FadeInSection;
