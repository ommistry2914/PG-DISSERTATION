import React from 'react'
import './Guidecard.css';
const GuideCard = () => {
 
  return (
  
<div class="containerss">

  <div class="grid-7 element-animation">
    <div class="card color-card-2">
      <ul>
        <li><i class="fas fa-arrow-left i-l b"></i></li>
        <li><i class="fas fa-ellipsis-v i-r b"></i></li>
        <li><i class="far fa-heart i-r b"></i></li>
      </ul>
      <img src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7d5363c18112a02ce22d0c46f8570147&auto=format&fit=crop&w=635&q=80%20635w" alt="profile-pic" class="profile"/>
      <h1 class="title-2">Bevely Little</h1>
      <p class="job-title"> SENIOR PRODUCT DESIGNER</p>
      <div class="desc top">
        <p>Create usable interface and designs @GraphicSpark</p>
      </div>
      <button class="btn color-a top"> Hire me</button>

      <div class="hr-2">
      <div class="containerss">
        <div class="content">
          <div class="grid-2">
            <button class="color-b circule"> <i class="fab fa-dribbble fa-2x"></i></button>
            <h2 class="title-2">12.3k</h2>
            <p class="followers">Followers</p>
          </div>
          <div class="grid-2">
            <button class="color-c circule"><i class="fab fa-behance fa-2x"></i></button>
            <h2 class="title-2">16k</h2>
            <p class="followers">Folls</p>
          </div>
          <div class="grid-2">
            <button class="color-d circule"><i class="fab fa-github-alt fa-2x"></i></button>
            <h2 class="title-2">17.8k</h2>
            <p class="followers">Follos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default GuideCard
