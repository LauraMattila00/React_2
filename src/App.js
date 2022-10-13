
import axios from 'axios';
import { useState } from 'react';
import './App.css';

const API_URL = 'https://api.spoonacular.com/recipes/search?'
const API_KEY = 'bd8ca746cc524104b0e35cc10ede52a7'
const IMG_URL = 'https://spoonacular.com/recipeImages/'

function App() {

  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [length, setLength] = useState(0)

  const searchUrl = API_URL + 'apiKey=' + API_KEY + '&query=' + search

  function searchRecipe(e) {
    e.preventDefault()

    const randomNumber = Math.floor(Math.random() * length)

    axios.get(searchUrl)
      .then((response) => {
        if (search.length < 1) {
          alert('Write something!')
        } else {
          setLength(response.data.results.length)
          setTitle(response.data.results[randomNumber].title)
          setImage(IMG_URL + response.data.results[randomNumber].id + '-556x370.jpg')
          setUrl('Go to recipe: ' + response.data.results[randomNumber].sourceUrl)
        }
      }).catch(error => {
          alert('Try something else!')
        })
  }



  return (
    <div style={{ margin: '50px' }}>
      <h2>What shall we eat today?</h2>
      <form onSubmit={searchRecipe}>
        <input type="text" value={search} placeholder="recipe title, ingredient..." onChange={e => setSearch(e.target.value)}></input>
        <button type="submit" style={{ margin: '5px' }}>Search random recipe</button>
        <h3>{title}</h3>
        <img src={image}></img>
        <p>{url}</p>
      </form>
    </div>

  );
}

export default App;
