import { Text, View } from 'react-native';
import { s } from './Home.styles';
import { Txt } from '../components/Txt/Txt';
import { MeteoBasic } from '../components/MeteoBasic/MeteoBasic';
import { getWeatherInterpretation } from '../utils/meteo-utils';
import { MeteoAdvanced } from '../components/MeteoAdvanced/MeteoAdvanced';
import { SearchBar } from '../components/SearchBar/SearchBar';

interface HomeProps {
  weather: any;
  city?: string;
  onSubmitSearch: (text: string) => void;
}

export function Home({ weather, city, onSubmitSearch }: HomeProps) {
  const currentWeather = weather.current_weather;

  return (
    <>
      <View style={s.meteo_basic}>
        <MeteoBasic weather={weather} city={city} />
      </View>
      <View style={s.searchbar_container}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>
      <View style={s.meteo_advanced}>
        <MeteoAdvanced
          sunrise={weather.daily.sunrise[0].split('T')[1]}
          sunset={weather.daily.sunset[0].split('T')[1]}
          windspeed={currentWeather.windspeed}
        />
      </View>
    </>
  );
}
