import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Avatar } from '@/components/Avatar';
import { GradientArt } from '@/components/GradientArt';
import { colors, fonts } from '@/components/theme';
import { notifications, type NotificationItem } from '@/components/mockData';

const typeIcon: Record<NotificationItem['type'], { icon: typeof Heart; color: string }> = {
  like: { icon: Heart, color: colors.heartRed },
  comment: { icon: MessageCircle, color: colors.blue },
  follow: { icon: UserPlus, color: colors.accent },
  mention: { icon: AtSign, color: colors.purple },
};

export default function NotificationsScreen() {
  const ready = useAppFonts();

  if (!ready) return null;

  return (
    <ScreenContainer noBottomNav noPadding>
      <ScreenHeader title="Notifications" showBack />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.sectionLabel}>Today</Text>
        {notifications.slice(0, 3).map((notif, i) => (
          <NotifRow key={i} notif={notif} />
        ))}
        <Text style={styles.sectionLabel}>Earlier</Text>
        {notifications.slice(3).map((notif, i) => (
          <NotifRow key={i + 3} notif={notif} />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

function NotifRow({ notif }: { notif: NotificationItem }) {
  const { icon: Icon, color: iconColor } = typeIcon[notif.type];
  return (
    <Pressable style={({ pressed }) => [styles.notifRow, pressed && styles.notifPressed]}>
      <View style={styles.avatarWrap}>
        <Avatar color={notif.color} mark={notif.mark} size={44} />
        <View style={styles.typeBadge}>
          <Icon color="#fff" size={10} fill={notif.type === 'like' ? '#fff' : 'transparent'} />
        </View>
      </View>
      <View style={styles.notifInfo}>
        <Text style={styles.notifText}>
          <Text style={styles.notifName}>{notif.name}</Text>
          <Text style={styles.notifAction}> {notif.text}</Text>
        </Text>
        <Text style={styles.notifTime}>{notif.time} ago</Text>
      </View>
      <View style={styles.notifThumb}>
        <GradientArt variant={notif.art} height={40} />
      </View>
      {notif.type === 'follow' && (
        <Pressable style={styles.followBtn}>
          <Text style={styles.followText}>Follow</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 18, paddingTop: 14 },
  sectionLabel: { color: colors.textDim, fontFamily: fonts.bold, fontSize: 11, letterSpacing: 0.8, marginTop: 14, marginBottom: 10 },
  notifRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  notifPressed: { opacity: 0.7 },
  avatarWrap: { position: 'relative' },
  typeBadge: { position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.bg },
  notifInfo: { flex: 1 },
  notifText: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18 },
  notifName: { color: colors.textPrimary, fontFamily: fonts.bold },
  notifAction: { color: colors.textMuted },
  notifTime: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 10, marginTop: 3 },
  notifThumb: { width: 40, height: 40, borderRadius: 6, overflow: 'hidden' },
  followBtn: { height: 28, paddingHorizontal: 14, borderRadius: 14, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  followText: { color: '#fff', fontFamily: fonts.bold, fontSize: 10 },
});
