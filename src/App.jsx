import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from './Containers/Home'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Home/>
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App