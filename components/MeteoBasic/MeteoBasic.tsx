import { s } from './MeteoBasic.styles';
import { Txt } from '../Txt/Txt';
import { Image, TouchableOpacity, View } from 'react-native';
import { getWeatherInterpretation } from '../../utils/meteo-utils';
import { Clock } from '../Clock/Clock';
import { useNavigation } from '@react-navigation/native';

interface MeteoBasicProps {
  weather: any;
  city?: string;
}

export function MeteoBasic({ weather, city }: MeteoBasicProps) {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  const dailyWeather: any = weather.daily;
  const nav = useNavigation();

  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View>
        <Txt>{city}</Txt>
      </View>

      <View style={s.interpretation}>
        <Txt style={s.interpretation_txt}>{currentInterpretation?.label}</Txt>
      </View>

      <View style={s.temperature_box}>
        <TouchableOpacity
          onPress={() => nav.navigate('Forecasts', { city, ...dailyWeather })}
        >
          <Txt style={s.temperature}>
            {currentWeather.temperature.toFixed(0)}°
          </Txt>
        </TouchableOpacity>
        <Image style={s.image} source={currentInterpretation?.image} />
      </View>
    </>
  );
}
