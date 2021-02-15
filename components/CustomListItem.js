import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

// props id, chatName, enterChat
const CustomListItem = props => {
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
            // chatMessage?.[0]?.photoURL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.listTitle}>
          {props.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Test
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
