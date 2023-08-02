import { useFlickrQuery } from './useFlickrQuery';

function Flickr() {
	const { data, isSuccess } = useFlickrQuery({ type: 'interest' });

	return (
		<div>
			<h1>Flikr</h1>

			{isSuccess &&
				data.map((item, idx) => {
					return (
						<img
							key={idx}
							src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
							alt={item.title}
						/>
					);
				})}
		</div>
	);
}

export default Flickr;
