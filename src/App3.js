import Posts from './Posts';
import { Suspense } from 'react';

function App3() {
	return (
		<div className='App'>
			<h1>App</h1>

			{/* Suspense로 특정 컴포넌트 그룹을 묶으면 해당 그룹만 동기화 처리 */}
			<Suspense fallback={<p>Post loading...</p>}>
				<h1>Posts</h1>
				<Posts />
			</Suspense>
		</div>
	);
}

export default App3;

/*
	[ React18 - Suspense ]
	- 각 페이지에 구성되어 있는 컴포넌트들을 동시에 호출하는 것이 아닌 영역별로 렌더링 시점을 동기화 처리
	- 이전 버전까지는 클라이언트 컴포넌트에서만 제한적으로 동작되는 기술이었으나 18버전부터 SSR 방식의 컴포넌트에서도 활용이 가능하도록 개선
		- 활용 예
			-> 특정 컴포넌트가 렌더링 완료될때까지 다른 컴포넌트의 렌더링을 막고 이전 렌더링 컴포넌트 완료 후 동기적으로 렌더링 시작
			-> 서버로부터 무거운 데이터를 fetching하는 컴포넌트의 경우 해당 컴포넌트 출력전까지 자동으로 로딩바 출력
	- Suspense를 활용하기 위한 조건
		- Suspense 동기화시키는 컴포넌트 내부에 promise 객체 생성 상태(pending, fulfilled, rejected)를 추적할 수 있어야 한다.
*/

/*
	[ 기존의 CSR, SSR 방식의 차이 ]

	- 예전의 SSR 작업흐름
		1. 정적인 HTML파일을 서버로부터 가져온다.
		2. 이후 동적 데이터가 필요할 때마다 다시 서버쪽에 요청해서 전체 화면을 full load (화면 깜빡임)
		3. 이후 Ajax 비동기 서버통신 기술이 생기면서 전체 화면을 다시 full load하지 않고 필요한 데이터만 실시간으로 다시 호출가능
		4. 비동기 데이터를 이용해 자바스크립트로 일일이 동적 DOM을 생성하고 관리해야 하는 번거로움 발생

	- CSR 작업흐름
		1. 빈 HTML파일을 서버로부터 가져온다.
		2. 자바스크립트 파일 load (React)
		3. 리액트 컴포넌트 load (Data Fetching)
		4. 컴포넌트 해석 후 렌더링 시작
		5. 최종화면에 동적 DOM 생성 (이전 단계까지는 빈화면 렌더링)

	- React 18 버전에서의 SSR 작업흐름
		1. 서버쪽으로부터 미리 static 프리렌더링 된 html파일 load
		2. 미리 렌더링된 정적인 화면을 바로 생성 (정적 화면 생성)
		3. 자바스크립트 파일 load
		4. 동적 데이터를 다루는 리액트 컴포넌트 해석
		5. 기존의 정적인 화면에 동적으로 연동될 부분만 대체 (hydration)
			-> Suspense 기능 활용
*/
