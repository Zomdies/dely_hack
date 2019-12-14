import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert'


import v1 from '../img/persik.png';
import '../panels/css/Card.css';
import { render } from 'react-dom';

const Card = props => {
    function open_code(){
        console.log("Open Card")
        openDefault();
    }
    
    function openDefault () {
        props.setState({ popout:
            <Alert
            actions={[{
              title: 'Отмена',
              autoclose: true,
              style: 'cancel'
            }, {
              title: 'Добавить',
              autoclose: true,
              action: () => this.addActionLogItem('Право на модерацию контента добавлено.'),
            }]}
            onClose={props.go}
          >
            <h2>Подтвердите действие</h2>
            <p>Добавить пользователю право на модерацию контента.</p>
          </Alert>
        });
        
      }
    return (
        <div>
            <img className="FrontCard" onClick={open_code} src={v1} alt="FrontCard" />
        </div>
    )
}
export default Card;