export type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type Animation = 'fade' | 'slide' | 'bounce';

export interface NotificationConfig {
  position: Position;
  animation: Animation;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  padding: number;
  duration: number;
  frequency: number;
  showIcon: boolean;
  iconType: string;
  firstNames: string[];
  lastNames: string[];
  customProducts: string[];
  messageTemplate: string;
  shadow: boolean;
}