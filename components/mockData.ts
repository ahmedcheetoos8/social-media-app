export type Person = { name: string; color: string; mark: string };

export const people: Person[] = [
  { name: 'Sarah', color: '#e7886f', mark: 'S' },
  { name: 'Omar', color: '#4e78bd', mark: 'O' },
  { name: 'Layla', color: '#a75c90', mark: 'L' },
  { name: 'Adam', color: '#bf8c64', mark: 'A' },
  { name: 'Zara', color: '#5cbaa0', mark: 'Z' },
  { name: 'Karim', color: '#7d6cd4', mark: 'K' },
  { name: 'Nora', color: '#d4785c', mark: 'N' },
  { name: 'Yusuf', color: '#4e9eb8', mark: 'Y' },
];

export const stories: Person[] = [
  { name: 'Your story', color: '#1c2532', mark: '+' },
  ...people.slice(0, 5),
];

export type ArtVariant = 'sunset' | 'city' | 'ocean' | 'forest' | 'neon' | 'desert';

export const artGradients: Record<ArtVariant, string[]> = {
  sunset: ['#202d50', '#e27e65', '#f6ad65'],
  city: ['#111a35', '#523b72', '#f0576b'],
  ocean: ['#0a1e3c', '#1a4f7a', '#3a9bc8'],
  forest: ['#0a1f15', '#2d6a4f', '#74c69d'],
  neon: ['#1a0a2e', '#6a0dad', '#e94560'],
  desert: ['#2a1a0a', '#c97b3f', '#e8c170'],
};

export type Post = {
  user: string;
  time: string;
  avatarColor: string;
  avatarMark: string;
  art: ArtVariant;
  caption: string;
  likes: string;
  comments: string;
};

export const posts: Post[] = [
  { user: 'sarah.official', time: '2h', avatarColor: '#e7886f', avatarMark: 'S', art: 'sunset', caption: 'Sunset hits different.\nAnother chapter, same dream.', likes: '12.4K', comments: '342' },
  { user: 'omar.r7', time: '5h', avatarColor: '#4e78bd', avatarMark: 'O', art: 'city', caption: 'Just another day in the city.', likes: '8.9K', comments: '127' },
  { user: 'layla.m', time: '8h', avatarColor: '#a75c90', avatarMark: 'L', art: 'ocean', caption: 'Salt in the air, peace in the soul.', likes: '5.2K', comments: '89' },
  { user: 'adam.k', time: '1d', avatarColor: '#bf8c64', avatarMark: 'A', art: 'forest', caption: 'Lost in the right direction.', likes: '3.1K', comments: '56' },
];

export type ExploreItem = {
  id: number;
  art: ArtVariant;
  label: string;
  size: 'large' | 'small';
};

export const exploreItems: ExploreItem[] = [
  { id: 1, art: 'sunset', label: 'Sunsets', size: 'large' },
  { id: 2, art: 'city', label: 'Urban', size: 'small' },
  { id: 3, art: 'ocean', label: 'Ocean', size: 'small' },
  { id: 4, art: 'neon', label: 'Neon', size: 'small' },
  { id: 5, art: 'forest', label: 'Nature', size: 'small' },
  { id: 6, art: 'desert', label: 'Desert', size: 'large' },
  { id: 7, art: 'city', label: 'Street', size: 'small' },
  { id: 8, art: 'sunset', label: 'Golden', size: 'small' },
  { id: 9, art: 'ocean', label: 'Waves', size: 'small' },
  { id: 10, art: 'neon', label: 'Night', size: 'large' },
];

export type Reel = {
  user: string;
  avatarColor: string;
  avatarMark: string;
  art: ArtVariant;
  caption: string;
  likes: string;
  comments: string;
  audio: string;
};

export const reels: Reel[] = [
  { user: 'sarah.official', avatarColor: '#e7886f', avatarMark: 'S', art: 'sunset', caption: 'POV: golden hour hits', likes: '24.1K', comments: '892', audio: 'Original Audio - sarah.official' },
  { user: 'omar.r7', avatarColor: '#4e78bd', avatarMark: 'O', art: 'city', caption: 'City nights hit different', likes: '18.3K', comments: '451', audio: 'Midnight City - M83' },
  { user: 'layla.m', avatarColor: '#a75c90', avatarMark: 'L', art: 'ocean', caption: 'Ocean therapy', likes: '9.7K', comments: '203', audio: 'Waves - ocean sounds' },
];

export type Chat = {
  name: string;
  color: string;
  mark: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export const chats: Chat[] = [
  { name: 'Sarah', color: '#e7886f', mark: 'S', lastMessage: 'That sunset pic was amazing!', time: '2m', unread: 2 },
  { name: 'Omar', color: '#4e78bd', mark: 'O', lastMessage: 'Are we still on for tonight?', time: '15m', unread: 0 },
  { name: 'Layla', color: '#a75c90', mark: 'L', lastMessage: 'You have to see this place', time: '1h', unread: 1 },
  { name: 'Adam', color: '#bf8c64', mark: 'A', lastMessage: 'Haha that was wild', time: '3h', unread: 0 },
  { name: 'Zara', color: '#5cbaa0', mark: 'Z', lastMessage: 'Sent you the details', time: '5h', unread: 0 },
  { name: 'Karim', color: '#7d6cd4', mark: 'K', lastMessage: 'Good morning!', time: '1d', unread: 0 },
];

export type NotificationItem = {
  type: 'like' | 'comment' | 'follow' | 'mention';
  name: string;
  color: string;
  mark: string;
  text: string;
  time: string;
  art: ArtVariant;
};

export const notifications: NotificationItem[] = [
  { type: 'like', name: 'Sarah', color: '#e7886f', mark: 'S', text: 'liked your post', time: '5m', art: 'sunset' },
  { type: 'follow', name: 'Omar', color: '#4e78bd', mark: 'O', text: 'started following you', time: '20m', art: 'city' },
  { type: 'comment', name: 'Layla', color: '#a75c90', mark: 'L', text: 'commented: Beautiful!', time: '1h', art: 'ocean' },
  { type: 'like', name: 'Adam', color: '#bf8c64', mark: 'A', text: 'liked your reel', time: '2h', art: 'forest' },
  { type: 'mention', name: 'Zara', color: '#5cbaa0', mark: 'Z', text: 'mentioned you in a comment', time: '4h', art: 'neon' },
  { type: 'follow', name: 'Karim', color: '#7d6cd4', mark: 'K', text: 'started following you', time: '1d', art: 'desert' },
  { type: 'like', name: 'Nora', color: '#d4785c', mark: 'N', text: 'liked your post', time: '2d', art: 'sunset' },
];

export type SettingsGroup = {
  title: string;
  items: { icon: string; label: string; value?: string; action?: string }[];
};

export const settingsGroups: SettingsGroup[] = [
  {
    title: 'Account',
    items: [
      { icon: 'user', label: 'Edit Profile', action: 'profile' },
      { icon: 'lock', label: 'Privacy', action: 'privacy' },
      { icon: 'key', label: 'Security', action: 'security' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'bell', label: 'Notifications', action: 'notifications' },
      { icon: 'moon', label: 'Dark Mode', value: 'On' },
      { icon: 'globe', label: 'Language', value: 'English' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'info', label: 'About ROVELI', action: 'about' },
      { icon: 'help', label: 'Help Center', action: 'help' },
      { icon: 'shield', label: 'Privacy Policy', action: 'privacy' },
    ],
  },
];

export const profileStats = { posts: '127', followers: '24.8K', following: '892' };

export const profileGrid: ArtVariant[] = [
  'sunset', 'city', 'ocean',
  'forest', 'neon', 'desert',
  'sunset', 'city', 'ocean',
];
