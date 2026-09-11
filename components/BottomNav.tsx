import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Hop as Home, Search, Plus, Video, User as UserIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors, fonts, type NavKey } from './theme';

const navConfig: { key: NavKey; label: string; icon: typeof Home; route: string }[] = [
  { key: 'home', label: 'Home', icon: Home, route: '/home' },
  { key: 'explore', label: 'Explore', icon: Search, route: '/explore' },
  { key: 'create', label: 'Create', icon: Plus, route: '/create' },
  { key: 'reels', label: 'Reels', icon: Video, route: '/reels' },
  { key: 'profile', label: 'Profile', icon: UserIcon, route: '/profile' },
];

type BottomNavProps = {
  active: NavKey;
};

export function BottomNav({ active }: BottomNavProps) {
  return (
    <View style={styles.bottomNav}>
      {navConfig.map(({ key, label, icon: Icon, route }) => {
        const isActive = active === key;
        return (
          <Pressable
            key={key}
            onPress={() => router.replace(route as any)}
            style={styles.navItem}
          >
            {key === 'create' ? (
              <View style={styles.createButton}>
                <Icon color="#07101a" size={19} strokeWidth={2.5} />
              </View>
            ) : (
              <Icon
                color={isActive ? colors.accent : '#7d8997'}
                size={19}
                fill={isActive && key === 'home' ? colors.accent : 'transparent'}
              />
            )}
            <Text style={[styles.navLabel, isActive && styles.activeLabel]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 66,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.navBg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 9,
  },
  navItem: { width: 55, alignItems: 'center', gap: 4 },
  navLabel: { color: '#697687', fontFamily: fonts.regular, fontSize: 8 },
  activeLabel: { color: colors.accent, fontFamily: fonts.bold },
  createButton: { width: 30, height: 25, borderRadius: 8, backgroundColor: '#e8eef3', alignItems: 'center', justifyContent: 'center' },
});
