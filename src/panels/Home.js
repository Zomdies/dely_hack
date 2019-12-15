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


import Card from '../panels/Card';
import '../panels/css/Home.css';
import Track from './Track';

// var Barcode = require('react-barcode');
function sendRequest(method, url){
	return new Promise( (resolve, reject) =>{
		
		const xhr = new XMLHttpRequest();
		// xhr.withCredentials = true;
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




const Home = ({ id, go, fetchedUser, id_v, popout ,setPopout, changeState}) => {

	const [serverData, setServerData] = useState(null);
	
	// const [senderData,setSenderData] = useState(null);
	//https://moyaposylka.ru/api/v1/trackers/LO530827213CN
// 	fetch("https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/carriers/LO530827213CN")
// .then(response => console.log(response))
	
	useEffect(() => {
		setPopout(<ScreenSpinner size='large' />);
		async function fetchData() {
			
			const server = await sendRequest("GET","https://vk-hack.herokuapp.com/check/id"+id_v); //164078040
				setServerData(server);
		}

		async function fetchData2() {

				const server = await sendRequest("GET","https://vk-hack.herokuapp.com/get/id"+id_v); //164078040
				setServerData(server);
				setPopout(null);
				// setPopout(<ScreenSpinner size='large' />);
			
		}
		
		fetchData();
		fetchData2();
		// fetchData3();
		
		
	}, []);
	

	// {serverData && serverData.count_card &&
	// 	console.log(serverData.count_card+1);
	// }
	//style={{backgroundColor : "#545454"}}
	//ClassName="header_track"
	return (
		
	<FormLayout>
	

	
	<Panel id={id} theme = "white" >
		{fetchedUser && serverData &&
			<div>
				<p className="header_welcome" onClick={go} data-to="persik">Здравствуйте, {fetchedUser.first_name} {fetchedUser.last_name} </p>
				<p className="header_welcome">Список посылок</p>
				<div> 

				{/* <div>{item[0] == "0" ? null:item[0]}</div> */}
				{/* <Card onClick={go} data-to="home" data = {item[0]} popout = {popout} setPopout = {setPopout} ></Card> */}
					{/* {serverData.tracks && Object.values(serverData.tracks).map(v => Object.values(v)).map(item => <Card>{item[0]}</Card>)} */}
					{serverData && serverData.tracks && Object.values(serverData.tracks).map(v => Object.values(v))
					.map(item  =>  <Card changeState={changeState} data-to="track" data = {item} popout = {popout} setPopout = {setPopout} go={go} ></Card>)}
					
					{/* { serverData.cards && console.log(Object.values(serverData.cards).map(v => Object.values(v)))}   */}
					{/* {senderData&& console.log(serverData)} */}
					{/* {serverData &&  setPopout(null)} */}
				</div>
				<Button size="xl" onClick={go} data-to="create_card">Добавить посылку</Button>
				{/* <Button data-to="track" onClick={(e) => {changeState("ZALUPA"); go(e)}}>asdfasdfasdf</Button> */}
			</div>	
		}	
		<PanelHeader className="header" >Моя посылка</PanelHeader>
		{/* {fetchedUser && serverData &&
		<Group title={serverData && serverData.vk_id}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>} */}
		




		{/* <Group title="Navigation Example">
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group> */}
		
		
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
