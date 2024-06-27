import './App.css'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

// import data from '../memesdata.js'  -  //  initial source of data then changed to api


function Meme() {
  const [allMemes, setAllMemes] = useState([])
  let currentImage = "../images/memeimg.png"
  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes)
      )}, []  )
  

  const [meme, setMeme] = useState({
    memeImage: currentImage,
    topText: "",
    bottomText: ""
  }) 
 
  function getMeme(event) {
    event.preventDefault()
    const randomIndex=Math.floor(Math.random()*allMemes.length)
    const {name, value, type} = event.target
    setMeme(prevMeme => {
      return ({
        ...prevMeme,
        [name] : type==="submit" ? allMemes[randomIndex].url : value
        
      })
    })
  }
     
  return (  
    <main>
      <div className="form">
        <div className='input-container'>
          <label htmlFor="top-text">Top text</label>
          <input 
            type="text" 
            name="topText" 
            id="top-text"  
            placeholder='shut up' 
            className='text-input' 
            onChange={getMeme}
            value={meme.topText}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="bottom-text">Bottom text</label>
          <input 
            type="text" 
            name="bottomText" 
            id="bottom-text" 
            placeholder='and take my money'
            className='text-input' 
            onChange={getMeme}
            value={meme.bottomText}
          />
        </div>
        <button onClick={getMeme} type='submit' name="memeImage">Get a new meme image  🖼</button>
      </div>
      < div className='image-container'>
        <img src={meme.memeImage} alt="meme image" id="meme-img" />
        <h1 id='img-top-text' >{meme.topText}</h1>
        <h1 id='img-bottom-text' >{meme.bottomText}</h1>
      </div>


    </main>
  )

}





export default Meme


