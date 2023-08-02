import { useState, useTransition } from 'react';

function App2() {
	const [Count, setCount] = useState(0);
	const [Items, setItems] = useState([]);
	const [isPending, startTransition] = useTransition();

	console.log('광클릭 방지 (로딩중): ', isPending);

	// 덜 중요하고 무거운 연산 때문에 중요한 연산도 함께 덩달아 늦게 화면에 렌더링
	const handleClick = () => {
		// urgent operation : 먼저 처리되어야 할 중요한 연산
		setCount(Count + 1);

		startTransition(() => {
			// 무거운 연산 (not urgent operation : 우선순위가 떨어지는 덜 중요한 연산)
			const array = Array(10000)
				.fill(1)
				.map((_, idx) => Count + idx);

			setItems(array);
		});
	};

	return (
		<div className='App'>
			{/* 버튼을 클릭할 때마다 10000개의 배열 리스트가 출력되기 전까지는 버튼의 숫자값이 늦게 카운트 */}
			<button onClick={handleClick} disabled={isPending}>
				{Count}
			</button>

			<ul>
				{Items.map((num) => {
					return <li key={num}>{num}</li>;
				})}
			</ul>
		</div>
	);
}

export default App2;

/*
	[ useTransition ]
	- 컴포넌트 렌더링시 연산의 우선순위를 두어 후순위로 렌더링해도 되는 것들을 지정
	- 기존에는 한번 렌더링 연산이 시작되면 중단이 불가능
		-> 특정 핸들러 함수에 의해 화면을 재연산해야 하는 경우 중간에 
			무거운 로직이 실행되는 연산이 있으면 다른 연산들도 함께 지연이 되는 단점
		-> useTransition로 문제 해결
*/
