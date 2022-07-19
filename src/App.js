import { useState } from 'react';
import './styles/App.css';

function App() {
	const [likes, setLikes] = useState(0);
	const [value, setValue] = useState('Текст в инпуте');

	function increment() {
		setLikes(likes + 1);
	}
	function decrement() {
		setLikes(likes - 1);
	}

	return (
		<div className='App'>
			<h1>{likes}</h1>
			<h1>{value}</h1>
            
            {/* Двустороние связывание, управляемый инпут*/}
            <input onChange={event => setValue(event.target.value)} type="text" value={value} />

			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	);
}

export default App;
