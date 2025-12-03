
import { Game, Friend, AppItem, NewsItem, ShopItem } from './types';

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Ape Escape P!',
    platform: 'PSP',
    playtime: '55 hours',
    image: 'https://picsum.photos/id/10/400/400',
    banner: 'https://picsum.photos/id/10/800/400',
    achievementsEarned: 64,
    achievementsTotal: 93,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Black Rock Shooter',
    platform: 'PSP',
    playtime: '21 hours',
    image: 'https://picsum.photos/id/11/400/400',
    banner: 'https://picsum.photos/id/11/800/400',
    achievementsEarned: 105,
    achievementsTotal: 105,
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Loco Roco',
    platform: 'PSP',
    playtime: '4 hours',
    image: 'https://picsum.photos/id/12/400/400',
    achievementsEarned: 4,
    achievementsTotal: 101,
  },
  {
    id: '4',
    title: 'WipEout Pure',
    platform: 'PSP',
    playtime: '12 hours',
    image: 'https://picsum.photos/id/13/400/400',
    achievementsEarned: 9,
    achievementsTotal: 237,
  },
  {
    id: '5',
    title: 'Super Mario 64 DS',
    platform: 'NDS',
    playtime: '30 hours',
    image: 'https://picsum.photos/id/14/400/400',
    achievementsEarned: 120,
    achievementsTotal: 120,
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Animal Crossing: WW',
    platform: 'NDS',
    playtime: '150 hours',
    image: 'https://picsum.photos/id/15/400/400',
    achievementsEarned: 45,
    achievementsTotal: 80,
    isFavorite: true,
  },
    {
    id: '7',
    title: 'Sonic Colors',
    platform: 'NDS',
    playtime: '8 hours',
    image: 'https://picsum.photos/id/16/400/400',
    achievementsEarned: 12,
    achievementsTotal: 50,
  }
];

export const FRIENDS: Friend[] = [
  { id: '1', username: 'UsagiShade', avatar: 'https://picsum.photos/id/64/100/100', status: 'online', messageCount: 2 },
  { id: '2', username: 'Wii', avatar: 'https://picsum.photos/id/65/100/100', status: 'playing', game: 'Sonic Shuffle', messageCount: 0 },
  { id: '3', username: 'JD Brence', avatar: 'https://picsum.photos/id/66/100/100', status: 'offline', messageCount: 1 },
  { id: '4', username: 'Eater Monkey', avatar: 'https://picsum.photos/id/67/100/100', status: 'online', messageCount: 5 },
  { id: '5', username: 'daggume', avatar: 'https://picsum.photos/id/68/100/100', status: 'playing', game: 'Project SEKAI', messageCount: 0 },
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'New Firmware 3.0 Released',
    source: 'System Update',
    date: '2 hours ago',
    image: 'https://picsum.photos/id/100/600/400'
  },
  {
    id: '2',
    title: 'Top 10 Hidden Gems',
    source: 'Retro Gamer',
    date: '5 hours ago',
    image: 'https://picsum.photos/id/101/600/400'
  },
  {
    id: '3',
    title: 'Community Spotlight',
    source: 'iiSU Blog',
    date: '1 day ago',
    image: 'https://picsum.photos/id/102/600/400'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: '1',
    title: 'Neon Nights Theme',
    author: 'CyberPunk99',
    description: 'A vibrant neon theme for your dashboard.',
    image: 'https://picsum.photos/id/200/300/300',
    type: 'Theme',
    likes: 1200,
    downloads: '5k'
  },
  {
    id: '2',
    title: 'Chill Beats Vol. 1',
    author: 'LofiGirl',
    description: 'Relaxing background music.',
    image: 'https://picsum.photos/id/201/300/300',
    type: 'Audio',
    likes: 850,
    downloads: '2.3k'
  },
  {
    id: '3',
    title: '3D Glass Icons',
    author: 'DesignMaster',
    description: 'High quality 3D icons for your apps.',
    image: 'https://picsum.photos/id/202/300/300',
    type: 'Asset',
    likes: 2100,
    downloads: '10k'
  },
  {
    id: '4',
    title: 'Retro Wave BGM',
    author: 'SynthWave',
    description: 'Nostalgic 80s synthesizer music.',
    image: 'https://picsum.photos/id/203/300/300',
    type: 'Audio',
    likes: 500,
    downloads: '1.2k'
  }
];

// Raw Data from User
const DEEP_LINKS_DATA: Record<string, string> = {
  "com.8bit.bitwarden": "bitwarden://",
  "com.apple.airport.mobileairportutility": "apmanage://",
  "com.apple.appleseed.FeedbackAssistant": "applefeedback://",
  "com.apple.AppStore": "itms-apps://itunes.apple.com/",
  "com.apple.camera": "shortcuts://x-callback-url/run-shortcut?x-error=camera://",
  "com.apple.DocumentsApp": "shareddocuments://",
  "com.apple.facetime": "shortcuts://run-shortcut?name=Icon%20Themer&input=%7B%22launch%22%3A%22FaceTime%22%7D",
  "com.apple.findmy": "findmy://",
  "com.apple.Fitness": "activitytoday://",
  "com.apple.Health": "x-apple-health://",
  "com.apple.Home": "com.apple.home://",
  "com.apple.iBooks": "ibooks://",
  "com.apple.iMovie": "imovie://",
  "com.apple.Maps": "maps://",
  "com.apple.measure": "shortcuts://run-shortcut?name=Icon%20Themer&input=%7B%22launch%22%3A%22Measure%22%7D",
  "com.apple.mobilecal": "calshow://",
  "com.apple.mobilegarageband": "garageband://",
  "com.apple.mobilemail": "message://",
  "com.apple.mobilenotes": "mobilenotes://",
  "com.apple.mobilesafari": "data:text/html,%3Cscript%3Eonload%3Dself.close%3C/script%3E",
  "com.apple.mobileslideshow": "photos-redirect://",
  "com.apple.MobileSMS": "messages://",
  "com.apple.Music": "music://",
  "com.apple.news": "applenews://",
  "com.apple.Passbook": "wallet://",
  "com.apple.podcasts": "podcasts://itunes.apple.com/",
  "com.apple.Preferences": "app-prefs://",
  "com.apple.reminders": "x-apple-reminderkit://",
  "com.apple.shortcuts": "shortcuts://",
  "com.apple.stocks": "stocks://",
  "com.apple.tv": "videos://",
  "com.apple.VoiceMemos": "shortcuts://x-callback-url/run-shortcut?x-error=voicememos://",
  "com.apple.weather": "shortcuts://x-callback-url/run-shortcut?x-error=weather://",
  "com.burbn.instagram": "instagram://",
  "com.christianselig.Apollo": "apollo://",
  "com.facebook.Facebook": "fb://",
  "com.facebook.Messenger": "fb-messenger://",
  "com.google.chrome.ios": "googlechrome://",
  "com.google.Docs": "googledocs://",
  "com.google.Drive": "googledrive://",
  "com.google.Gmail": "googlegmail://",
  "com.google.GoogleMobile": "google://",
  "com.google.ios.youtubemusic": "youtubemusic://",
  "com.google.Maps": "googlemaps://",
  "com.google.photos": "googlephotos://",
  "com.google.Sheets": "googlesheets://",
  "com.google.Slides": "googleslides://",
  "com.google.Translate": "googletranslate://",
  "com.hammerandchisel.discord": "com.hammerandchisel.discord://",
  "com.hulu.plus": "hulu://",
  "com.linkedin.LinkedIn": "linkedin://",
  "com.microsoft.msedge": "microsoft-edge://",
  "com.microsoft.Office.Excel": "ms-excel://",
  "com.microsoft.Office.Outlook": "ms-outlook://",
  "com.microsoft.Office.Powerpoint": "ms-powerpoint://",
  "com.microsoft.Office.Word": "ms-word://",
  "com.microsoft.skype.teams": "msteams://",
  "com.mojang.minecraftpe": "minecraft://",
  "com.netflix.Netflix": "nflx://",
  "com.reddit.Reddit": "reddit://",
  "com.roblox.robloxmobile": "roblox://",
  "com.skype.skype": "skype://x-callback-url/?x-success=",
  "com.soundcloud.TouchApp": "soundcloud://",
  "com.spotify.client": "spotify://",
  "com.tapbots.Tweetbot4": "tweetbot://",
  "com.toyopagroup.picaboo": "snapchat://",
  "com.viber": "vk5487299://",
  "com.zhiliaoapp.musically": "tiktok://",
  "tv.twitch": "twitch://",
  "us.zoom.videomeetings": "zoomus://"
};

// Helper to generate a color from a string (for icon background)
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

// Transform raw data into AppItem objects
export const APPS_LIBRARY: AppItem[] = Object.entries(DEEP_LINKS_DATA).map(([id, scheme]) => {
  // Simple logic to extract a readable name from the bundle ID
  const parts = id.split('.');
  let name = parts[parts.length - 1];
  
  // Specific fixups
  if (name === 'client' && id.includes('spotify')) name = 'Spotify';
  if (name === 'TouchApp') name = 'SoundCloud';
  if (name === 'musically') name = 'TikTok';
  if (name === 'picaboo') name = 'Snapchat';
  
  // Capitalize
  name = name.charAt(0).toUpperCase() + name.slice(1);

  // Default some popular apps to "Installed"
  const defaultInstalled = [
    'Spotify', 'Instagram', 'Discord', 'Chrome', 'Youtube', 'Twitch', 'Reddit', 'Netflix'
  ].some(n => name.includes(n));

  return {
    id,
    name,
    scheme,
    color: stringToColor(id),
    isInstalled: defaultInstalled
  };
});
