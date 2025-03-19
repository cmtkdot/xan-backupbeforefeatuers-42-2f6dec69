import React from "react"
import { cn } from "@/lib/utils"

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute h-1 w-1 overflow-hidden whitespace-nowrap p-0 border-0", 
          "clip-[rect(0,0,0,0)] [clip-path:inset(50%)] -m-px",
          className
        )}
        {...props}
      />
    )
  }
)

VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden } 