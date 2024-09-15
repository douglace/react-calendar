
import './global.css'
import Canlendar from '@/components/calendar/calendar'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/theme/navabar'
function App() {
  return (
    
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Canlendar />
      <Toaster />
      <p className=' text-center mt-8 text-xl'>
        By <a href='https://vex6.me'>@vex6</a>
        <br />
        <br />
        <span className='underline text-lg'>
          Contact : kvdougalce@gmail.com
        </span>
      </p>
    </ThemeProvider>
      
    </>
  )
}

export default App
