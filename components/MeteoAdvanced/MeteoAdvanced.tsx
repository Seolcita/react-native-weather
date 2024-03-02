import { View } from 'react-native';
import {
  StyledContainer,
  StyledValue,
  s,
  StyledLabel,
} from './MeteoAdvanced.styles';

export interface MeteoAdvancedProps {
  sunrise: string;
  sunset: string;
  windspeed: string;
}

export function MeteoAdvanced({
  sunrise,
  sunset,
  windspeed,
}: MeteoAdvancedProps) {
  return (
    <View style={s.container}>
      <StyledContainer>
        <StyledLabel>{sunrise}</StyledLabel>
        <StyledValue>Sunrise</StyledValue>
      </StyledContainer>
      <StyledContainer>
        <StyledLabel>{sunset}</StyledLabel>
        <StyledValue>Sunset</StyledValue>
      </StyledContainer>
      <StyledContainer>
        <StyledLabel>{windspeed}km/h</StyledLabel>
        <StyledValue>Windspeed</StyledValue>
      </StyledContainer>
    </View>
  );
}
