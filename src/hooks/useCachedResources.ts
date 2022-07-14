import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { cacheImages, cacheFonts } from '../helpers/AssetsCaching';
import vectorFonts from '../helpers/vector-fonts';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
          'georgia': require('../../assets/fonts/Georgia.ttf'),
          'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
          'light': require('../../assets/fonts/Montserrat-Light.ttf'),
          'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
          'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
          'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
          'UbuntuLightItalic': require('../../assets/fonts/Ubuntu-Light-Italic.ttf'),
          'Material': require('../../assets/fonts/MaterialIcons.ttf'),
          'FontAwesome': require('../../assets/fonts/FontAwesome.ttf'),
          'AntDesign': require('../../assets/fonts/AntDesign.ttf'),
          'Ionicons': require('../../assets/fonts/Ionicons.ttf'),
          'SimpleLineIcons': require('../../assets/fonts/SimpleLineIcons.ttf'),
          'Entypo': require('../../assets/fonts/Entypo.ttf'),
          'MaterialCommunityIcons': require('../../assets/fonts/MaterialCommunityIcons.ttf'),
        });
        
        const imageAssets = cacheImages([
          require('../../assets/images/bg_screen1.jpg'),
          require('../../assets/images/bg_screen2.jpg'),
          require('../../assets/images/bg_screen3.jpg'),
          require('../../assets/images/bg_screen4.jpg'),
          require('../../assets/images/user-cool.png'),
          require('../../assets/images/user-hp.png'),
          require('../../assets/images/user-student.png'),
          require('../../assets/images/avatar1.jpg'),
        ]);
    
        const fontAssets = cacheFonts([
          ...vectorFonts,
          { georgia: require('../../assets/fonts/Georgia.ttf') },
          { regular: require('../../assets/fonts/Montserrat-Regular.ttf') },
          { light: require('../../assets/fonts/Montserrat-Light.ttf') },
          { bold: require('../../assets/fonts/Montserrat-Bold.ttf') },
          { UbuntuLight: require('../../assets/fonts/Ubuntu-Light.ttf') },
          { UbuntuBold: require('../../assets/fonts/Ubuntu-Bold.ttf') },
          { UbuntuLightItalic: require('../../assets/fonts/Ubuntu-Light-Italic.ttf') },
          { MaterialIcons: require('../../assets/fonts/MaterialIcons.ttf') },
          { FontAwesome: require('../../assets/fonts/FontAwesome.ttf') },
          { AntDesign: require('../../assets/fonts/AntDesign.ttf') },
          { Ionicons: require('../../assets/fonts/Ionicons.ttf') },
          { SimpleLineIcons: require('../../assets/fonts/SimpleLineIcons.ttf') },
          { Entypo: require('../../assets/fonts/Entypo.ttf') },
          { MaterialCommunityIcons: require('../../assets/fonts/MaterialCommunityIcons.ttf') },
        ]);

        await Promise.all([...imageAssets, ...fontAssets]);
        
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
