import React, { useState, useEffect } from "react";
import connect from "@vkontakte/vk-connect";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import Alert from "@vkontakte/vkui/dist/components/Alert/Alert";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Persik from "./panels/Persik";
import CreateCard from "./panels/create_card";
import Track from "./panels/Track";
import List_adress from "./panels/List_adress";
// const requestURL = 'http://192.168.43.108:8000/check/id164078040';

function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => {
      reject(xhr.response);
    };
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
  // var historyObj = window.history;
  const id_v = new URLSearchParams(window.location.href).get("vk_user_id");
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [qwe, setQwe] = useState(null);
  // const [serverData, setServerData] = useState(null);
  const [popout, setPopout] = useState(null); //<ScreenSpinner size='large' />
  const go_c = e => {
    connect.send("VKWebAppSetLocation", { location: "home" });
    setActivePanel("home");
  };
  // const [popout, setPopout] = useState(<Alert
  // 	actions={[{
  // 	  title: 'Отмена',
  // 	  autoclose: true,
  // 	  style: 'cancel'
  // 	}, {
  // 	  title: 'Добавить',
  // 	  autoclose: true,
  // 	  action: () => this.addActionLogItem('Право на модерацию контента добавлено.'),
  // 	}]}
  // 	onClose={go_c}
  //   >
  // 	<h2>Подтвердите действие</h2>
  // 	<p>Добавить пользователю право на модерацию контента.</p>
  //   </Alert>);

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
    connect.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await connect.sendPromise("VKWebAppGetUserInfo");
      setUser(user);
    }
    async function fetchData1() {
      const server = await sendRequest(
        "GET",
        "https://vk-hack.herokuapp.com/check/id" + id_v
      ); //164078040
      setServerData(server);
    }

    async function fetchData2() {
      const server = await sendRequest(
        "GET",
        "https://vk-hack.herokuapp.com/get/id" + id_v
      ); //164078040
      setServerData(server);
      // setPopout(null);
    }
    fetchData();
    fetchData1();
    fetchData2();
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
    connect.send("VKWebAppSetLocation", {
      location: e.currentTarget.dataset.to
    });
  };
  const go_t = e => {
    setActivePanel("track");
    connect.send("VKWebAppSetLocation", { location: "track" });
  };
  // const go_c = e => {
  // 	e === 1 ? setActivePanel("home") : setActivePanel(e.currentTarget.dataset.to);
  // };

  return (
    // {fetchedUser && serverData && }
    <View activePanel={activePanel} popout={popout} theme="white">
      <Home
        changeState={setQwe}
        id="home"
        fetchedUser={fetchedUser}
        id_v={id_v}
        go={go}
        go_t={go_t}
        popout={popout}
        setPopout={setPopout}
      />
      <CreateCard
        id="create_card"
        fetchedUser={fetchedUser}
        go={go_c}
        id_v={id_v}
        popout={popout}
        setPopout={setPopout}
      />
      <Persik id="persik" go={go} />
      <Track
        qwe={qwe}
        changeState={setQwe}
        id="track"
        go={go}
        id_v={id_v}
        go_c={go_c}
        popout={popout}
        setPopout={setPopout}
      />
      <List_adress
        id="list_adress"
        go={go}
        qwe={qwe}
        popout={popout}
        setPopout={setPopout}
      >
        {" "}
      </List_adress>
    </View>
  );
};

export default App;
