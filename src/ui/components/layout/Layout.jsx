import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '/src/styles/layout.css'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Navbar onToggle={() => setSidebarOpen(prev => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        {children}
      </div>
    </>
  )
}

export default Layout