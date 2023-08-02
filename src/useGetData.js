import { useState, useEffect } from 'react';
import axios from 'axios';

// promise 객체를 인수로 받아서 promise 상태에 따라 반환되는 값을 직접 리턴해주는 함수를 반환
const checkPromiseStatus = (promise) => {
	let status = 'pending';
	let result;

	// promise의 상태에 따라 현재 상태값과 반환값을 각각 status, result 변수에 담아주는 함수
	const setPromise = promise.then(
		(value) => {
			status = 'success';
			result = value;
		},
		(error) => {
			status = 'error';
			result = error;
		}
	);

	// setPromise에 저장되는 status값에 따라 fetching된 결과값을 반환하는 함수를 리턴
	return () => {
		switch (status) {
			case 'pending':
				throw setPromise;
			case 'success':
				return result;
			case 'error':
				throw result;
			default:
				throw new Error('Unknown Status');
		}
	};
};

function useGetData(url) {
	const [Data, setData] = useState(null);

	useEffect(() => {
		const getData = async () => {
			// 데이터 요청 후 현재 데이터 상태를 확인하는 promise 객체를 비동기적으로 받는다.
			const promise = axios.get(url).then((res) => res.data);
			// promise 객체를 checkPromiseStatus 함수의 인수로 전달하여 직접 동기화시키는 커스텀 함수 호출 후 결과값, 반환값을 state에 담아준다.
			setData(checkPromiseStatus(promise));

			// promise 객체에서 fulfilled 상태가 된 후 데이터를 보여주기 위해 await 사용 (데이터 반환 기능 -> suspense 사용 불가능)
			// await를 사용하지 않으면 fulfilled 상태 전의 promise(pending, fulfilled, rejected)를 보내준다.
			// const promise = await axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => res.data);
		};

		getData();
	}, [url]);

	// state에 담아진 promise 반환값을 리턴
	return Data;
}

export default useGetData;
