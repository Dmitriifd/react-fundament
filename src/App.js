import './styles/App.css';

import { useRef, useState } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
	const [posts, setPost] = useState([
		{ id: 1, title: 'Javascript 1', body: 'Description 1' },
		{ id: 2, title: 'Javascript 2', body: 'Description 2' },
		{ id: 3, title: 'Javascript 3', body: 'Description 3' },
	]);

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const addNewPost = (e) => {
		e.preventDefault();
		const newPost = {
			id: Date.now(),
			title,
			body,
		};
		/* Не изменяем состояние напрямую, передаем туда новый массив куда разворачиваем старый массив с уже существующими постами и в конец добавляем новый пост */
		setPost([...posts, newPost]);
		setTitle('');
		setBody('');
	};

	return (
		<div className='App'>
			<form>
				{/* Управляемый компонент */}
				<MyInput
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					type='text'
					placeholder={'Название поста'}
				/>

				<MyInput
					onChange={(e) => setBody(e.target.value)}
					value={body}
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
