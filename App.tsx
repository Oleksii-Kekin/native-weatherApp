import { StyleSheet, View, Alert, ScrollView, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { LoadScreen } from './components/LoadScreen';
import { Weather } from './components/Weather';
import { API_KEY } from './api';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const getWeatherData = useCallback(async (lat, long) => {
    const { name, main, weather } = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`).then(response => response.json());
    setData({ name, main, weather })
    setIsLoading(false)
  }, []);

  const handleGetLocation = useCallback( async () => {
    try {
      setIsLoading(true)
      await Location.requestForegroundPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync()
      getWeatherData(latitude, longitude);
    } catch (error) {
      Alert.alert('Не можу отримати дані с сервера')
    }
  }, []);

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <View style={styles.container}>
      { isLoading
          ? <LoadScreen size={150} />
          : <Weather isLoading={isLoading} onRefresh={handleGetLocation} {...data} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
