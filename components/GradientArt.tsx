import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { artGradients, type ArtVariant } from './mockData';
import { colors, fonts } from './theme';

type GradientArtProps = {
  variant: ArtVariant;
  label?: string;
  height?: number;
};

export function GradientArt({ variant, label, height = 290 }: GradientArtProps) {
  return (
    <LinearGradient colors={artGradients[variant] as [string, string, string]} style={[styles.art, { height }]}>
      <View style={styles.glow} />
      <View style={styles.glowAccent} />
      <View style={styles.horizon} />
      <View style={styles.silhouette} />
      {label && <Text style={styles.label}>{label}</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  art: { width: '100%', backgroundColor: '#19243a', overflow: 'hidden' },
  glow: { position: 'absolute', width: 170, height: 170, borderRadius: 100, backgroundColor: '#ffb26a', top: 40, right: 20, opacity: 0.55 },
  glowAccent: { position: 'absolute', width: 120, height: 120, borderRadius: 70, backgroundColor: '#f35c95', top: 60, left: 30, opacity: 0.3 },
  horizon: { position: 'absolute', height: 90, left: -30, right: -30, bottom: 0, backgroundColor: '#111a2b', transform: [{ skewY: '-8deg' }] },
  silhouette: { position: 'absolute', width: 65, height: 160, bottom: 0, left: '42%', backgroundColor: '#0b1220', borderTopLeftRadius: 30, borderTopRightRadius: 30, opacity: 0.8 },
  label: { position: 'absolute', bottom: 14, left: 16, color: '#fff', fontFamily: fonts.bold, fontSize: 9, letterSpacing: 1.2 },
});
