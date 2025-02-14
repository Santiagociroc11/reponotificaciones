import React, { useState, useEffect } from 'react';
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

    return <span dangerouslySetInnerHTML={{ __html: formattedMessage }} />;
  };

  // Posicionamiento dinámico dentro del contenedor de vista previa
  const positionStyles: Record<string, string> = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  // Animación dinámica basada en `config.animation`
  const animationClasses: Record<string, string> = {
    "fade": "animate-fade",
    "slide": "animate-slide",
    "bounce": "animate-bounce",
  };

  // Estado para manejar la animación
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(false); // 🔥 Apaga la animación
    setTimeout(() => {
      setIsAnimating(true); // 🔥 La vuelve a activar después de 50ms
    }, 50);
  }, [config.animation]); // ⏳ Se ejecuta cuando la animación cambia

  return (
    <div
      className={clsx(
        'absolute flex items-center gap-3 p-4 rounded-lg shadow-lg transition-all w-auto max-w-[90%]',
        positionStyles[config.position] || "top-right", // Posición predeterminada
        isAnimating && animationClasses[config.animation] // 🔥 Solo aplica la animación si isAnimating es true
      )}
      style={{
        backgroundColor: config.backgroundColor,
        alignItems: "center",
        display: "flex",
        gap: "0.75rem",
        color: config.textColor,
        borderRadius: `${config.borderRadius}px`,
        padding: `${config.padding}px`,
        fontSize: `${config.fontSize}px`,
        maxWidth: "20rem",
        zIndex: "9999",
        boxShadow: config.shadow ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
      }}
    >
      {config.showIcon && <Icon size={24} className="flex-shrink-0" />}
      <p className="flex-1 m-0">{formatMessage(config.messageTemplate)}</p>
    </div>
  );
};
