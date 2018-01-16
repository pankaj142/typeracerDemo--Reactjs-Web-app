import React from 'react';
import {render} from 'react-dom';

import Home from './components/home';
const App = ()=>(
	    <div>
	       <h2>Type Racer</h2>
	       <Home/>
	    </div>
);

render(<App/>,document.getElementById('root'));
