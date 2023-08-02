/* React Query를 활용하여 Suspense 더 쉽게 처리하기 */

import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Flickr from './Flickr';
import Youtube from './Youtube';

function App4() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<h1>App</h1>

				<Suspense fallback={<p>Youtube Loading...</p>}>
					<Youtube />

					<Suspense fallback={<p>Flickr Loading...</p>}>
						<Flickr />
					</Suspense>
				</Suspense>
			</div>
		</QueryClientProvider>
	);
}

export default App4;
