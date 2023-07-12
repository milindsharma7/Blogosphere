import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      Made with <div id='heartEmoji'>&#10084;</div> by Milind Sharma
      <div id='contact'>    
        <div>
          |
        </div>  
        <a href="https://www.linkedin.com/in/milind-sharma7/" target='_blank'>
          Linkedin
        </a>
        <div>
          |
        </div>
        <a href="https://github.com/milindsharma7/" target='_blank'>
          Github
        </a>
      </div>
    </div>
  )
}

export default Footer