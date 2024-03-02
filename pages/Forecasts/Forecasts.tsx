import { s } from './Forecasts.styles';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header/Header';
import { ForecastListItem } from '../../components/ForecastListItem/ForecastListItem';
import { View } from 'react-native';
import { DAYS, getWeatherInterpretation } from '../../utils/meteo-utils';

export function Forecasts({}) {
  const { params } = useRoute<any>();
  console.log(params);

  const forecastList = (
    <View style={{ marginTop: 50 }}>
      {params.time.map((time: string, index: number) => {
        const weatherCode: number = params.weathercode[index];
        const weatherInterpretation = getWeatherInterpretation(weatherCode);
        const image = weatherInterpretation
          ? weatherInterpretation.image
          : null;
        const temperature = params.temperature_2m_max[index];
        const date = new Date(time);
        const dayOfTheWeek = DAYS[date.getDay()];
        const formatedDate = date.toLocaleDateString('default', {
          day: 'numeric',
          month: 'numeric',
        });
        return (
          <ForecastListItem
            key={time}
            image={image}
            day={dayOfTheWeek}
            date={formatedDate}
            temperature={temperature.toFixed(0)}
          />
        );
      })}
    </View>
  );

  return (
    <>
      <Header city={params.city} />
      {forecastList}
    </>
  );
}
