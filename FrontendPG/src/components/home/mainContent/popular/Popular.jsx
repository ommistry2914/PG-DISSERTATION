import React from "react"
import "./Popular.css"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { popular } from "../../../../dummyData"
import Heading from "../../../common/heading/Heading"

const Popular = () => {
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    autoplay: true, // Add autoplay property
    autoplaySpeed: 2000, // Set autoplay speed in milliseconds (e.g., 3000ms = 3 seconds)
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };

  return (
    <>
      <section className='popular'>
        <Heading title='Popular' />
        <div className='content'>
          <Slider {...settings}>
            {popular.map((val) => {
              return (
                <div className='items'>
                   <Link to={`/SinglePage/${val.id}`}>
                  <div className='box shadow'>
                    <div className='images row'>
                      <div className='img'>
                        <img src={val.cover} alt='' />
                      </div>
                      <div class='category category1'>
                        <span>{val.catgeory}</span>
                      </div>
                    </div>
                    <div className='text row'>
                      <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                      <div className='date'>
                        <i class='fas fa-calendar-days'></i>
                        <label>{val.date}</label>
                      </div>
                      <div className='comment'>
                        <i class='fas fa-comments'></i>
                        <label>{val.comments}</label>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
               
              )
            })}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default Popular
