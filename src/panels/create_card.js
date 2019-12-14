import React  from 'react';

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
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

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
    function addCard_to_BD(){

    }

    return(
        <Panel id={props.id} theme = "white">
            <PanelHeader
            left={<HeaderButton onClick={props.go} data-to="home">
             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>} alignment="center">
            Create Cards</PanelHeader>
		    {props.fetchedUser &&
			    <div>
                    <FormLayout>
                        <p>Create Your Card</p>
                        <Input id ="input_name" type="text" placeholder="Ввидите Название карыт"/>
                        <Input id = "input_idcard" type="number" placeholder="Ввидите id карты"/>
                        
                        <Button size="xl" onClick={props.go} data-to="persik">Create</Button>
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