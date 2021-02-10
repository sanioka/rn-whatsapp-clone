import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./style";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

import {
  API,
  Auth,
  graphqlOperation
} from "aws-amplify";
import { createMessage } from '../../graphql/mutations';

const InputBox = (props) => {

  const { chatRoomID } = props;

  const [message, setMessage] = useState('');
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserId(userInfo.attributes.sub);
    }
    fetchUser();
  }, []);

  const onMicrophonePress = () => {
    console.warn('onMicrophonePress');
  }

  const onSendPress = async () => {
    // console.warn(`Message ${message}`);

    try {
      await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message,
              userID: myUserId,
              chatRoomID,
            }
          }
        )
      )
    } catch(e) {

    }

    setMessage('');
  }

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name={'laugh-beam'} size={24} color={'gray'} />
        <TextInput
          placeholder={'Type a message'}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name={'attachment'} size={24} color={'gray'} style={styles.icon} />
        {!message && <Fontisto name={'camera'} size={24} color={'gray'} style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons name={'microphone'} size={28} color={'white'}/>
            : <MaterialIcons name={'send'} size={22} color={'white'}/>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default InputBox;