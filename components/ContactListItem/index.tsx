import moment from "moment";
import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom, User } from "../../types";
import { useNavigation } from '@react-navigation/native';
import styles from './style';

import {
  createChatRoom,
  createChatRoomUser,
} from '../../graphql/mutations';
import { API, graphqlOperation, Auth } from "aws-amplify";

export type ContactListItemProps = {
  user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      // #1 Create new Chat Room
      const newChatRoomData = await API.graphql(
        graphqlOperation(
          createChatRoom, {
            input: {
              lastMessageID: "zz"
            }
          }
        )
      );

      if (!newChatRoomData.data) {
        console.log("Error: Failed to create Chat Room")
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;

      console.log('newChatRoom:', newChatRoom);

      // #2 Add user to chat room
      await API.graphql(
        graphqlOperation(
          createChatRoomUser, {
            input: {
              userID: user.id,
              chatRoomID: newChatRoom.id,
            },
          }
        )
      )

      // #3 Add auth user to the chat room
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(
          createChatRoomUser, {
            input: {
              userID: userInfo.attributes.sub,
              chatRoomID: newChatRoom.id,
            },
          }
        )
      )

      navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: 'Hardcoded name',
      })

    } catch(e) {
      console.log('error:', e)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ContactListItem;