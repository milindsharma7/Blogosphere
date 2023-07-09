import React from 'react'
import { Link } from 'react-router-dom'

function Posts() {
  return (
      <div className="post">
        <div className="image">
          <img src="https://images.indianexpress.com/2023/07/twitter-threads.jpg?w=414"/>
        </div>
        <div className="texts">
          <div className="heading">
            <Link to='/'>Twitter threatens to sue Meta over Threads platform</Link>
          </div>
          <div className="info">
            <div className="author">Milind Sharma</div>
            <div className='time'>Published: 2023-07-08 10:30</div>
          </div>
          <div className="para">Spiro, in his letter, accused Meta of hiring former Twitter employees who "had and continue to have access to Twitter's trade secrets and other highly confidential information," News website Semafor first reported.</div>
        </div>
      </div>
  )
}

export default Posts