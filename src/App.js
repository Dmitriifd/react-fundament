import './styles/App.css';

import { PostItem } from './components/PostItem';

function App() {
	return (
		<div className='App'>
			<PostItem post={{id:1, title: 'Javascript 1', body: 'Description 1'}}/>
			<PostItem post={{id:2, title: 'Javascript 2', body: 'Description 2'}}/>
			<PostItem post={{id:3, title: 'Javascript 3', body: 'Description 3'}}/>
		</div>
	);
}

export default App;
