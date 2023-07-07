import React from 'react'

function Posts() {
  return (
      <div className="post">
        <div className="image">
          <img src="https://images.indianexpress.com/2023/07/twitter-threads.jpg?w=414" alt="" srcset="" />
        </div>
        <div className="texts">
          <div className="heading">Twitter threatens to sue Meta over Threads platform</div>
          <div className="info">
            <a href="/" className="author">Milind Sharma</a>
            <div className='time'>Published: 2023-07-08 10:30</div>
          </div>
          <div className="para">Spiro, in his letter, accused Meta of hiring former Twitter employees who "had and continue to have access to Twitter's trade secrets and other highly confidential information," News website Semafor first reported.</div>
        </div>
      </div>
  )
}

export default Posts