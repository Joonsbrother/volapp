import { Image } from 'react-native';
import { loadAsync, useFonts } from 'expo-font';
import { Asset } from 'expo-asset';

export const cacheFonts = (fonts: any[]) => {
  let loaded = 0;
  return fonts.map((font) => { useFonts(font) && loaded++ && console.log(loaded, font) });
};

export const cacheImages = (images: string[]) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
