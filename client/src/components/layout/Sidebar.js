import React from 'react'

const Sidebar = props => {
  return (
    <div class="sidebar">
      <nav id="sidebar">
          <div id="dismiss">
              <i class="fa fa-arrow-left"></i>
          </div>
          <ul class="list-unstyled components">
              <li class="active">
                  <a href="index.html">Home</a>
              </li>
              <li>
                  <a href="about.html">About</a>
              </li>
              <li>
                  <a href="recipe.html">Recipe</a>
              </li>
              <li>
                  <a href="blog.html">Blog</a>
              </li>
              <li>
                  <a href="contact.html">Contact Us</a>
              </li>
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar
