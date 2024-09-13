
import './global.css'
import Canlendar from '@/components/calendar/calendar'
import { motion } from 'framer-motion';
import { useState } from 'react';

const SmallBox = () => (
  <motion.div
    layoutId="box"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    style={{
      position: 'relative',
      width: 100,
      height: 100,
      backgroundColor: '#4682B4',
      borderRadius: 20,
      cursor: 'pointer',
    }}
  />
);

const LargeBox = () => (
  <motion.div
    layoutId="box"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    style={{
      position: 'fixed',
      top: 50,
      left: 50,
      width: 300,
      height: 300,
      backgroundColor: '#FF6347',
      borderRadius: 20,
      zIndex: 1000,
      cursor: 'pointer',
    }}
  />
);
function App() {
  return (
    
    <>
      <Canlendar />
    </>
  )
}

export default App
