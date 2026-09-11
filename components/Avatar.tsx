import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from './theme';

type AvatarProps = {
  color: string;
  mark: string;
  size?: number;
};

export function Avatar({ color, mark, size = 31 }: AvatarProps) {
  const radius = size / 2;
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: radius, backgroundColor: color }]}>
      <Text style={[styles.mark, { fontSize: size * 0.38 }]}>{mark}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  mark: { color: '#fff', fontFamily: fonts.bold },
});
