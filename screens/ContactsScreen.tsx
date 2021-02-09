import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import ContactListItem from "../components/ContactListItem";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";

export default function ContactsScreen() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(usersData.data.listUsers.items);
      } catch(e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/*<ChatListItem chatRoom={chatRooms[0]}/>*/}
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
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
