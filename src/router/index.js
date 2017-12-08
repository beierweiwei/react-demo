import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Views from '../views/index';
const BasicExample = () => (
  <Router>
  	<div>
	    <Route path="/test" component={Test}/>
	    <Route path="/home" component={Views.Home}/>
  	</div>

  </Router>
)

const Test = () => {
  return (
    <div>test</div>  
  )
}

const Home = () => {
	return (
		<div> Home </div>
	)
}

export default BasicExample;

