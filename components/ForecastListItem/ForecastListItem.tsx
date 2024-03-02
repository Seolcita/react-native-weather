import { Image, View } from 'react-native';
import { Txt } from '../Txt/Txt';
import { s } from './ForecastListItem.styles';

interface ForecastListItemProps {
  image: any;
  day: string;
  date: string;
  temperature: number;
}

export function ForecastListItem({
  image,
  day,
  date,
  temperature,
}: ForecastListItemProps) {
  return (
    <View style={s.container}>
      <Image style={s.image} source={image} />
      <Txt style={s.day}>{day}</Txt>
      <Txt style={s.date}>{date}</Txt>
      <Txt style={s.temperature}>{temperature}°</Txt>
    </View>
  );
}
