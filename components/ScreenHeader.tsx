import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors, fonts } from './theme';

type ScreenHeaderProps = {
  title: string;
  showBack?: boolean;
  rightActions?: ReactNode;
  onBack?: () => void;
};

export function ScreenHeader({ title, showBack, rightActions, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable onPress={onBack || (() => router.back())} hitSlop={12} style={styles.backBtn}>
          <ArrowLeft color={colors.textSecondary} size={20} />
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightActions}>{rightActions}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 58, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { width: 40, alignItems: 'flex-start' },
  title: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 16, flex: 1, textAlign: 'center' },
  rightActions: { width: 40, flexDirection: 'row', justifyContent: 'flex-end', gap: 14 },
});
