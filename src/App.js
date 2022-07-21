import './styles/App.css';

import { useEffect, useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';

function App() {
	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	let pagesArray = getPagesArray(totalPages);

	const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	});

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	useEffect(() => {
		fetchPosts();
	}, [page]);

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

    const changePage = (page) => {
        setPage(page);
    }

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
			{postError && <h1>Произошла ошибка</h1>}
			{isPostLoading ? (
				<Loader />
			) : (
				<PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title={'Список постов'}
				/>
			)}
			<div className='page__wrapper'>
				{pagesArray.map((btn) => (
					<span
						onClick={() => changePage(btn)}
						key={btn}
						className={page === btn ? 'page page__current' : 'page'}
					>
						{btn}
					</span>
				))}
			</div>
		</div>
	);
}

export default App;
