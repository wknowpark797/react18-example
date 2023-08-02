import useGetData from './useGetData';

function Posts() {
	const data = useGetData('https://jsonplaceholder.typicode.com/posts');
	console.log(data);

	return (
		<div>
			{data &&
				data.map((post) => {
					return (
						<div key={post.id}>
							<h2>{post.title}</h2>
							<p>{post.body}</p>
							<hr />
						</div>
					);
				})}
		</div>
	);
}

export default Posts;
