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
import List from '@vkontakte/vkui/dist/components/List/List'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell'

import '../panels/css/Track.css';

const osName = platform();

const List_adress = props => {
    console.log(props.qwe);
    return(
        <Panel id={props.id} theme = "white">
            <PanelHeader
            left={<HeaderButton onClick={props.go} data-to="home">
             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>} alignment="center">Information</PanelHeader> 
        <Group>
            <List>
                <div className="block_items">
                            {Object.values(props.qwe.events).map(v => Object.values(v))
                            .map(item  =>  <Cell className="items">{"["+item[3]+"]     "+item[2]}</Cell>)}
                            {/* {props.setPopout(null)} */}
                        </div>
            </List>
                        
                        
                    
            
                        

                        </Group>
        </Panel>
    )
}

export default List_adress;