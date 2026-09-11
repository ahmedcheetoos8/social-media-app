import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { User, Lock, Key, Bell, Moon, Globe, Info, Shield, ChevronRight, LogOut, Circle as CircleHelp } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Avatar } from '@/components/Avatar';
import { colors, fonts } from '@/components/theme';

const iconMap: Record<string, typeof User> = {
  user: User, lock: Lock, key: Key, bell: Bell, moon: Moon,
  globe: Globe, info: Info, shield: Shield, help: CircleHelp,
};

export default function SettingsScreen() {
  const ready = useAppFonts();
  const [darkMode, setDarkMode] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  if (!ready) return null;

  return (
    <ScreenContainer noBottomNav noPadding>
      <ScreenHeader title="Settings" showBack />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.profileCard}>
          <Avatar color={colors.accent} mark="U" size={56} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Your Name</Text>
            <Text style={styles.profileEmail}>your.email@roveli.app</Text>
          </View>
          <Pressable style={styles.editProfileBtn}><Text style={styles.editProfileText}>Edit</Text></Pressable>
        </View>

        <SettingsGroup title="Account" items={[
          { icon: 'user', label: 'Edit Profile' },
          { icon: 'lock', label: 'Privacy' },
          { icon: 'key', label: 'Security' },
        ]} />

        <SettingsGroup title="Preferences" items={[
          { icon: 'bell', label: 'Push Notifications', toggle: pushNotifs, onToggle: () => setPushNotifs(!pushNotifs) },
          { icon: 'moon', label: 'Dark Mode', toggle: darkMode, onToggle: () => setDarkMode(!darkMode) },
          { icon: 'globe', label: 'Language', value: 'English' },
        ]} />

        <SettingsGroup title="Support" items={[
          { icon: 'info', label: 'About ROVELI' },
          { icon: 'help', label: 'Help Center' },
          { icon: 'shield', label: 'Privacy Policy' },
        ]} />

        <Pressable style={({ pressed }) => [styles.logoutBtn, pressed && styles.logoutPressed]} onPress={() => router.replace('/login')}>
          <LogOut color={colors.heartRed} size={18} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

        <Text style={styles.versionText}>ROVELI v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

type ItemDef = { icon: string; label: string; value?: string; toggle?: boolean; onToggle?: () => void };

function SettingsGroup({ title, items }: { title: string; items: ItemDef[] }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.groupCard}>
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] || User;
          return (
            <View key={item.label}>
              <Pressable style={({ pressed }) => [styles.groupItem, pressed && styles.groupItemPressed]}>
                <Icon color={colors.textSecondary} size={18} />
                <Text style={styles.groupItemLabel}>{item.label}</Text>
                {item.toggle !== undefined ? (
                  <Switch
                    value={item.toggle}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#293241', true: colors.accent }}
                    thumbColor="#fff"
                    style={styles.switch}
                  />
                ) : item.value ? (
                  <Text style={styles.groupItemValue}>{item.value}</Text>
                ) : (
                  <ChevronRight color="#4a5260" size={18} />
                )}
              </Pressable>
              {i < items.length - 1 && <View style={styles.groupDivider} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 40 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.borderLight, borderRadius: 14, padding: 14, marginBottom: 24 },
  profileInfo: { flex: 1 },
  profileName: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 14 },
  profileEmail: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 11, marginTop: 3 },
  editProfileBtn: { height: 30, paddingHorizontal: 14, borderRadius: 15, borderWidth: 1, borderColor: colors.borderInput, alignItems: 'center', justifyContent: 'center' },
  editProfileText: { color: colors.textSecondary, fontFamily: fonts.bold, fontSize: 11 },
  group: { marginBottom: 24 },
  groupTitle: { color: colors.textDim, fontFamily: fonts.bold, fontSize: 11, letterSpacing: 0.6, marginBottom: 10 },
  groupCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.borderLight, borderRadius: 14, overflow: 'hidden' },
  groupItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14, gap: 12 },
  groupItemPressed: { opacity: 0.7 },
  groupItemLabel: { flex: 1, color: colors.textPrimary, fontFamily: fonts.regular, fontSize: 13 },
  groupItemValue: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 12 },
  groupDivider: { height: 1, backgroundColor: colors.borderLight, marginLeft: 44 },
  switch: { transform: [{ scale: 0.82 }] },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, height: 48, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,56,83,0.3)', backgroundColor: 'rgba(255,56,83,0.06)' },
  logoutPressed: { opacity: 0.8 },
  logoutText: { color: colors.heartRed, fontFamily: fonts.bold, fontSize: 14 },
  versionText: { color: '#4a5260', fontFamily: fonts.regular, fontSize: 10, textAlign: 'center', marginTop: 20 },
});
