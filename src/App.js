import './styles/App.css';

import { useRef, useState } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'Javascript 1', body: 'Description 1' },
		{ id: 2, title: 'Javascript 2', body: 'Description 2' },
		{ id: 3, title: 'Javascript 3', body: 'Description 3' },
	]);

	const [post, setPost] = useState({
		title: '',
		body: '',
	});

	const addNewPost = (e) => {
		e.preventDefault();
		
		setPosts([...posts, {...post, id: Date.now()}]);
		setPost({ title: '', body: '' });
	};

	return (
		<div className='App'>
			<form>
				{/* Управляемый компонент */}
				<MyInput
					onChange={(e) => setPost({ ...post, title: e.target.value })}
					value={post.title}
					type='text'
					placeholder={'Название поста'}
				/>

				<MyInput
					onChange={(e) => setPost({ ...post, body: e.target.value })}
					value={post.body}
					type='text'
					placeholder={'Описание поста'}
				/>
				<MyButton onClick={addNewPost}>Создать пост</MyButton>
			</form>
			<PostList posts={posts} title={'Список постов'} />
		</div>
	);
}

export default App;
