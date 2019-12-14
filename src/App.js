import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import CreateCard from './panels/create_card';
// const requestURL = 'http://192.168.43.108:8000/check/id164078040';

function sendRequest(method, url){
	return new Promise( (resolve, reject) =>{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url);
		xhr.responseType = 'json';

		xhr.onload = () => {
			if (xhr.status >= 400) {
				reject(xhr.response);
			}else{
				resolve(xhr.response);
			}
		}
		xhr.onerror = () => {
			reject(xhr.response);
		}
		xhr.send();
	});
}
// connect.sendPromise('VKWebAppGetUserInfo').then(data =>{
//     sendRequest('GET', "http://192.168.43.108:8000/check/id"+data.id)
//     .then( data => {
//         // console.log(data);
//     })
//     .catch(err => console.log(err));
//     user_id = data.id;

// sendRequest('GET', "http://192.168.43.108:8000/get/id"+data.id)
//     .then( data => {
        
//         // console.log(data);
//         count_card = data.count_card;
//         id_card = data.id_card;
//     })
//     .catch(err => console.log(err));
    
// });
	// var user_id = 0;
	// var count_card = 0;
	// var id_card = [];

const App = () => {
	// console.log(window.location.href);
	// const urlParams = new URLSearchParams(this.props.location.search)
	// const key = urlParams.get('vk_user_id')
	
	const id_v = new URLSearchParams(window.location.href).get("vk_user_id");	
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [serverData, setServerData] = useState(null);
	// const [serverData, setServerData] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	
	

	// connect.sendPromise('VKWebAppGetUserInfo').then(data =>{
	// 	sendRequest('GET', "http://192.168.43.108:8000/check/id"+data.id)
	// 	.then( data => {
	// 		// console.log(data);
	// 	})
	// 	.catch(err => console.log(err));
	// 	user_id = data.id;
	// });
	// sendRequest('GET', "http://192.168.43.108:8000/get/id"+user_id)
	// 	.then( data => {
			
	// 		console.log(data);
	// 		count_card = data.count_card;
	// 		id_card = data.id_card;
	// 	})
	// 	.catch(err => console.log(err));

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			
		}
		async function fetchData1() {
			const server = await sendRequest("GET","http://192.168.43.108:8000/check/id"+id_v); //164078040
				setServerData(server);
		}

		async function fetchData2() {
				const server = await sendRequest("GET","http://192.168.43.108:8000/get/id"+id_v); //164078040
				setServerData(server);
				// setPopout(null);
			
		}
		fetchData();
		fetchData1();
		fetchData2();
		
		
		
		
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const go_c = e => {
		e === 1 ? setActivePanel("home") : setActivePanel(e.currentTarget.dataset.to);
	};
	
	

	return (
		
		// {fetchedUser && serverData && } 
			<View activePanel={activePanel} popout={popout}>
			
		
				<Home id='home' fetchedUser={fetchedUser}  id_v={id_v}  go={go} setPopout={setPopout}/>
				<Persik id='persik' go={go} />
				<CreateCard id='create_card' fetchedUser={fetchedUser}  go={go_c} id_v={id_v}></CreateCard>
			
			
			
			</View>
		
		
		
		
		
		
	);
}



export default App;

