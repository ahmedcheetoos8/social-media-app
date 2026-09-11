import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { GradientArt } from '@/components/GradientArt';
import { Avatar } from '@/components/Avatar';
import { colors, fonts } from '@/components/theme';
import { exploreItems, people } from '@/components/mockData';

const categories = ['For You', 'Trending', 'Art', 'Nature', 'Travel', 'Food', 'Fashion'];

export default function ExploreScreen() {
  const ready = useAppFonts();
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('For You');

  if (!ready) return null;

  return (
    <ScreenContainer activeTab="explore">
      <View style={styles.searchBar}>
        <View style={styles.searchInputWrap}>
          <Search color="#7e8998" size={16} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search ROVELI..."
            placeholderTextColor="#6f7988"
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={12}>
              <X color="#8993a0" size={15} />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cats}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setActiveCat(cat)}
            style={[styles.catPill, activeCat === cat && styles.catPillActive]}
          >
            <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {exploreItems.map((item, i) => (
          <View
            key={item.id}
            style={[
              styles.gridItem,
              item.size === 'large' ? styles.gridItemLarge : styles.gridItemSmall,
              i % 3 === 1 && styles.gridItemMiddle,
            ]}
          >
            <GradientArt variant={item.art} height={item.size === 'large' ? 180 : 116} />
            <View style={styles.gridOverlay}>
              <Text style={styles.gridLabel}>{item.label}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.suggestSection}>
        <Text style={styles.suggestTitle}>Suggested for you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestList}>
          {people.map((person) => (
            <View key={person.name} style={styles.suggestCard}>
              <Avatar color={person.color} mark={person.mark} size={48} />
              <Text style={styles.suggestName} numberOfLines={1}>{person.name}</Text>
              <Pressable style={styles.followBtn}>
                <Text style={styles.followText}>Follow</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchBar: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 10 },
  searchInputWrap: {
    height: 42, borderWidth: 1, borderColor: colors.borderInput, borderRadius: 21,
    paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, gap: 9,
  },
  searchInput: { flex: 1, color: colors.textPrimary, fontFamily: fonts.regular, fontSize: 12 },
  cats: { paddingHorizontal: 18, paddingBottom: 12, gap: 8 },
  catPill: { height: 32, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderInput, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgCard },
  catPillActive: { borderColor: colors.accent, backgroundColor: 'rgba(255,89,66,0.12)' },
  catText: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 11 },
  catTextActive: { color: colors.accent, fontFamily: fonts.bold },
  grid: { paddingHorizontal: 2, flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  gridItem: { borderRadius: 6, overflow: 'hidden', position: 'relative' },
  gridItemLarge: { width: '65%' },
  gridItemSmall: { width: '33%' },
  gridItemMiddle: { marginRight: 0 },
  gridOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, backgroundColor: 'rgba(5,10,17,0.45)' },
  gridLabel: { color: '#fff', fontFamily: fonts.bold, fontSize: 9 },
  suggestSection: { paddingTop: 18, paddingHorizontal: 18, paddingBottom: 10 },
  suggestTitle: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 14, marginBottom: 12 },
  suggestList: { gap: 12 },
  suggestCard: { width: 90, alignItems: 'center', borderWidth: 1, borderColor: colors.borderLight, borderRadius: 12, paddingVertical: 14, backgroundColor: colors.bgCard },
  suggestName: { color: colors.textSecondary, fontFamily: fonts.bold, fontSize: 11, marginTop: 8, marginBottom: 8 },
  followBtn: { height: 26, paddingHorizontal: 14, borderRadius: 13, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  followText: { color: '#fff', fontFamily: fonts.bold, fontSize: 10 },
});
