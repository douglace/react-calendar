import { LayoutGroup, motion } from "framer-motion"
import { useState } from "react"

export function Frame1() {
  return (
    <LayoutGroup>
      <ToggleContent header="header-1" content="content-1" />
      <ToggleContent header="header-2" content="content-2" />
    </LayoutGroup> 
  )
}

function ToggleContent({ header, content }:{ header:string, content:string }) {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.h2 layout>{header}</motion.h2>
        {isOpen ? content : null}
      </motion.div>
    )
  }