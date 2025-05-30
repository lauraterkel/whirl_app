import { Text } from 'react-native';


export default function Med ({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: 'Inter_500Medium', color: '#051B2F', }, style]} {...props}>
      {children}
    </Text>
  );
}