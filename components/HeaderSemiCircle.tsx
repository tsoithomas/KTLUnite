import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export default function HeaderSemiCircle(props: any) {
  return (
    <View {...props}>
    <Svg width="100%" height="23" viewBox="0 1 402 23">
      <Path d="M402 0C402 12.4264 312.009 22.5 201 22.5C89.9908 22.5 0 12.4264 0 0C26 0 89.9908 0 201 0C312.009 0 386 0 402 0Z" fill="#7CC4EB"/>
    </Svg>
    </View>
  );
}
