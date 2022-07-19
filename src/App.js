import './styles/App.css';

import { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'ааа', body: 'ббб' },
		{ id: 2, title: 'ггг', body: 'ааа' },
		{ id: 3, title: 'ввв', body: 'яяяя' },
	]);

	const [selectedSort, setSelectedSort] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	function getSortedPosts() {
		if (selectedSort) {
			return [...posts].sort((a, b) =>
				a[selectedSort].localeCompare(b[selectedSort])
			);
		}

        return posts;
	}

	const sortedPosts = getSortedPosts();

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	const sortPosts = (sort) => {
		setSelectedSort(sort);
	};

	return (
		<div className='App'>
			<PostForm create={createPost} />
			<hr style={{ margin: '15px 0' }} />
			<div>
				<MyInput
					onChange={(e) => setSearchQuery(e.target.value)}
					value={searchQuery}
					placeholder={'Поиск...'}
				/>
				<MySelect
					value={selectedSort}
					onChange={sortPosts}
					defaultValue={'Сортировка'}
					options={[
						{ value: 'title', name: 'По названию' },
						{ value: 'body', name: 'По описанию' },
					]}
				/>
			</div>
			{posts.length !== 0 ? (
				<PostList
					remove={removePost}
					posts={sortedPosts}
					title={'Список постов'}
				/>
			) : (
				<h1 style={{ textAlign: 'center' }}>Посты не были найдены</h1>
			)}
		</div>
	);
}

export default App;
