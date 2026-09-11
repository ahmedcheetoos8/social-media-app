import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Search, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppFonts } from '@/hooks/useAppFonts';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Avatar } from '@/components/Avatar';
import { colors, fonts } from '@/components/theme';
import { chats } from '@/components/mockData';

export default function ChatScreen() {
  const ready = useAppFonts();
  const [activeChat, setActiveChat] = useState<string | null>(null);

  if (!ready) return null;

  if (activeChat) {
    const chat = chats.find((c) => c.name === activeChat)!;
    return <ChatThread name={chat.name} color={chat.color} mark={chat.mark} onBack={() => setActiveChat(null)} />;
  }

  return (
    <ScreenContainer noBottomNav noPadding>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <ArrowLeft color={colors.textSecondary} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchInputWrap}>
          <Search color="#7e8998" size={15} />
          <Text style={styles.searchPlaceholder}>Search messages...</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.chatList}>
        {chats.map((chat) => (
          <Pressable
            key={chat.name}
            style={({ pressed }) => [styles.chatItem, pressed && styles.chatItemPressed]}
            onPress={() => setActiveChat(chat.name)}
          >
            <Avatar color={chat.color} mark={chat.mark} size={48} />
            <View style={styles.chatInfo}>
              <View style={styles.chatTopRow}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              <View style={styles.chatBottomRow}>
                <Text style={styles.chatMessage} numberOfLines={1}>{chat.lastMessage}</Text>
                {chat.unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{chat.unread}</Text></View>}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

function ChatThread({ name, color, mark, onBack }: { name: string; color: string; mark: string; onBack: () => void }) {
  const mockMessages: { text: string; mine: boolean }[] = [
    { text: 'Hey! How are you doing?', mine: false },
    { text: "I'm great! Just saw your latest post", mine: true },
    { text: 'That sunset pic was amazing!', mine: false },
    { text: 'Thank you! The light was perfect that evening', mine: true },
    { text: 'We should plan a shoot together soon', mine: false },
  ];

  return (
    <ScreenContainer noBottomNav noPadding>
      <View style={styles.threadHeader}>
        <Pressable onPress={onBack} hitSlop={12}>
          <ArrowLeft color={colors.textSecondary} size={20} />
        </Pressable>
        <Avatar color={color} mark={mark} size={32} />
        <Text style={styles.threadName}>{name}</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.threadMessages}>
        {mockMessages.map((msg, i) => (
          <View key={i} style={[styles.messageRow, msg.mine && styles.messageRowMine]}>
            <View style={[styles.messageBubble, msg.mine ? styles.messageMine : styles.messageTheirs]}>
              <Text style={[styles.messageText, msg.mine ? styles.messageTextMine : styles.messageTextTheirs]}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <View style={styles.inputWrap}>
          <Text style={styles.inputPlaceholder}>Message {name}...</Text>
        </View>
        <Pressable style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { height: 58, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 16 },
  searchWrap: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 8 },
  searchInputWrap: { height: 38, borderWidth: 1, borderColor: colors.borderInput, borderRadius: 19, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: colors.bgCard },
  searchPlaceholder: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 12 },
  chatList: { paddingHorizontal: 18, paddingTop: 6 },
  chatItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  chatItemPressed: { opacity: 0.7 },
  chatInfo: { flex: 1 },
  chatTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 13 },
  chatTime: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 10 },
  chatBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatMessage: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 11, flex: 1 },
  unreadBadge: { width: 18, height: 18, borderRadius: 10, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  unreadText: { color: '#fff', fontFamily: fonts.bold, fontSize: 9 },
  threadHeader: { height: 58, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  threadName: { color: colors.textPrimary, fontFamily: fonts.bold, fontSize: 14, flex: 1 },
  threadMessages: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20, gap: 10 },
  messageRow: { alignItems: 'flex-start' },
  messageRowMine: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16 },
  messageMine: { backgroundColor: colors.accent, borderBottomRightRadius: 4 },
  messageTheirs: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.borderInput, borderBottomLeftRadius: 4 },
  messageText: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18 },
  messageTextMine: { color: '#fff' },
  messageTextTheirs: { color: colors.textPrimary },
  inputRow: { height: 60, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.bgSecondary },
  inputWrap: { flex: 1, height: 40, borderWidth: 1, borderColor: colors.borderInput, borderRadius: 20, paddingHorizontal: 15, justifyContent: 'center', backgroundColor: colors.bgCard },
  inputPlaceholder: { color: colors.textDim, fontFamily: fonts.regular, fontSize: 12 },
  sendBtn: { height: 40, paddingHorizontal: 20, borderRadius: 20, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontFamily: fonts.bold, fontSize: 12 },
});
