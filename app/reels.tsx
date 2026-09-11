import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Heart, MessageCircle, Send, MoveHorizontal as MoreHorizontal, Music, Play, Volume2, VolumeX } from 'lucide-react-native';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Avatar } from '@/components/Avatar';
import { GradientArt } from '@/components/GradientArt';
import { colors, fonts } from '@/components/theme';
import { reels } from '@/components/mockData';

export default function ReelsScreen() {
  const ready = useAppFonts();
  const [muted, setMuted] = useState(true);
  const [currentReel, setCurrentReel] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  if (!ready) return null;

  const reel = reels[currentReel];
  const isLiked = liked[currentReel] ?? false;

  return (
    <ScreenContainer activeTab="reels" noBottomNav noPadding>
      <View style={styles.reelContainer}>
        <GradientArt variant={reel.art} height={9999} />

        <View style={styles.reelTopBar}>
          <Text style={styles.reelsTitle}>Reels</Text>
          <Pressable onPress={() => setMuted(!muted)} hitSlop={12}>
            {muted ? <VolumeX color="#e8edf2" size={20} /> : <Volume2 color="#e8edf2" size={20} />}
          </Pressable>
        </View>

        <View style={styles.playIndicator}>
          <Play color="#fff" size={28} fill="#fff" />
        </View>

        <View style={styles.reelOverlay}>
          <View style={styles.reelInfo}>
            <View style={styles.reelUserRow}>
              <Avatar color={reel.avatarColor} mark={reel.avatarMark} size={34} />
              <Text style={styles.reelUsername}>{reel.user}</Text>
              <Pressable style={styles.followBtn}>
                <Text style={styles.followText}>Follow</Text>
              </Pressable>
            </View>
            <Text style={styles.reelCaption}>{reel.caption}</Text>
            <View style={styles.audioRow}>
              <Music color="#e8edf2" size={12} />
              <Text style={styles.audioText} numberOfLines={1}>{reel.audio}</Text>
            </View>
          </View>

          <View style={styles.reelActions}>
            <Pressable onPress={() => setLiked({ ...liked, [currentReel]: !isLiked })} style={styles.actionBtn}>
              <Heart color={isLiked ? colors.heartRed : '#e8edf2'} fill={isLiked ? colors.heartRed : 'transparent'} size={26} />
              <Text style={styles.actionLabel}>{reel.likes}</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <MessageCircle color="#e8edf2" size={25} />
              <Text style={styles.actionLabel}>{reel.comments}</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Send color="#e8edf2" size={24} />
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <MoreHorizontal color="#e8edf2" size={24} />
            </Pressable>
          </View>
        </View>

        <View style={styles.reelDots}>
          {reels.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentReel && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.reelNav}>
          <Pressable
            style={styles.navBtn}
            onPress={() => setCurrentReel((c) => Math.max(0, c - 1))}
            disabled={currentReel === 0}
          >
            <Text style={[styles.navText, currentReel === 0 && styles.navTextDisabled]}>Prev</Text>
          </Pressable>
          <Pressable
            style={styles.navBtn}
            onPress={() => setCurrentReel((c) => Math.min(reels.length - 1, c + 1))}
            disabled={currentReel === reels.length - 1}
          >
            <Text style={[styles.navText, currentReel === reels.length - 1 && styles.navTextDisabled]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  reelContainer: { flex: 1, position: 'relative' },
  reelTopBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 58, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reelsTitle: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 18, letterSpacing: 1 },
  playIndicator: { position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center', opacity: 0.6 },
  reelOverlay: { position: 'absolute', bottom: 70, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 16 },
  reelInfo: { flex: 1, marginRight: 14 },
  reelUserRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 10 },
  reelUsername: { color: '#fff', fontFamily: fonts.bold, fontSize: 13 },
  followBtn: { height: 26, paddingHorizontal: 12, borderRadius: 13, borderWidth: 1, borderColor: '#e8edf2', alignItems: 'center', justifyContent: 'center' },
  followText: { color: '#fff', fontFamily: fonts.bold, fontSize: 10 },
  reelCaption: { color: '#e8edf2', fontFamily: fonts.regular, fontSize: 12, lineHeight: 19, marginBottom: 8 },
  audioRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  audioText: { color: '#d8dde4', fontFamily: fonts.regular, fontSize: 10, flex: 1 },
  reelActions: { gap: 18, alignItems: 'center' },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionLabel: { color: '#e8edf2', fontFamily: fonts.bold, fontSize: 10 },
  reelDots: { position: 'absolute', right: 6, top: '30%', gap: 5 },
  dot: { width: 4, height: 4, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: '#fff', height: 16, borderRadius: 3 },
  reelNav: { position: 'absolute', bottom: 16, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 30 },
  navBtn: { height: 34, paddingHorizontal: 20, borderRadius: 17, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(8,15,24,0.5)' },
  navText: { color: '#e8edf2', fontFamily: fonts.bold, fontSize: 11 },
  navTextDisabled: { color: '#4a5260' },
});
