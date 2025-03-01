import clsx from "clsx";
import { motion } from "framer-motion";

interface RainbowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const RainbowButton: React.FC<RainbowButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <motion.button
      onClick={onClick}
      // whileHover={{ scale: 1.1 }} // Slight scaling on hover
      // whileTap={{ scale: 0.95 }} // Press effect
      className={clsx(
        "relative inline-block px-6 py-2 text-white font-bold bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 to-blue-500 before:blur-md before:opacity-75 before:transition-all before:duration-300 hover:before:opacity-100",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default RainbowButton;
