import React from 'react'
import Header from './Header'
import Posts from './Posts'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <main>
        <Header/>
        <Posts/>
        <Posts/>
        <Outlet/>
    </main>
  )
}

export default RootLayout