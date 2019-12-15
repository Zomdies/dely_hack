import React,{ useState, useEffect }  from 'react';

import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import { platform, IOS } from '@vkontakte/vkui';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import '../panels/css/create_card.css';

const osName = platform();

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

const CardCreator = props => {
    
    const [serverData, setServerData] = useState(null);
    const [senderData,setSenderData] = useState(null);
	useEffect(() => {
		
		async function fetchData() {
			const server = await sendRequest("GET","https://vk-hack.herokuapp.com/check/id"+props.id_v); //164078040
				setServerData(server);
		}

		async function fetchData2() {
				const server = await sendRequest("GET","https://vk-hack.herokuapp.com/get/id"+props.id_v); //164078040
				setServerData(server);
			
        }
        
		fetchData();
        fetchData2();
       
		
		
    }, []);
    
    function addCard_to_BD(e){
        var  carriers = "";
        props.setPopout(<ScreenSpinner size='large' />);
        fetch("https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/carriers/"+document.getElementById("input_track_id").value)
        .then(response => response.json())
        .then(result =>{
            console.log(result[0].code)
            
                sendRequest('GET',"https://vk-hack.herokuapp.com/set?id=id"+props.id_v+"&name="+document.getElementById("input_name").value
                    +"&track_code="+result[0].code+"&track_id="+document.getElementById("input_track_id").value).then(data => {
                        if (data != null) {props.go(1); props.setPopout(null);}
                    }).catch(err => console.log(err));
    
        }).catch(err => {console.log(err); props.go(1)})
        
                
        
                 //+(serverData.count_cards && (serverData.count_cards+1))
                // props.go(data-to="persik");
        
        
    }
    // data-to="persik"
    return(
        <Panel id={props.id} theme = "white">
            <PanelHeader
            left={<HeaderButton onClick={props.go} data-to="home">
             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>} alignment="center">
            Add Track Number</PanelHeader>
		    {props.fetchedUser &&
			    <div>
                    <FormLayout>
                        <p className="info">Add you track number</p>
                        <Input id ="input_name" type="text" placeholder="Ввидите Название карты"/>
                        {/* <Input id = "input_track_code" type="number" placeholder="Ввидите id карты"/> */}
                        <Input id = "input_track_id" type="text" placeholder="Ввидите id карты"/>
                        
                        <Button size="xl" onClick={addCard_to_BD} data-to="home">Create</Button>
                    </FormLayout>
				    
			    </div>	
		    }	
		

		
		
		
	</Panel>
    )
}

CardCreator.propTypes = {
    id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	
};

export default CardCreator;