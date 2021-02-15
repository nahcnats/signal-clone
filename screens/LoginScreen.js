import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView , Platform, Alert } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.navigation.replace('Home');
      }
    });

    return unsubcribe;
  }, []);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        Alert.alert(
          'Attention!',
          err.message,
          [{ text: 'OK' }]
        )
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <Image
        source={{
          uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Input placeholder="Email"
          autoFocus type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry type="password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button
        containerStyle={styles.button}
        title="Login"
        onPress={signIn}
      />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={() => props.navigation.navigate('Register')}
      />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white"
  },  
  image: {
    width: 200,
    height: 200
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
}); 