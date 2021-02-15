import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = props => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: fullname,
          photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        })
      })
      .catch(err => {
        Alert.alert(
          'Attention!',
          err.message,
          [{text: 'OK'}]
        )
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          autoFocus
          value={fullname}
          onChangeText={text => setFullname(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
}

export const registerScreenOptions = navData => {
  return {
    // headerBackTitle: "Back to Login"
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white"
  },  
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
});