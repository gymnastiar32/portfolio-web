import type { ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

const smoothEase = [0.22, 1, 0.36, 1] as const

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
}

export function Reveal({ children, delay = 0, duration = 0.55, y = 22, transition, viewport, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport ?? { once: true, amount: 0.18 }}
      transition={transition ?? { duration, delay, ease: smoothEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
