import React from 'react';
import { ViewStyle } from 'react-native';
import {
  // Navigation & UI
  Home,
  User,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Info,
  
  // Audio & Speech
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Headphones,
  Speaker,
  
  // Learning & Progress
  BookOpen,
  GraduationCap,
  Target,
  Trophy,
  Award,
  Star,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Brain,
  
  // Communication
  MessageCircle,
  MessageSquare,
  Send,
  Phone,
  Video,
  Users,
  UserCheck,
  
  // Actions
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Upload,
  Share,
  Bookmark,
  Heart,
  ThumbsUp,
  
  // Status
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  
  // Misc
  Globe,
  Map,
  Camera,
  Image,
  File,
  Folder,
  Link,
  ExternalLink,
  RefreshCw as Refresh,
  MoreHorizontal,
  MoreVertical,
  Shield,
  HelpCircle as HelpCircleIcon,
  LogOut as LogOutIcon,
  Lightbulb as LightbulbIcon,
} from 'lucide-react-native';
import { palette } from '../../theme/colors';

// Icon size presets following iOS HIG
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
} as const;

export type IconSize = keyof typeof iconSizes;
export type IconName = 
  // Navigation & UI
  | 'home' | 'user' | 'settings' | 'menu' | 'x' | 'chevron-left' | 'chevron-right' 
  | 'chevron-up' | 'chevron-down' | 'arrow-left' | 'arrow-right' | 'plus' | 'minus' 
  | 'check' | 'alert-circle' | 'info'
  
  // Audio & Speech
  | 'mic' | 'mic-off' | 'volume' | 'volume-off' | 'play' | 'pause' | 'stop' 
  | 'skip-back' | 'skip-forward' | 'headphones' | 'speaker'
  
  // Learning & Progress
  | 'book' | 'graduation-cap' | 'target' | 'trophy' | 'award' | 'star' 
  | 'trending-up' | 'bar-chart' | 'pie-chart' | 'activity' | 'zap' | 'brain'
  
  // Communication
  | 'message-circle' | 'message-square' | 'send' | 'phone' | 'video' | 'users' | 'user-check'
  
  // Actions
  | 'search' | 'filter' | 'edit' | 'trash' | 'download' | 'upload' | 'share' 
  | 'bookmark' | 'heart' | 'thumbs-up'
  
  // Status
  | 'check-circle' | 'x-circle' | 'clock' | 'calendar' | 'bell' | 'bell-off' 
  | 'eye' | 'eye-off' | 'lock' | 'unlock'
  
  // Misc
  | 'globe' | 'map' | 'camera' | 'image' | 'file' | 'folder' | 'link' 
  | 'external-link' | 'refresh' | 'more-horizontal' | 'more-vertical'
  | 'shield' | 'help-circle' | 'log-out' | 'lightbulb';

interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  style?: ViewStyle;
}

// Icon mapping
const iconMap = {
  // Navigation & UI
  'home': Home,
  'user': User,
  'settings': Settings,
  'menu': Menu,
  'x': X,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'plus': Plus,
  'minus': Minus,
  'check': Check,
  'alert-circle': AlertCircle,
  'info': Info,
  
  // Audio & Speech
  'mic': Mic,
  'mic-off': MicOff,
  'volume': Volume2,
  'volume-off': VolumeX,
  'play': Play,
  'pause': Pause,
  'stop': Square,
  'skip-back': SkipBack,
  'skip-forward': SkipForward,
  'headphones': Headphones,
  'speaker': Speaker,
  
  // Learning & Progress
  'book': BookOpen,
  'graduation-cap': GraduationCap,
  'target': Target,
  'trophy': Trophy,
  'award': Award,
  'star': Star,
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
  'pie-chart': PieChart,
  'activity': Activity,
  'zap': Zap,
  'brain': Brain,
  
  // Communication
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  'send': Send,
  'phone': Phone,
  'video': Video,
  'users': Users,
  'user-check': UserCheck,
  
  // Actions
  'search': Search,
  'filter': Filter,
  'edit': Edit,
  'trash': Trash2,
  'download': Download,
  'upload': Upload,
  'share': Share,
  'bookmark': Bookmark,
  'heart': Heart,
  'thumbs-up': ThumbsUp,
  
  // Status
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'clock': Clock,
  'calendar': Calendar,
  'bell': Bell,
  'bell-off': BellOff,
  'eye': Eye,
  'eye-off': EyeOff,
  'lock': Lock,
  'unlock': Unlock,
  
  // Misc
  'globe': Globe,
  'map': Map,
  'camera': Camera,
  'image': Image,
  'file': File,
  'folder': Folder,
  'link': Link,
  'external-link': ExternalLink,
  'refresh': Refresh,
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  'shield': Shield,
  'help-circle': HelpCircleIcon,
  'log-out': LogOutIcon,
  'lightbulb': LightbulbIcon,
} as const;

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  color = palette.text, 
  style 
}) => {
  const IconComponent = iconMap[name];
  const iconSize = typeof size === 'number' ? size : iconSizes[size];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <IconComponent
      size={iconSize}
      color={color}
      style={style}
    />
  );
};

export default Icon;
