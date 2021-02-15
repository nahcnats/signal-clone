import React, {useState} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../firebase';

const AddChatScreen = props => {
  const [input, setInput] = useState('');

  const createChat = async () => {
    await db.collection('chats').add({
      chatName: input
    })
      .then(() => {
        props.navigation.goBack();
      })
      .catch(err => {
        Alert.alert(
          'Attention!',
          err.message,
          [{ text: 'OK' }]
        )
      });
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={text => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='#000' />
        }
      />
      <Button title='Create new Chat' onPress={createChat} />
    </View>
  );
}

export const addChatScreenOptions = navData => {
  return {
    headerTitle: 'Add a new Chat',
    headerBackTitle: 'Chats'
  }
}

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    height: '100%',
    backgroundColor: "white"
  },  
});