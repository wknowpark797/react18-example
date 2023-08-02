import useGetData from './useGetData';

function Posts() {
	const data = useGetData('https://jsonplaceholder.typicode.com/posts');
	console.log(data);

	return <div></div>;
}

export default Posts;
