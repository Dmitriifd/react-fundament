import './styles/App.css';

import { useEffect, useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';

function App() {
	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostLoading, setIsPostLoading] = useState(false);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	async function fetchPosts() {
        setIsPostLoading(true);
		const posts = await PostService.getAll();
		setPosts(posts);
        setIsPostLoading(false);
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	return (
		<div className='App'>
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
				Создать статью
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />

            {isPostLoading ? <h1>Идет загрузка...</h1> : <PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title={'Список постов'}
			/>}
			
		</div>
	);
}

export default App;
