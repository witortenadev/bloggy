import React from 'react'
import Posts from '../components/Posts'
import Navbar from '../components/Navbar'

function PostsPage() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section>
        <Posts />
      </section>
    </main>
  )
}

export default PostsPage
