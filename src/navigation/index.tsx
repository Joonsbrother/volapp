/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../config/colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../views/ModalScreen';
import NotFoundScreen from '../views/NotFoundScreen';
import Avatars from '../views/avatars';
import Cards from '../views/cards';
import Tiles from '../views/tiles';
import Buttons from '../views/buttons';
import Chips from '../views/chips';
import Lists from '../views/lists';
import Lists2 from '../views/lists2';
import Inputs from '../views/inputs';
import Image from '../views/image';
import LinearProgress from '../views/linearProgress';
import CircularSlider from '../views/circularSlider';
import Login from '../views/login';
import LoginScreen from '../views/login/LoginScreen';
import LoginScreen2 from '../views/login/LoginScreen2';
import Pricing from '../views/pricing';
//import Ratings from '../views/ratings';
import Settings from '../views/settings';
import SpeedDial from '../views/speedDial';
import Sliders from '../views/sliders';
import SocialIcons from '../views/social_icons';
import Fonts from '../views/fonts';
import BottomSheet from '../views/bottomsheet';
import Tooltip from '../views/tooltip';
import Dialogs from '../views/dialogs';
import Overlay from '../views/overlay';
import CheckBox from '../views/checkbox';
import FAB from '../views/fab';
import Text from '../views/text';
import Tabs from '../views/tabs';
import Badge from '../views/badge';
import WhatsappClone from '../views/whatsappClone';
import MemberHome from '../views/MemberHome';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MyInfo" component={WhatsappClone} />
        <Stack.Screen name="About" component={WhatsappClone} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerTintColor: Colors[colorScheme].tint,
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tint,
        tabBarActiveBackgroundColor:  Colors[colorScheme].background,
        tabBarInactiveBackgroundColor: Colors[colorScheme].background,
      }}>
      <BottomTab.Screen
        name="home"
        component={MemberHome}
        options={({ navigation }: RootTabScreenProps<'home'>) => ({
          title: 'Home',
          tabBarItemStyle: styles.barItemStyle,
          tabBarIcon: ({ color }) => <TabBarIcon icon={faHome} color={color} />,
          headerRight: () => <HeaderIcon colorScheme={colorScheme}
                              onPressAbout={() => navigation.navigate('About')} />,
        })}
      />
      <BottomTab.Screen
        name="group"
        component={Inputs}
        options={({ navigation }: RootTabScreenProps<'group'>) => ({
          title: 'Group',
          tabBarItemStyle: styles.barItemStyle,
          tabBarIcon: ({ color }) => <TabBarIcon icon={faPeopleGroup} color={color} />,
          headerRight: () => <HeaderIcon colorScheme={colorScheme}
                              onPressAbout={() => navigation.navigate('About')} />,
        })}
      />
      <BottomTab.Screen
        name="event"
        component={CheckBox}
        options={({ navigation }: RootTabScreenProps<'event'>) => ({
          title: 'Event',
          tabBarItemStyle: styles.barItemStyle,
          tabBarIcon: ({ color }) => <TabBarIcon icon={faCalendar} color={color} />,
          headerRight: () => <HeaderIcon colorScheme={colorScheme}
                              onPressAbout={() => navigation.navigate('About')} />,
        })}
      />
      <BottomTab.Screen
        name="log"
        component={Lists}
        options={({ navigation }: RootTabScreenProps<'log'>) => ({
          title: 'Log',
          tabBarItemStyle: styles.barItemStyle,
          tabBarIcon: ({ color }) => <TabBarIcon icon={faHistory} color={color} />,
          headerRight: () => <HeaderIcon colorScheme={colorScheme}
                              onPressAbout={() => navigation.navigate('About')} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  icon: React.ComponentProps<typeof FontAwesomeIcon>['icon'];
  color: string;
}) {
  return <FontAwesomeIcon size={20} style={{ marginBottom: 0 }} icon={props.icon} {...props} />;
}

function HeaderIcon(props: {
  onPressAbout: Function;
  colorScheme: ColorSchemeName;
}) {
  return (
  <Pressable
    onPress={() => props.onPressAbout()}
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
    })}>
    <FontAwesomeIcon
      icon={faInfoCircle}
      size={25}
      color={Colors[props.colorScheme].text}
      style={{ marginRight: 15 }}
    />
  </Pressable>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  barItemStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 6,
  },
};