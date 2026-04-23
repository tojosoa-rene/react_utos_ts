// Fichier du layout principal de l'application
// - il contient la Navbar et la Sidebar, et affiche le contenu principal (children)
// - il gère l'état d'ouverture de la sidebar

import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../../../styles/layout.css'

type LayoutProps = {
    children: React.ReactNode;
};

// type NavbarProps = {
//   onToggle: () => void;
// };

type NavbarProps = {
  onSelectSection: (index: number) => void;
  onClickBrand: () => void;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <Navbar onSelectSection={() => {}} onClickBrand={() => setSidebarOpen(prev => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        {children}
      </div>
    </>
  )
}

export default Layout