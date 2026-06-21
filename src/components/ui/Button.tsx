import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'className'> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white' | 'clay';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold font-sans tracking-widest rounded-full cursor-pointer transition-all duration-300 focus:outline-none text-[0.8125rem] py-3.5 px-8 select-none uppercase";
  
  const variants = {
    primary: "bg-[var(--color-navy)] hover:bg-[var(--color-navy-dark)] text-white border border-transparent shadow-[0_4px_14px_rgba(10, 25, 47,0.18)]",
    outline: "bg-transparent hover:bg-[var(--color-navy)] text-[var(--color-navy)] hover:text-white border border-[var(--color-navy)]",
    ghost: "bg-transparent hover:bg-[rgba(10, 25, 47,0.06)] text-[var(--color-navy)] border border-transparent",
    white: "bg-white hover:bg-[var(--color-navy-light)] text-[var(--color-navy)] border border-transparent shadow-[0_4px_14px_rgba(10, 25, 47,0.12)]",
    clay: "clay-btn-navy text-white border border-transparent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
export default Button;
