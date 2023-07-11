import React from 'react'
import Header from './Header'
import Posts from './Posts'

function RootLayout() {
  return (
    <main>
        <Header/>
        <Posts/>
        <Posts/>
    </main>
  )
}

export default RootLayout