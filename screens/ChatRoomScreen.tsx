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
import { onCreateMessage } from '../graphql/subscriptions';

const ChatRoomScreen = () => {

  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [myUserId, setMyUserId] = useState(null);

  // console.log(route.params);

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(
        messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: 'DESC',
        }
      )
    )

    setMessages(messagesData.data.messagesByChatRoom.items);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const getMyUserId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    getMyUserId();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;

        // check subscription to receive only current chat room message
        if (newMessage.chatRoomID !== route.params.id) {
          return;
        }

        // Its workaround
        fetchMessages();
        // TODO: fix bug
        // setMessages([newMessage, ...messages]);
        // console.log('data', data.value.data);
      }
    })

    return () => subscription.unsubscribe();
  }, [])

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