import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

// props id, chatName, enterChat
const CustomListItem = props => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubcribe = db.collection('chats')
      .doc(props.id).collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setChatMessages(snapshot.docs.map(doc => doc.data()))
    });

    return unsubcribe;
  });

  return (
    <ListItem
      key={props.id}
      bottomDivider
      onPress={() => props.enterChat(props.id, props.chatName)}
    >
      <Avatar
        rounded
        source={{
          uri: 
            chatMessages?.[0]?.photoURL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.listTitle}>
          {props.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
export default CustomListItem;

const styles = StyleSheet.create({
  listTitle: {
    fontWeight: "800"
  }
});
