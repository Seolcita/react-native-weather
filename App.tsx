import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { s } from './App.styles';
import { Alert, ImageBackground } from 'react-native';
import { Home } from './pages/Home';
import backgroundImg from './assets/background.png';
import { useEffect, useState } from 'react';
import { MeteoAPI } from './api/meteo';
import { useFonts } from 'expo-font';
import { Forecasts } from './pages/Forecasts/Forecasts';

export interface Coordinates {
  lat: number;
  lng: number;
}

const Stack = createNativeStackNavigator();

const navTheme = {
  colors: {
    background: 'transparent',
    primary: '',
    card: '',
    text: '',
    border: '',
    notification: '',
  },
  dark: true,
};

export default function App() {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [weather, setWeather] = useState<any>();
  const [city, setCity] = useState();

  const [isFontLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  });

  useEffect(() => {
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates);
      fetchCityByCoords(coordinates);
    }
  }, [coordinates]);

  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setCoordinates({ lat: 48.85, lng: 2.35 });
    }
  }

  async function fetchWeatherByCoords(coords: Coordinates) {
    const weatherResponse = await MeteoAPI.fetchWeatherByCoords(coords);
    setWeather(weatherResponse);
  }

  async function fetchCityByCoords(coords: Coordinates) {
    const cityResponse = await MeteoAPI.fetchCityByCoords(coords);
    setCity(cityResponse);
  }

  async function fetchCoordsByCity(city: string) {
    try {
      const coordsResponse = await MeteoAPI.fetchCoordsByCity(city);
      setCoordinates(coordsResponse);
    } catch (err: any) {
      Alert.alert('Aouch !', err);
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        imageStyle={s.img}
        style={s.img_background}
        source={backgroundImg}
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && weather && (
              <Stack.Navigator
                screenOptions={{ headerShown: false, animation: 'fade' }}
                initialRouteName='Home'
              >
                <Stack.Screen name='Home'>
                  {() => (
                    <Home
                      city={city}
                      weather={weather}
                      onSubmitSearch={fetchCoordsByCity}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name='Forecasts' component={Forecasts} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
