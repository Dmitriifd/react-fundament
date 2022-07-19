import './styles/App.css';

import { useState } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
    const [posts, setPost] = useState([
        { id: 1, title: 'Javascript 1', body: 'Description 1' },
        { id: 2, title: 'Javascript 2', body: 'Description 2' },
        { id: 3, title: 'Javascript 3', body: 'Description 3' },
    ])

	return (
		<div className='App'>
			<form>
				<MyInput type='text' placeholder={'Название поста'} />
				<MyInput type='text' placeholder={'Описание поста'} />
				<MyButton>Создать пост</MyButton>
			</form>
			<PostList posts={posts} title={'Список постов'} />
		</div>
	);
}

export default App;
