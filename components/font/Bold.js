import { Text } from 'react-native';

export default function Bold ({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: 'Inter_700Bold', color: '#051B2F', }, style]} {...props}>
      {children}
    </Text>
  );
}