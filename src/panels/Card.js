import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert'


import '../panels/css/Card.css';

const Card = props => {
    function open_code(){
        // console.log(props.data)
        
    }
    
    
    return (
            <Button className = "FrontCard" data-to="track" size="xl" level="secondary"  onClick={(e) => {props.changeState(props.data); props.go(e)}}>{props.data[0]}</Button>
            
        
    )
}
export default Card;