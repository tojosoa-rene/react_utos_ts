import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import App from './App.jsx'
import { store } from './store/store' // important

import './styles/theme.css';
import './styles/form.css';
import './styles/layout.css';
import './styles/toast.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* ITO no missing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)