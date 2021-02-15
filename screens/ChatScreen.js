import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { db, auth } from '../firebase';

// Import componenent
import CustomHeaderButton from '../components/CustomHeaderButton';

const ChatScreen = props => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsubcribe = db.collection('chats')
      .doc(props.route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ));

    return unsubcribe;
  }, []);

  useEffect(() => {

  }, []);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats').doc(props.route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    });

    setInput('');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15}}>
              {
                messages.map(({ id, data }) => (
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.receiver}>
                      <Avatar
                        position='absolute'
                        bottom={-15}
                        right={-5}
                        // WEB
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                        rounded
                        size={30}
                        source={{
                          uri: data.photoURL
                        }}
                      />
                      <Text style={styles.receiverText}>{data.message}</Text>
                    </View>
                  ) : (
                      <View key={id} style={styles.sender}>
                        <Avatar
                          position='absolute'
                          bottom={-15}
                          left={-5}
                          // WEB
                          containerStyle={{
                            position: 'absolute',
                            bottom: -15,
                            left: -5,
                          }}
                          rounded
                          size={30}
                          source={{
                            uri: data.photoURL
                          }}
                        />
                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                      </View>
                    )
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder='Signal Message'
                style={styles.textInput}
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name='send' size={24} color='#2B68E6' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export const chatScreenOptions = navData => {
  const { chatName } = navData.route.params;
  return {
    title: 'Chat',
    headerBackTitleVisible: false,
    headerTitleAlign: "left",
    headerTitle: () => (
      <View style={styles.header}>
        <Avatar
          rounded
          source={{
            uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
          }}
        />
        <Text style={styles.headerText}>{ chatName }</Text>
      </View>
    ),
    headerLeft: () => (
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}
      >
        <Item
          title='Back'
          iconName='arrowleft'
          onPress={() => navData.navigation.goBack()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}
      >
        <Item
          title='Video'
          iconName='videocamera'
          onPress={() => navData.navigation.goBack()}
        />
        <Item
          title='Call'
          iconName='phone'
          onPress={() => navData.navigation.goBack()}
        />
      </HeaderButtons>
    )
  }
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '700'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  sender: {
    padding: 15,
    backgroundColor: '#2C6BED',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white'
  },
  receiverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15
  },
});
