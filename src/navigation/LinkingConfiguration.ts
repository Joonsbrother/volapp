/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          home: {
            screens: {
              MemberHome: 'Member Home',
              ManagerHome: 'Manager Home',
            },
          },
          group: {
            screens: {
              MemberGroup: 'Member Group',
              ManagerGroup: 'Manager Group',
            },
          },
          event: {
            screens: {
              MemberEvent: 'Member Event',
              ManagerEvent: 'Manager Event',
            },
          },
          log: {
            screens: {
              MemberLog: 'Member Log',
              ManagerLog: 'Manager Log',
            },
          },
        },
      },
      MyInfo: 'My Info',
      NotFound: '*',
    },
  },
};

export default linking;
