import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();

export default function RoveliSplash() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.86)).current;

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;
    SplashScreen.hideAsync();
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 35, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(() => router.replace('/login'), 2300);
    return () => clearTimeout(timer);
  }, [fontError, fontsLoaded, opacity, scale]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <View style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <Animated.View style={[styles.center, { opacity, transform: [{ scale }] }]}>
        <LinearGradient colors={['#ff3c25', '#ff6a32', '#7a4cf5', '#1588ff']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.mark}>
          <Text style={styles.markText}>R</Text>
        </LinearGradient>
        <Text style={styles.logo}>ROVELI</Text>
        <Text style={styles.tagline}>More Than Just Social</Text>
      </Animated.View>
      <View style={styles.bottomBrand}><Text style={styles.bottomText}>ROVI</Text><View style={styles.line} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050910', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  glowTop: { position: 'absolute', width: 320, height: 320, borderRadius: 200, backgroundColor: '#261045', opacity: 0.42, top: -140, right: -130 },
  glowBottom: { position: 'absolute', width: 300, height: 300, borderRadius: 200, backgroundColor: '#062a55', opacity: 0.5, bottom: -150, left: -130 },
  center: { alignItems: 'center' },
  mark: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  markText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 48, lineHeight: 56, fontStyle: 'italic' },
  logo: { color: '#f3f5f8', fontFamily: 'Inter-Bold', fontSize: 24, letterSpacing: 5 },
  tagline: { color: '#74808f', fontFamily: 'Inter-Regular', fontSize: 10, marginTop: 12 },
  bottomBrand: { position: 'absolute', bottom: 28, alignItems: 'center' },
  bottomText: { color: '#d7dce5', fontFamily: 'Inter-Bold', fontSize: 11, letterSpacing: 4 },
  line: { marginTop: 7, width: 48, height: 2, backgroundColor: '#ef3f96' },
});
