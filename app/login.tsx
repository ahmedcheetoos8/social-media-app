import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail, Phone } from 'lucide-react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

type Mode = 'login' | 'signup';

export default function LoginScreen() {
  const [fontsLoaded, fontError] = useFonts({ 'Inter-Regular': Inter_400Regular, 'Inter-Bold': Inter_700Bold });
  const [mode, setMode] = useState<Mode>('login');

  useEffect(() => { if (fontsLoaded || fontError) SplashScreen.hideAsync(); }, [fontError, fontsLoaded]);
  if (!fontsLoaded && !fontError) return null;

  const submit = () => router.replace('/home');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.orbOne} /><View style={styles.orbTwo} />
      <View style={styles.topbar}><Pressable onPress={() => router.replace('/')} hitSlop={12}><ArrowLeft color="#aab1bd" size={20} /></Pressable><Text style={styles.topLabel}>{mode === 'login' ? 'Login' : 'Sign Up'}</Text><View style={{ width: 20 }} /></View>
      <View style={styles.content}>
        <View style={styles.brandRow}><LinearGradient colors={['#ff3d24', '#ff6d35', '#7d4df5']} style={styles.smallMark}><Text style={styles.smallMarkText}>R</Text></LinearGradient><Text style={styles.brand}>ROVELI</Text></View>
        <Text style={styles.heading}>{mode === 'login' ? 'Welcome to ROVELI' : 'Join ROVELI'}</Text>
        <Text style={styles.subheading}>Connect with people, share moments, be yourself.</Text>
        <View style={styles.socialStack}>
          <Pressable onPress={submit} style={({ pressed }) => [styles.social, pressed && styles.pressed]}><Text style={styles.google}>G</Text><Text style={styles.socialText}>Continue with Google</Text></Pressable>
          <Pressable onPress={submit} style={({ pressed }) => [styles.social, pressed && styles.pressed]}><Phone color="#eef2f7" size={16} /><Text style={styles.socialText}>Continue with Phone</Text></Pressable>
          <Pressable onPress={submit} style={({ pressed }) => [styles.social, pressed && styles.pressed]}><Mail color="#eef2f7" size={16} /><Text style={styles.socialText}>Continue with Email</Text></Pressable>
        </View>
        <Text style={styles.terms}>By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy.</Text></Text>
      </View>
      <View style={styles.switchRow}><Text style={styles.switchText}>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</Text><Pressable onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}><Text style={styles.link}> {mode === 'login' ? 'Sign up' : 'Log in'}</Text></Pressable></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050910', paddingHorizontal: 20, overflow: 'hidden' },
  orbOne: { position: 'absolute', width: 260, height: 260, borderRadius: 180, backgroundColor: '#171444', opacity: 0.55, top: -100, right: -80 },
  orbTwo: { position: 'absolute', width: 220, height: 220, borderRadius: 180, backgroundColor: '#132b56', opacity: 0.26, bottom: -80, left: -100 },
  topbar: { height: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topLabel: { color: '#e8ebf0', fontFamily: 'Inter-Bold', fontSize: 15 },
  content: { flex: 1, alignItems: 'center', paddingTop: 17 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  smallMark: { height: 29, width: 29, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  smallMarkText: { color: '#fff', fontFamily: 'Inter-Bold', fontSize: 22, fontStyle: 'italic' },
  brand: { color: '#f4f5f7', fontFamily: 'Inter-Bold', fontSize: 19, letterSpacing: 3.5 },
  heading: { color: '#f4f5f7', fontFamily: 'Inter-Bold', fontSize: 24, marginBottom: 10 },
  subheading: { color: '#8a94a2', fontFamily: 'Inter-Regular', fontSize: 12, textAlign: 'center', lineHeight: 19, maxWidth: 270 },
  link: { color: '#ff624c', fontFamily: 'Inter-Bold', fontSize: 11 },
  socialStack: { width: '100%', gap: 10, marginTop: 30 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  social: { width: '100%', height: 46, borderWidth: 1, borderColor: '#2c3746', borderRadius: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, backgroundColor: '#080f18' },
  google: { color: '#4285f4', fontFamily: 'Inter-Bold', fontSize: 17 },
  socialText: { color: '#d8dde4', fontFamily: 'Inter-Regular', fontSize: 12 },
  terms: { color: '#697482', fontFamily: 'Inter-Regular', fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: 22, maxWidth: 280 },
  switchRow: { height: 65, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  switchText: { color: '#75808f', fontFamily: 'Inter-Regular', fontSize: 11 },
});
