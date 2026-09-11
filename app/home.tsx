import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Search, Bell, MessageCircle, Heart, Bookmark, Send, MoveHorizontal as MoreHorizontal, Plus, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Avatar } from '@/components/Avatar';
import { GradientArt } from '@/components/GradientArt';
import { colors, fonts } from '@/components/theme';
import { stories, posts } from '@/components/mockData';

export default function HomeScreen() {
  const ready = useAppFonts();
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [activeStory, setActiveStory] = useState<string | null>(null);

  if (!ready) return null;

  if (activeStory) {
    const story = stories.find((s) => s.name === activeStory)!;
    return <StoryViewer name={story.name} color={story.color} mark={story.mark} onClose={() => setActiveStory(null)} />;
  }

  return (
    <ScreenContainer activeTab="home" noPadding>
      <View style={styles.header}>
        <Text style={styles.brand}>ROVELI</Text>
        <View style={styles.headerActions}>
          <Pressable onPress={() => router.push('/notifications')} hitSlop={12}>
            <Bell color="#b5beca" size={19} />
          </Pressable>
          <Pressable onPress={() => router.push('/chat')} hitSlop={12}>
            <MessageCircle color="#b5beca" size={19} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feed}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stories}>
          {stories.map((story) => (
            <Pressable
              key={story.name}
              onPress={() => story.name !== 'Your story' && setActiveStory(story.name)}
              style={styles.story}
            >
              <View style={[styles.storyRing, { borderColor: story.name === 'Your story' ? colors.storyRingSelf : colors.storyRing }]}>
                {story.mark === '+' ? (
                  <View style={styles.yourStory}><Plus color={colors.accentLight} size={20} /></View>
                ) : (
                  <View style={styles.storyAvatar}><Avatar color={story.color} mark={story.mark} size={44} /></View>
                )}
              </View>
              <Text numberOfLines={1} style={styles.storyName}>{story.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {posts.map((post, index) => {
          const isLiked = liked[index] ?? false;
          const isSaved = saved[index] ?? false;
          return (
            <View key={index} style={styles.post}>
              <View style={styles.postHead}>
                <Avatar color={post.avatarColor} mark={post.avatarMark} size={31} />
                <View style={styles.postIdentity}>
                  <Text style={styles.username}>{post.user}<Text style={styles.verified}> .</Text></Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
                <MoreHorizontal color="#8993a0" size={19} />
              </View>

              <GradientArt variant={post.art} height={290} />

              <View style={styles.postControls}>
                <View style={styles.controlLeft}>
                  <Pressable onPress={() => setLiked({ ...liked, [index]: !isLiked })} hitSlop={8}>
                    <Heart color={isLiked ? colors.heartRed : '#e8edf2'} fill={isLiked ? colors.heartRed : 'transparent'} size={21} />
                  </Pressable>
                  <Pressable hitSlop={8}><MessageCircle color="#e8edf2" size={20} /></Pressable>
                  <Pressable hitSlop={8}><Send color="#e8edf2" size={19} /></Pressable>
                </View>
                <Pressable onPress={() => setSaved({ ...saved, [index]: !isSaved })} hitSlop={8}>
                  <Bookmark color={isSaved ? colors.accentLight : '#e8edf2'} fill={isSaved ? colors.accentLight : 'transparent'} size={20} />
                </Pressable>
              </View>

              <Text style={styles.likes}>{isLiked ? bumpLikes(post.likes) : post.likes} likes</Text>
              <Text style={styles.caption}><Text style={styles.username}>{post.user} </Text>{post.caption}</Text>
              <Text style={styles.comments}>View all {post.comments} comments</Text>
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
}

function bumpLikes(likes: string): string {
  const num = parseFloat(likes);
  if (likes.includes('K')) return `${(num + 0.1).toFixed(1)}K`;
  return `${num + 1}`;
}

function StoryViewer({ name, color, mark, onClose }: { name: string; color: string; mark: string; onClose: () => void }) {
  return (
    <View style={styles.storyViewer}>
      <View style={styles.progressRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.progressTrack}>
            {i === 0 && <View style={styles.progressFill} />}
          </View>
        ))}
      </View>
      <View style={styles.viewerHead}>
        <View style={styles.viewerIdentity}>
          <Avatar color={color} mark={mark} size={30} />
          <Text style={styles.viewerName}>{name}<Text style={styles.viewerTime}> . 2h</Text></Text>
        </View>
        <Pressable onPress={onClose} hitSlop={12}><X color="#fff" size={23} /></Pressable>
      </View>
      <LinearGradient colors={['#1a2941', '#a17a7a', '#0b3552']} style={styles.storyArt}>
        <View style={styles.sun} />
        <View style={styles.horizon} />
        <Text style={styles.storyMessage}>Good vibes only <Text style={{ color: '#ff547d' }}>.</Text></Text>
      </LinearGradient>
      <View style={styles.reply}>
        <Text style={styles.replyText}>Reply to {name}...</Text>
        <Heart color="#e9edf2" size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 58, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  brand: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 19, letterSpacing: 2.5 },
  headerActions: { flexDirection: 'row', gap: 17 },
  feed: { paddingBottom: 70 },
  stories: { paddingHorizontal: 15, paddingVertical: 15, gap: 16 },
  story: { width: 53, alignItems: 'center' },
  storyRing: { width: 52, height: 52, borderRadius: 28, borderWidth: 2, padding: 2, alignItems: 'center', justifyContent: 'center' },
  storyAvatar: { width: '100%', height: '100%', borderRadius: 25, overflow: 'hidden' },
  yourStory: { width: '100%', height: '100%', borderRadius: 25, backgroundColor: '#101923', alignItems: 'center', justifyContent: 'center' },
  storyName: { color: '#9ba5b2', fontFamily: fonts.regular, fontSize: 9, marginTop: 6, maxWidth: 53 },
  post: { borderTopWidth: 1, borderTopColor: '#121d29', paddingBottom: 21 },
  postHead: { height: 54, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  postIdentity: { flex: 1, marginLeft: 10 },
  username: { color: '#ecf0f4', fontFamily: fonts.bold, fontSize: 11 },
  verified: { color: colors.blue, fontSize: 10 },
  postTime: { color: '#6f7a88', fontFamily: fonts.regular, fontSize: 9, marginTop: 2 },
  postControls: { paddingHorizontal: 16, paddingTop: 13, flexDirection: 'row', justifyContent: 'space-between' },
  controlLeft: { flexDirection: 'row', gap: 17 },
  likes: { color: '#e9edf2', fontFamily: fonts.bold, fontSize: 11, paddingHorizontal: 16, marginTop: 9 },
  caption: { color: '#afb8c4', fontFamily: fonts.regular, fontSize: 11, lineHeight: 18, paddingHorizontal: 16, marginTop: 5 },
  comments: { color: '#687585', fontFamily: fonts.regular, fontSize: 10, paddingHorizontal: 16, marginTop: 6 },
  storyViewer: { flex: 1, backgroundColor: '#070c14' },
  progressRow: { flexDirection: 'row', gap: 4, paddingHorizontal: 8, paddingTop: 8 },
  progressTrack: { flex: 1, height: 3, backgroundColor: '#344152', borderRadius: 3 },
  progressFill: { height: 3, width: '42%', backgroundColor: '#f2f5f8', borderRadius: 3 },
  viewerHead: { height: 55, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewerIdentity: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  viewerName: { color: '#f1f4f7', fontFamily: fonts.bold, fontSize: 12 },
  viewerTime: { color: '#9aa5b2', fontFamily: fonts.regular },
  storyArt: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  sun: { width: 105, height: 105, borderRadius: 60, backgroundColor: '#ff9461', position: 'absolute', top: '28%', opacity: 0.9 },
  horizon: { position: 'absolute', height: '16%', width: '130%', bottom: '28%', backgroundColor: '#112234', transform: [{ rotate: '-5deg' }] },
  storyMessage: { color: '#fff', fontFamily: fonts.bold, fontSize: 15, position: 'absolute', bottom: 33 },
  reply: { height: 62, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  replyText: { flex: 1, height: 39, borderWidth: 1, borderColor: '#354252', borderRadius: 20, color: '#7d8996', fontFamily: fonts.regular, fontSize: 11, paddingHorizontal: 15, paddingTop: 11, marginRight: 15 },
});
