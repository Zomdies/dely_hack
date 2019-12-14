import React, { useState, useEffect }  from 'react';

import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import { platform, IOS, Group } from '@vkontakte/vkui';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import SelectMimicry from '@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry'


import '../panels/css/Track.css';

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



function load_info(props,setServerData){

    
    var  carriers = "";
    
    fetch("https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/trackers/"+props.qwe[1]+"/"+props.qwe[2])
    .then(response => response.json())
    .then(result =>{
        console.log(result)
        setServerData(result);
        props.setPopout(null);

    }).catch(err => console.log(err))
    
            
    
             //+(serverData.count_cards && (serverData.count_cards+1))
            // props.go(data-to="persik");
    
    
}

    // console.log(props);
    
const Track = props => {
    function delete_form_bd() {
        sendRequest("GET","http://192.168.43.108:8000/delete?id=id"+props.id_v+"&name="+props.qwe[0]+"&track_code="+props.qwe[1]+"&track_id="+props.qwe[1]).then(data => {
            console.log("good");
        });
        // props.go_c();
    }
    const [serverData, setServerData] = useState(null);
    // const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    console.log(props.qwe);
    // props.setPopout(null);
    // props.setPopout(<ScreenSpinner size='large' />);
    useEffect(() => {
        
        
		async function fetchData() {
            load_info(props,setServerData);
            props.setPopout(<ScreenSpinner size='large' />);
			// const server = await sendRequest("GET","http://192.168.43.108:8000/check/id"+id_v); //164078040
				// setServerData(server);
		}

		
		fetchData();

        
    }, []);
    // <Group title="Tracking Information" >
    //                     {serverData && 
                        
    //                         <div className="block_items">
    //                             {serverData && serverData.events && Object.values(serverData.events).map(v => Object.values(v))
    //                             .map(item  =>  <p className="items">{"["+item[3]+"]     "+item[2]}</p>)}
    //                             {/* {props.setPopout(null)} */}
    //                         </div>
                            
    //                     }

    //                     </Group>
    var Barcode = require('react-barcode');
    console.log(props);
    return(
        <Panel id={props.id} theme = "white">
            <PanelHeader
            left={<HeaderButton onClick={props.go} data-to="home">
             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>} alignment="center">
        Information</PanelHeader>
			    <div>  
                <p></p>
                <div className="Information">
                    <p>{"[Track name]  "+props.qwe[0]}</p>
                    <p>{"[Track number]  " +props.qwe[2] }</p>
                </div>
                <div className="barcode">
                    {/* <p >Barcode</p> */}
                    <Barcode  value={props.qwe[2]}   background="white" />
                </div>
                

                    <FormLayout>
                        {serverData &&
                            <SelectMimicry
                            top="Посмотреть весь путь"
                            placeholder={"Статус : ["+serverData.events[0].operationOrigin+"]    "+serverData.events[0].operation}
                            onClick={(e) => {props.changeState(serverData); props.go(e)}} data-to="list_adress"
                            >
                            </SelectMimicry>
                        }
                        
                        
                        {/* <Button size="xl" onClick={addCard_to_BD} data-to="home">Create</Button> */}
                        <Button className="bt_delete" size="xl" onClick={delete_form_bd}>Delete Track</Button>
                    </FormLayout>
				    
                    
			    </div>	
        </Panel>
    )
}

export default Track;