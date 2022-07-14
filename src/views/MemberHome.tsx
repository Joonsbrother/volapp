import React, { useContext } from 'react';
import { Text, Divider, Button, useTheme } from 'react-native-elements';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, SubHeader } from '../components/header';
import { RootStackScreenProps } from '../../types';

const MemberHome = ({navigation}) => {
  const { theme } = useTheme();

  return (
    <>
      <ScrollView>
        <Text style={styles.titleText}>Welcome to<br/>Volunteering Service Support App</Text>
        <SubHeader title="We help you to make a better world!" />
        <View style={styles.horizontal}>
          <Text style={styles.horizontalText}>
            We support you to service for your community!
          </Text>
          <Text style={styles.horizontalText}>
            We support you to service for others!
          </Text>
          <Text style={styles.horizontalText}>
          We support you to service for all the livings!
          </Text>
        </View>
        <SubHeader title="Help you to be shining!" />
        <View style={styles.vertical}>
          <Text>Left text</Text>
          <Divider orientation="vertical" />
          <Text>Right text</Text>
        </View>
        <View style={styles.vertical}>
          <Text>Left text</Text>
          <Divider orientation="vertical" width={5} />
          <Text>Right text</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <Button
            title="LOG IN"
            buttonStyle={{
                backgroundColor: 'navy',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
            }}
            containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
            }}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={() => {navigation.navigate('Login')}}
            />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#aa49eb',
    marginVertical: 20,
  },
  horizontal: {
    marginBottom: 10,
  },
  horizontalText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
});

export default MemberHome;
