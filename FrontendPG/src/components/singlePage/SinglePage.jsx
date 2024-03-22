import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { hero,world, popular, ppost, lifestyle, tpost } from "../../dummyData"
import "../home/mainContent/homes/style.css"
import "./singlepage.css"
import "../home/sideContent/side/side.css"

const SinglePage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const allArrays = [hero, world, popular, ppost, lifestyle, tpost];
    const item = allArrays
      .flatMap(array => array)
      .find(item => item.id === parseInt(id));
  
    window.scrollTo(0, 0);
  
    if (item) {
      setItem(item);
    }
  }, [id, hero, world, popular, ppost, lifestyle, tpost]);
  

  return (
    <>
      {item ? (
        <main>
          <div className='container'>
            <section className='mainContent details'>
              <h1 className='title'>{item.title}</h1>

              <div className='author'>
                <span>by</span>
                <img src={item.authorImg} alt='' />
                <p> {item.authorName} on</p>
                <label>{item.time}</label>
              </div>

              <div className='desctop'>
                {item.desc.map((val) => {
                  return (
                    <>
                      <p>{val.para1}</p>
                      <p>{val.para2}</p>
                    </>
                  )
                })}
              </div>
              <img src={item.cover} alt='' />
              {item.desc.map((val) => (
                <p>{val.para3}</p>
              ))}

              <div className='descbot'>
                {item.details.map((data) => {
                  return (
                    <>
                      <h1>{data.title}</h1>
                      <p>{data.para1}</p>
                    </>
                  )
                })}
              </div>

              <div className='quote'>
                <i className='fa fa-quote-left'></i>
                {item.details.map((data) => (
                  <p>{data.quote}</p>
                ))}
              </div>

              <div className='desctop'>
                {item.details.map((data) => {
                  return (
                    <>
                      <p>{data.para2}</p>
                      <p>{data.para3}</p>
                    </>
                  )
                })}
              </div>
            </section>
          </div>
        </main>
      ) : (
        <h1>not found</h1>
      )}
    </>
  )
}

export default SinglePage
