import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from './theme';
import { BottomNav } from './BottomNav';
import { type NavKey } from './theme';

type ScreenContainerProps = {
  children: ReactNode;
  activeTab?: NavKey;
  noBottomNav?: boolean;
  noPadding?: boolean;
};

export function ScreenContainer({ children, activeTab, noBottomNav, noPadding }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, noPadding && styles.noPadding]}>{children}</View>
      {!noBottomNav && activeTab && <BottomNav active={activeTab} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, paddingBottom: 66 },
  noPadding: { paddingBottom: 0 },
});
