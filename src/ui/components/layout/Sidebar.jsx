import { useState } from 'react'
import '../../../styles/layout.css'
import { useDispatch } from "react-redux";
import { logout } from "../../../store/features/auth/authSlice";
import { Button } from "antd";


const sections = [
  'Section 1', 'Section 2', 'Section 3', 'Section 4',
  'Section 5', 'Section 6', 'Section 7', 'Section 8',
  'Section 9', 'Section 10', 'Section 11', 'Section 12'
]

function Sidebar({ isOpen, onClose }) {

  const dispatch = useDispatch();

  const [search, setSearch] = useState('')

  const filtered = sections.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  )

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Menu search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="sidebar-close" onClick={handleClose}>×</button>
        </div>
        <div>
          {filtered.map((s, i) => (
            <div key={i} className="menu-item">
              <div className="menu-dot"></div>
              <span className="menu-label">{s}</span>
              <i className="bi bi-chevron-right menu-chevron"></i>
            </div>
          ))}
        </div>
        <br></br>
        <div>
          <Button onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar