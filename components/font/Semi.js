import { Text } from 'react-native';

export default function Semi ({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: 'Inter_600SemiBold', color: '#051B2F', }, style]} {...props}>
      {children}
    </Text>
  );
}