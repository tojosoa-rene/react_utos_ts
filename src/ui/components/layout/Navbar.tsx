// Fichier de la barre de navigation (Navbar)
// - il affiche la marque et les sections de navigation
// - il gère les interactions avec la barre (clic sur la marque pour ouvrir/fermer la sidebar, clic sur les sections pour naviguer)

import { useState } from 'react'
import '../../../styles/layout.css'

// type NavbarProps = {
//   onToggle: (index: number) => void;
// };

type NavbarProps = {
  onSelectSection: (index: number) => void;
  onClickBrand: () => void;
};

function Navbar({ onSelectSection, onClickBrand }: NavbarProps) {
  const sections = [
    'Section 1', 'Section 2', 'Section 3', 'Section 4',
    'Section 5', 'Section 6', 'Section 7', 'Section 8',
    'Section 9', 'Section 10', 'Section 11', 'Section 12'
  ]

  return (
    <div className="top-navbar">
      <div className="brand" onClick={() => onClickBrand()}>
        <i className="bi bi-cpu" style={{ fontSize: '16px' }}></i>
        UTOS
      </div>
      <div className="nav-squares">
        {sections.map((s, i) => (
          <div key={i} className="nav-square-item" title={s} onClick={() => onSelectSection(i)}>
            <div className="nav-square-icon"></div>
          </div>
        ))}
      </div>
      <div className="nav-right">
        <div className="nav-right-bar"></div>
        <div className="nav-right-sq"></div>
        <div className="nav-right-sq"></div>
        <div className="nav-right-sq"></div>
      </div>
    </div>
  )
}

export default Navbar