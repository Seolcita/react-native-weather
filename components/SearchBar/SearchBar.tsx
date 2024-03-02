import { TextInput } from 'react-native';
import { s } from './SearchBar.styles';

interface SearchBarProps {
  onSubmit: (text: string) => void;
}

export function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <TextInput
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      style={s.input}
      placeholder='Type a city... Ex: Paris'
    />
  );
}
