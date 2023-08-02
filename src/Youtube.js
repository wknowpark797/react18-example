import { useYoutubeQuery } from './useYoutubeQuery';

function Youtube() {
	const { data, isSuccess } = useYoutubeQuery();

	return (
		<div>
			<h1>Youtube</h1>

			{isSuccess &&
				data.map((item, idx) => {
					return <img key={idx} src={item.snippet.thumbnails.standard.url} alt={item.snippet.title} />;
				})}
		</div>
	);
}

export default Youtube;
