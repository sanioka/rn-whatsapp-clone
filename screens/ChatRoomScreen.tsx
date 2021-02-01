import React from 'react';
import { FlatList, Text, ImageBackground, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import chatRoomData from '../data/Chats';
import ChatMessage from "../components/ChatMessage";

import BG from '../assets/images/BG.png';

import InputBox from '../components/InputBox';

const ChatRoomScreen = () => {

  const route = useRoute();

  // console.log(route.params);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({item}) => <ChatMessage message={item} /> }
        inverted={true}
      />
      <InputBox />
    </ImageBackground>


  )
}

export default ChatRoomScreen;