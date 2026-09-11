import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Settings, Grid3x3, Bookmark, Heart, MoveHorizontal as MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Avatar } from '@/components/Avatar';
import { GradientArt } from '@/components/GradientArt';
import { colors, fonts } from '@/components/theme';
import { profileStats, profileGrid } from '@/components/mockData';

type Tab = 'posts' | 'saved' | 'liked';

export default function ProfileScreen() {
  const ready = useAppFonts();
  const [tab, setTab] = useState<Tab>('posts');

  if (!ready) return null;

  return (
    <ScreenContainer activeTab="profile" noBottomNav noPadding>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <ChevronLeft color={colors.textSecondary} size={22} />
        </Pressable>
        <Text style={styles.headerTitle}>roveli_user</Text>
        <Pressable onPress={() => router.push('/settings')}>
          <Settings color={colors.textSecondary} size={20} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Avatar color={colors.accent} mark="U" size={82} />
          </View>
          <Text style={styles.displayName}>Your Name</Text>
          <Text style={styles.bio}>Living for the moments that take your breath away.</Text>
          <Text style={styles.link}>roveli.app/yourname</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileStats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileStats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileStats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share Profile</Text>
          </Pressable>
        </View>

        <View style={styles.tabBar}>
          {([{ key: 'posts', icon: Grid3x3 }, { key: 'saved', icon: Bookmark }, { key: 'liked', icon: Heart }] as const).map(({ key, icon: Icon }) => (
            <Pressable key={key} onPress={() => setTab(key)} style={[styles.tabBtn, tab === key && styles.tabBtnActive]}>
              <Icon color={tab === key ? colors.accent : '#7d8997'} size={18} fill={tab === key && key === 'liked' ? colors.accent : 'transparent'} />
            </Pressable>
          ))}
        </View>

        <View style={styles.grid}>
          {profileGrid.map((art, i) => (
            <View key={i} style={styles.gridCell}>
              <GradientArt variant={art} height={110} />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { height: 54, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 15 },
  scroll: { paddingBottom: 30 },
  profileSection: { alignItems: 'center', paddingTop: 26, paddingHorizontal: 20 },
  avatarWrap: { marginBottom: 14 },
  displayName: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 18, marginBottom: 6 },
  bio: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', lineHeight: 19, marginBottom: 4 },
  link: { color: colors.blue, fontFamily: fonts.regular, fontSize: 11 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 22, paddingHorizontal: 20 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 16 },
  statLabel: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 11, marginTop: 3 },
  statDivider: { width: 1, height: 30, backgroundColor: colors.borderLight },
  actionRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 20 },
  editBtn: { flex: 1, height: 36, borderRadius: 8, borderWidth: 1, borderColor: colors.borderInput, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgCard },
  editBtnText: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 12 },
  shareBtn: { flex: 1, height: 36, borderRadius: 8, borderWidth: 1, borderColor: colors.borderInput, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgCard },
  shareBtnText: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 12 },
  tabBar: { flexDirection: 'row', marginTop: 22, borderBottomWidth: 1, borderBottomColor: colors.border },
  tabBtn: { flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' },
  tabBtnActive: { borderBottomWidth: 2, borderBottomColor: colors.accent },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, paddingHorizontal: 2, paddingTop: 2 },
  gridCell: { width: '32.5%', borderRadius: 4, overflow: 'hidden' },
});
