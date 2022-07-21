import '../styles/App.css';

import { useEffect, useState } from 'react';

import PostService from '../API/PostService';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import MyModal from '../components/UI/MyModal/MyModal';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import Loader from '../components/UI/Loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {
	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page);
			setPosts(response.data);
			const totalCount = response.headers['x-total-count'];
			setTotalPages(getPageCount(totalCount, limit));
		}
	);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	useEffect(() => {
		fetchPosts(limit, page);
	}, []);

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page);
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
			<Pagination page={page} changePage={changePage} totalPages={totalPages} />
		</div>
	);
}

export default Posts;
