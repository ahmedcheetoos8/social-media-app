export const colors = {
  bg: '#050a11',
  bgSecondary: '#080f18',
  bgCard: '#09101a',
  border: '#101a26',
  borderLight: '#1c2734',
  borderInput: '#293241',
  borderSocial: '#2c3746',
  textPrimary: '#f3f5f7',
  textSecondary: '#b5beca',
  textMuted: '#8a94a2',
  textDim: '#6f7988',
  textFaded: '#697687',
  accent: '#ff5942',
  accentLight: '#ff624c',
  accentDeep: '#ff4d37',
  pink: '#ff4e74',
  purple: '#8a4df4',
  blue: '#25a9e8',
  googleBlue: '#4285f4',
  heartRed: '#ff3853',
  green: '#22c55e',
  navBg: '#070d15',
  storyRing: '#ff4e74',
  storyRingSelf: '#3c4858',
};

export const fonts = {
  regular: 'Inter-Regular',
  bold: 'Inter-Bold',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'explore', label: 'Explore' },
  { key: 'create', label: 'Create' },
  { key: 'reels', label: 'Reels' },
  { key: 'profile', label: 'Profile' },
] as const;

export type NavKey = (typeof navItems)[number]['key'];
