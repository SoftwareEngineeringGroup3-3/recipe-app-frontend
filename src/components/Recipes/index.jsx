import React from 'react'
import styles from './styles.css'

function Recipes() {
var recipes = ['Recipe1','Recipe2','Recipe3']
  return (
<div>
        {
                recipes.map(name => <h2>{name}</h2>)
        }
        </div>
  )
}

export default Recipes