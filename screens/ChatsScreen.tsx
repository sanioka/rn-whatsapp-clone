import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from "../components/ChatListItem";

import chatRooms from '../data/ChatRooms';
import NewMessageButton from "../components/NewMessageButton";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      {/*<ChatListItem chatRoom={chatRooms[0]}/>*/}
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
  }
});
