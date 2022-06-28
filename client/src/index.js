import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <div className='content'>
      <Routes>
        <Route exact path='/' element={<App />} />
      </Routes>
    </div>
  </BrowserRouter>
)
