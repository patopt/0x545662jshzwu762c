
export enum ViewState {
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  APPS = 'APPS',
  SOCIAL = 'SOCIAL',
  SHOP = 'SHOP',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  GAME_DETAILS = 'GAME_DETAILS'
}

export enum SystemMode {
  DEFAULT = 'DEFAULT', // Modern Glass Interface
  PSP = 'PSP',         // XMB Interface
}

export interface Game {
  id: string;
  title: string;
  platform: string;
  playtime: string;
  image: string;
  banner?: string;
  achievementsEarned: number;
  achievementsTotal: number;
  lastPlayed?: string;
  isFavorite?: boolean;
}

export interface AppItem {
  id: string;
  name: string;
  scheme: string;
  icon?: string;
  color?: string;
  isInstalled: boolean;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'playing';
  game?: string;
  messageCount: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  image: string;
}

export interface ShopItem {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  type: 'Theme' | 'Audio' | 'Asset';
  likes: number;
  downloads: string;
}
