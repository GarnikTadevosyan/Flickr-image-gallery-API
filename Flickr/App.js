
import React, { useEffect, useState } from 'react'
import './App.css'

const KEY = '366afdcf519422bc32b4927293e1f0fc';
const secret = 'b0549988aff54b83'

function App() {

const [pictures, setPictures] = useState([]);
const [tagName, setTagName] = useState('');
const [tagNameArr, setTagNameArr] = useState([]);
const [arr,setArr] = useState([])
const [tagDetector, setTagDetector] = useState('')
const [page, setPage] = useState(1)
  
let permission = pictures.length && tagNameArr.length

const getPhotos = () => {
      //
      arr.map( tag => {
      let apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search`
      if (tag) {
      apiUrl += `&api_key=${KEY}`
      apiUrl += `&tags=${tag}&per_page=5&page=${page}&format=json&nojsoncallback=1`
      fetch(apiUrl)
        .then(resp => resp.json())
        .then(picObj => {
              if (picObj.photos.photo.length) {
              let srPath = picObj.photos.photo.map(pic => {
              return {path:`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`,group:tag}
            })
              let picArray = srPath.map((url) => url);
              setPictures((prev) => [...prev,...picArray])
              setPage((page) => page + 1);
          }else{
              setTagNameArr([])
              setPictures([])
              setArr([])
              setTagDetector('true')
          }
        })
        .catch(err => console.log(err.message));
    }//

  })
  }
  const handleChange = (e) => {
        let value = e.target.value;
        setTagName(value);
        const copy = [...value].join('')
        const spliter = copy.split(' ')
        const noSpaceArr = spliter.map( (elem) => elem.trim() )
        const newTagNameArr = noSpaceArr.filter( (elem,index) => {
          return noSpaceArr.indexOf(elem) == index;
        })
        const pureArr = newTagNameArr.filter( (elem) => elem !== '' )
        setArr(pureArr);
  }
  const handleSubmit = (e) => {
        e.preventDefault();
        setTagNameArr(arr)
        setTagDetector('')
        getPhotos();
  }
  return (
    <div className='wrapper'>
      <button type='text' value='hello'></button>
      <div className='wrapper_content'>
        <h1 className='title'>Flickr Image Gallery</h1>
        <div className='search_container'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type='text'
              placeholder='write search image name'
              value={tagName}
              onChange={handleChange} />
            <button
              type='submit'
              className='searcher'>
              Search
            </button>
          </form>
        </div>
        <div className='image_container'>
          {!tagDetector ? 
            pictures.map((url, index) => {
            return (
              <div className='image_box' 
                   key={index} 
                   onDragEnd={e =>  console.log(e.target)}
              >
                <div className='image_item'>
                  <img 
                      src={url.path} 
                      id={url.group}
                     />
                </div>
              </div>)
              }) :
              <h1 className='oops'>
                  Oops! no image found for this tag 😐
              </h1>}
        </div>
        <div className='basket_container'>
             <div className='image_basket'>
            { permission
              ?
              tagNameArr.map((name, index) => {
                return (
                  <button 
                         key={index} 
                         id={name}
                         >
                         {name}
                  </button>
                )
              }) : null}
          </div>
        </div>
        <hr />
        <div className='pics_group_conatiner'>
            { permission
              ?
              tagNameArr.map((name, index) => {
                return (
                  <div 
                      className='image_query_group' 
                      key={index} 
                      id={name}
                      >
                    <p className='group_name'>{name}</p>
                     
                  </div>
                )
                }) : null}
        </div>
      </div>
    </div>
  )
}

export default App
