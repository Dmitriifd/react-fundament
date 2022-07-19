import './styles/App.css';

import { useState } from 'react';
import PostList from './components/PostList';

function App() {
    const [posts, setPost] = useState([
        { id: 1, title: 'Javascript 1', body: 'Description 1' },
        { id: 2, title: 'Javascript 2', body: 'Description 2' },
        { id: 3, title: 'Javascript 3', body: 'Description 3' },
    ])

	return (
		<div className='App'>
           <PostList posts={posts} title={'Список постов'}/>
		</div>
	);
}

export default App;
