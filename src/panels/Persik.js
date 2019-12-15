import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import File from "@vkontakte/vkui/dist/components/File/File";
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Camera from '@vkontakte/icons/dist/24/camera_outline';



import v1 from '../img/persik.png';


import '../panels/css/Persik.css';






// var Barcode = require('react-barcode');
// {/* <Barcode  value="9070001207126628"   background="#ebedf0" />
const osName = platform();



const Persik = props => (

	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}>Киса)
		</PanelHeader>


		<img className="Persik" src={v1} alt="Persik The Cat"/>
	</Panel>
);

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
