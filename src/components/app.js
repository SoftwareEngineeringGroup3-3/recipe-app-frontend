import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<Profile path="/login/"/>
		</Router>
	</div>
)

export default App;
