import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// main 함수에서 index.css 불러와야 적용됨
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)