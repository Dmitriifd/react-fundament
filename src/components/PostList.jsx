import React from 'react';
import { PostItem } from './PostItem';

const PostList = ({ posts, title }) => {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>{title}</h1>
			{/* key={index}  Индекс использовать не рекомендуется, поскольку при удалении и добавлении элемента индексы меняются, а ключ всегда должен быть статитчным и уникальным , ключи позволяют перерисовывать не весь список а только те элементы которые изменились*/}
			{posts.map((post) => (
				<PostItem post={post} key={post.id} />
			))}
		</div>
	);
};

export default PostList;
