import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './colors';

export default function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}
