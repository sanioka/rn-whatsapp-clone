import React, { useEffect, useState } from 'react';
import { FlatList, Text, ImageBackground, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

// import chatRoomData from '../data/Chats';
import ChatMessage from "../components/ChatMessage";

import BG from '../assets/images/BG.png';

import InputBox from '../components/InputBox';

import {
  API, Auth,
  graphqlOperation
} from "aws-amplify";
import { messagesByChatRoom } from '../graphql/queries';

const ChatRoomScreen = () => {

  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [myUserId, setMyUserId] = useState(null);

  // console.log(route.params);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(
          messagesByChatRoom, {
            chatRoomID: route.params.id,
            sortDirection: 'DESC',
          }
        )
      )

      // console.log('messagesData');
      // console.log(messagesData);

      setMessages(messagesData.data.messagesByChatRoom.items);
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    const getMyUserId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    getMyUserId();
  }, []);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <FlatList
        data={messages}
        renderItem={({item}) => <ChatMessage myUserId={myUserId} message={item} /> }
        inverted={true}
      />
      <InputBox chatRoomID={route.params.id}/>
    </ImageBackground>


  )
}

export default ChatRoomScreen;