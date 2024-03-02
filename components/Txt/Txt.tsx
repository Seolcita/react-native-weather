import { Text, useWindowDimensions } from 'react-native';
import { s } from './Txt.styles';
import { ReactNode } from 'react';

const IPHONE_13_RATIO = 0.001184834123222749;

export interface TxtProps {
  children: ReactNode;
  style?: any;
  [key: string]: any;
}

export function Txt({ children, style, ...restProps }: TxtProps) {
  const fontSize = style?.fontSize || s.txt.fontSize;
  const { height } = useWindowDimensions();

  return (
    <Text
      style={[
        s.txt,
        style,
        {
          fontSize: Math.round(fontSize * IPHONE_13_RATIO * height),
        },
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
}
