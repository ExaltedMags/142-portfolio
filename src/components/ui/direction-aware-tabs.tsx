"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface DirectionAwareTabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface DirectionAwareTabsContextValue {
  value: string
  onValueChange: (value: string) => void
  direction: React.MutableRefObject<number>
  tabValues: React.MutableRefObject<string[]>
}

const DirectionAwareTabsContext = React.createContext<DirectionAwareTabsContextValue | null>(null)

function useDirectionAwareTabs() {
  const context = React.useContext(DirectionAwareTabsContext)
  if (!context) {
    throw new Error("DirectionAwareTabs components must be used within DirectionAwareTabs")
  }
  return context
}

const DirectionAwareTabs = React.forwardRef<
  HTMLDivElement,
  DirectionAwareTabsProps
>(({ defaultValue = "", value: valueProp, onValueChange, children, className }, ref) => {
  const [value, setValue] = React.useState(defaultValue)
  const direction = React.useRef(1)
  const tabValues = React.useRef<string[]>([])

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      const currentValue = valueProp ?? value
      const currentIndex = tabValues.current.indexOf(currentValue)
      const newIndex = tabValues.current.indexOf(newValue)

      if (currentIndex !== -1 && newIndex !== -1) {
        direction.current = newIndex > currentIndex ? 1 : -1
      }

      setValue(newValue)
      onValueChange?.(newValue)
    },
    [value, valueProp, onValueChange]
  )

  const currentValue = valueProp ?? value

  return (
    <DirectionAwareTabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        direction,
        tabValues,
      }}
    >
      <div ref={ref} className={className}>
        {children}
      </div>
    </DirectionAwareTabsContext.Provider>
  )
})
DirectionAwareTabs.displayName = "DirectionAwareTabs"

interface DirectionAwareTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DirectionAwareTabsList = React.forwardRef<
  HTMLDivElement,
  DirectionAwareTabsListProps
>(({ className, children, ...props }, ref) => {
  const { tabValues } = useDirectionAwareTabs()

  // Collect tab values from children
  React.useEffect(() => {
    const values: string[] = []
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === DirectionAwareTabsTrigger) {
        values.push(child.props.value)
      }
    })
    tabValues.current = values
  }, [children, tabValues])

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-paper-dark/50 p-1 text-ink-muted border border-ink/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DirectionAwareTabsList.displayName = "DirectionAwareTabsList"

interface DirectionAwareTabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const DirectionAwareTabsTrigger = React.forwardRef<
  HTMLButtonElement,
  DirectionAwareTabsTriggerProps
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange, direction } =
    useDirectionAwareTabs()
  const isSelected = selectedValue === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "relative",
        isSelected
          ? "text-ink font-medium"
          : "text-ink-muted hover:text-ink",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-sm bg-paper border border-accent/40 shadow-sm"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={{
            x: direction.current < 0 ? "-100%" : "100%",
          }}
          animate={{
            x: 0,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
})
DirectionAwareTabsTrigger.displayName = "DirectionAwareTabsTrigger"

interface DirectionAwareTabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

const DirectionAwareTabsContent = React.forwardRef<
  HTMLDivElement,
  DirectionAwareTabsContentProps
>(({ className, value, forceMount, children, ...props }, ref) => {
  const { value: selectedValue, direction } = useDirectionAwareTabs()
  const isSelected = selectedValue === value

  // Exclude onDrag from props to avoid conflict with Framer Motion
  const { onDrag, ...motionProps } = props as any

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          ref={ref}
          role="tabpanel"
          data-state={isSelected ? "active" : "inactive"}
          className={cn(className)}
          initial={{
            opacity: 0,
            x: direction.current * 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: direction.current * -20,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
DirectionAwareTabsContent.displayName = "DirectionAwareTabsContent"

export {
  DirectionAwareTabs,
  DirectionAwareTabsList,
  DirectionAwareTabsTrigger,
  DirectionAwareTabsContent,
}
