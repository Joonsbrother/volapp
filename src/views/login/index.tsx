import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header } from '../../components/header';
import LoginScreen from './LoginScreen';
import LoginScreen2 from './LoginScreen2';

type LoginComponentProps = {
  signInOrUp: string  // signin / signup
};

const Login: React.FunctionComponent<LoginComponentProps> = (prop) => {
  if(prop.signInOrUp === "signup" ) {
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <LoginScreen />
          </ScrollView>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <LoginScreen2 />
          </ScrollView>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
});

export default Login;
