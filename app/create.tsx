import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image as ImageIcon, Music, FlipHorizontal2, Grid3x3, Zap } from 'lucide-react-native';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, fonts } from '@/components/theme';

export default function CreateScreen() {
  const ready = useAppFonts();
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);
  const [mode, setMode] = useState<'post' | 'reel' | 'story'>('post');

  if (!ready) return null;

  return (
    <ScreenContainer activeTab="create" noBottomNav noPadding>
      <View style={styles.cameraView}>
        <View style={styles.cameraGlowTop} />
        <View style={styles.cameraGlowBottom} />
        <View style={styles.cameraSilhouette} />

        <View style={styles.cameraTopBar}>
          <Pressable onPress={() => setFlashOn(!flashOn)} hitSlop={12}>
            <Zap color={flashOn ? colors.accent : '#b5beca'} size={20} fill={flashOn ? colors.accent : 'transparent'} />
          </Pressable>
          <Text style={styles.cameraTopLabel}>Create</Text>
          <Pressable onPress={() => setGridOn(!gridOn)} hitSlop={12}>
            <Grid3x3 color={gridOn ? colors.accent : '#b5beca'} size={20} />
          </Pressable>
        </View>

        {gridOn && (
          <View style={styles.gridOverlay}>
            <View style={styles.gridLineV1} /><View style={styles.gridLineV2} />
            <View style={styles.gridLineH1} /><View style={styles.gridLineH2} />
          </View>
        )}

        <View style={styles.cameraBottomControls}>
          <View style={styles.modeSelector}>
            {(['story', 'post', 'reel'] as const).map((m) => (
              <Pressable key={m} onPress={() => setMode(m)}>
                <Text style={[styles.modeText, mode === m && styles.modeTextActive]}>
                  {m === 'reel' ? 'REEL' : m === 'post' ? 'POST' : 'STORY'}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.shutterRow}>
            <Pressable style={styles.sideBtn}>
              <ImageIcon color="#e8edf2" size={24} />
            </Pressable>

            <Pressable style={styles.shutterOuter}>
              <View style={styles.shutterInner} />
            </Pressable>

            <Pressable style={styles.sideBtn}>
              <FlipHorizontal2 color="#e8edf2" size={22} />
            </Pressable>
          </View>

          <View style={styles.bottomRow}>
            <Pressable style={styles.bottomAction}>
              <Music color="#b5beca" size={17} />
              <Text style={styles.bottomActionText}>Add Audio</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cameraView: { flex: 1, backgroundColor: '#0a1018', position: 'relative', overflow: 'hidden' },
  cameraGlowTop: { position: 'absolute', width: 200, height: 200, borderRadius: 120, backgroundColor: '#1a1438', opacity: 0.5, top: -60, right: -50 },
  cameraGlowBottom: { position: 'absolute', width: 250, height: 250, borderRadius: 140, backgroundColor: '#102a4d', opacity: 0.4, bottom: -80, left: -70 },
  cameraSilhouette: { position: 'absolute', width: 100, height: 200, bottom: 130, left: '38%', backgroundColor: '#0b1220', borderTopLeftRadius: 50, borderTopRightRadius: 50, opacity: 0.5 },
  cameraTopBar: { height: 58, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cameraTopLabel: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 15 },
  gridOverlay: { position: 'absolute', top: 58, bottom: 220, left: 0, right: 0 },
  gridLineV1: { position: 'absolute', width: 1, height: '100%', left: '33.3%', backgroundColor: 'rgba(255,255,255,0.12)' },
  gridLineV2: { position: 'absolute', width: 1, height: '100%', left: '66.6%', backgroundColor: 'rgba(255,255,255,0.12)' },
  gridLineH1: { position: 'absolute', height: 1, width: '100%', top: '33.3%', backgroundColor: 'rgba(255,255,255,0.12)' },
  gridLineH2: { position: 'absolute', height: 1, width: '100%', top: '66.6%', backgroundColor: 'rgba(255,255,255,0.12)' },
  cameraBottomControls: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 40, paddingTop: 20 },
  modeSelector: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 24 },
  modeText: { color: '#6f7988', fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1.5 },
  modeTextActive: { color: colors.accent },
  shutterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 50 },
  sideBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colors.borderLight, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(8,15,24,0.6)' },
  shutterOuter: { width: 70, height: 70, borderRadius: 38, borderWidth: 3, borderColor: '#e8edf2', padding: 4, alignItems: 'center', justifyContent: 'center' },
  shutterInner: { width: '100%', height: '100%', borderRadius: 35, backgroundColor: '#e8edf2' },
  bottomRow: { alignItems: 'center', marginTop: 24 },
  bottomAction: { flexDirection: 'row', alignItems: 'center', gap: 7, height: 34, paddingHorizontal: 16, borderRadius: 17, borderWidth: 1, borderColor: colors.borderLight, backgroundColor: 'rgba(8,15,24,0.6)' },
  bottomActionText: { color: colors.textSecondary, fontFamily: fonts.regular, fontSize: 11 },
});
