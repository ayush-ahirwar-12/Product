import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Navbar from './components/Navbar.jsx'
import { Provider } from 'react-redux'
import { Store } from './Store/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
    <Navbar/>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
