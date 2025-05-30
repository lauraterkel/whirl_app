import { Text } from 'react-native';

export default function Reg ({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: 'Inter_400Regular', color: '#051B2F', }, style]} {...props}>
      {children}
    </Text>
  );
}