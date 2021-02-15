import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { auth, db } from '../firebase';

// Import components 
import CustomListItem from '../components/CustomListItem';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { Avatar } from 'react-native-elements';

const HomeScreen = props => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
      setChats(
        snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data()
        }
        ))
      )
    });

    return unsubscribe;
  }, []);

  const enterChat = (id, chatName) => {
    props.navigation.navigate('Chat', {
      id: id,
      chatName: chatName
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {
          chats.map(({ id, data: { chatName } }) => (
            <CustomListItem
              key={id}
              id={id}
              chatName={chatName}
              enterChat={enterChat}
            />
          ))
        }
      </ScrollView>  
    </SafeAreaView>
  );
}

export const homeScreenOptions = navData => {
  const signOut = () => {
    auth.signOut()
      .then(() => {
        navData.navigation.replace('Login');
      });
  }

  return {
    headerTitle: 'Signal',
    headerLeft: () => (
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={signOut}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL
            }}
          />
        </TouchableOpacity>
      </View>
    ),
    headerRight: () => (
      <HeaderButtons
        HeaderButtonComponent={CustomHeaderButton}
      >
        <Item
          title='Picture'
          iconName='camerao'
          onPress={() => {}}
        />
        <Item
          title='Add'
          iconName='edit'
          onPress={() => navData.navigation.navigate('AddChat')}
        />
      </HeaderButtons>
    )
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "white"
  },  
  headerLeft: {
    marginLeft: 15
  }
}); 
