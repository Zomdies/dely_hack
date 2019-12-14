import React, { useState, useEffect } from 'react';

// import connect from '@vkontakte/vk-connect';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
// import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';


import Card from '../panels/Card';

// var Barcode = require('react-barcode');
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




const Home = ({ id, go, fetchedUser, id_v, popout ,setPopout}) => {

	const [serverData, setServerData] = useState(null);
	const [senderData,setSenderData] = useState(null);
	//https://moyaposylka.ru/api/v1/trackers/LO530827213CN

	useEffect(() => {
		
		async function fetchData() {
			const server = await sendRequest("GET","http://192.168.43.108:8000/check/id"+id_v); //164078040
				setServerData(server);
		}

		async function fetchData2() {
				const server = await sendRequest("GET","http://192.168.43.108:8000/get/id"+id_v); //164078040
				setServerData(server);
				// setPopout(null);
			
		}
		async function fetchData3() {
			const dataserver = await sendRequest("GET","https://moyaposylka.ru/api/v1/carriers/LO530827213CN"); //164078040
			setSenderData(dataserver);
			// setPopout(null);
		
	}
		fetchData();
		fetchData2();
		fetchData3();
		
		
	}, []);
	let item1 = {name : "hi man"};
	let items = {name_i : item1};
	// {serverData && serverData.count_card &&
	// 	console.log(serverData.count_card+1);
	// }
	//style={{backgroundColor : "#545454"}}
	return (
		
	<FormLayout>

	

	
	<Panel id={id} theme = "white" >
		{fetchedUser && serverData &&
			<div>
				<p>Welcome {fetchedUser.first_name} {fetchedUser.last_name} </p>
				<Group title = "List of Your Cards" > 
				{/* <Card onClick={go} data-to="home" popout = {popout} setPopout = {setPopout} ></Card> */}
					{/* {serverData.cards && Object.values(serverData.cards).map(v => Object.values(v)).map(item => <Card>{item[0]}</Card>)} */}
					{serverData.cards && Object.values(serverData.cards).map(v => Object.values(v)).map(item => <div>{item[0]}</div>)}
					{/* { serverData.cards && console.log(Object.values(serverData.cards).map(v => Object.values(v)))}   */}
					{senderData&& console.log(serverData)}
					{serverData.cards &&  setPopout(null)}
				</Group>
				<Button size="xl" onClick={go} data-to="create_card">Create Cards</Button>
			</div>	
		}	
		<PanelHeader>YourCards</PanelHeader>
		{fetchedUser && serverData &&
		<Group title={serverData && serverData.vk_id}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
		




		<Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>
		
		
	</Panel>
	</FormLayout>

	
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	id_v : PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
