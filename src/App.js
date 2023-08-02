import { useState } from 'react';
import { flushSync } from 'react-dom';

function App() {
	console.log('Render...');

	const [Count, setCount] = useState(0);
	const [Count2, setCount2] = useState(0);
	const [Count3, setCount3] = useState(0);

	const returnPromise = () => {
		return new Promise((res) => setTimeout(res, 500));
	};

	// Automatic Batching 한번에 렌더링 (정상 작동)
	const handleClick = () => {
		returnPromise().then(() => {
			flushSync(() => setCount(Count + 1));

			setCount2(Count2 + 2);
			setCount3(Count3 + 3);
		});
	};

	return (
		<div className='App'>
			<button onClick={handleClick}>Button</button>
			<h1>
				{Count} - {Count2} - {Count3}
			</h1>
		</div>
	);
}

export default App;

/*
  [ Automatic Batching ]
  - 핸들러 함수 안쪽에서 복수개의 state값이 변경될 때 해당 변경사항을 묶어서(batching) 한번만 렌더링
  - 기존 17버전에서는 promise를 반환하는 함수 안쪽에서는 Automatic Batching 동작이 불가능
  -> 18버전에서 문제 해결 (자동으로 기능 동작)

  - 리액트 18버전에서 동일 핸들러 함수 안쪽에 있더라도 flushSync를 이용해 특정 state 변경 함수만 Automatic Batching에서 제외 처리가 가능하다.
*/
