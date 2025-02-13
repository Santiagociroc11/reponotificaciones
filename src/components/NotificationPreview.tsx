import React from 'react';
import { Bell, ShoppingCart, Check } from 'lucide-react';
import { NotificationConfig } from '../types';
import clsx from 'clsx';

interface Props {
  config: NotificationConfig;
}

const icons = {
  bell: Bell,
  cart: ShoppingCart,
  check: Check,
};

export const NotificationPreview: React.FC<Props> = ({ config }) => {
  const Icon = icons[config.iconType as keyof typeof icons];
  
  const getRandomName = () => {
    if (!config.firstNames.length || !config.lastNames.length) return 'John Doe';
    const firstName = config.firstNames[Math.floor(Math.random() * config.firstNames.length)];
    const lastName = config.lastNames[Math.floor(Math.random() * config.lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const getRandomProduct = () => {
    if (!config.customProducts.length) return 'Amazing Product';
    return config.customProducts[Math.floor(Math.random() * config.customProducts.length)];
  };

  const formatMessage = (message: string) => {
    const name = getRandomName();
    const product = getRandomProduct();
    
    let formattedMessage = message
      .replace('[Name]', name)
      .replace('[Product]', product);

    // Apply text formatting
    formattedMessage = formattedMessage
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/~(.*?)~/g, '<del>$1</del>')
      .replace(/\+(.*?)\+/g, '<u>$1</u>');

    return <span dangerouslySetInnerHTML={{ __html: formattedMessage }} />;
  };

  return (
    <div
      className={clsx(
        'max-w-sm flex items-center gap-3 rounded-lg',
        'absolute'
      )}
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        borderRadius: `${config.borderRadius}px`,
        padding: `${config.padding}px`,
        fontSize: `${config.fontSize}px`,
        boxShadow: config.shadow ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {config.showIcon && (
        <Icon size={24} className="flex-shrink-0" />
      )}
      <p className="flex-1 m-0">{formatMessage(config.messageTemplate)}</p>
    </div>
  );
};