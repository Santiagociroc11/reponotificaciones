import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { NotificationConfig } from '../types';
import toast from 'react-hot-toast';

SyntaxHighlighter.registerLanguage('javascript', js);

interface Props {
  config: NotificationConfig;
}

// 🔹 Función para convertir emojis a Unicode HTML
function convertEmojisToHtmlEntities(str: string) {
  return str.replace(/[\u{0080}-\u{FFFF}]/gu, (match) => {
    return "&#x" + match.codePointAt(0)?.toString(16) + ";";
  });
}

export const CodeGenerator: React.FC<Props> = ({ config }) => {
  const generateCode = () => {
    // Convierte emojis en la plantilla del mensaje antes de generar el código
    const safeMessageTemplate = convertEmojisToHtmlEntities(config.messageTemplate);

    return `
<script>
(function() {
  const config = ${JSON.stringify({ ...config, messageTemplate: safeMessageTemplate }, null, 2)};
  
  function createNotification() {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.maxWidth = '20rem';
    notification.style.backgroundColor = '${config.backgroundColor}';
    notification.style.color = '${config.textColor}';
    notification.style.borderRadius = '${config.borderRadius}px';
    notification.style.padding = '${config.padding}px';
    notification.style.fontSize = '${config.fontSize}px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '0.75rem';
    ${config.shadow ? "notification.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';" : ''}
    notification.style.zIndex = '9999';
    
    // Set position
    const pos = '${config.position}'.split('-');
    notification.style[pos[0]] = '1rem';
    notification.style[pos[1]] = '1rem';
    
    // Add icon if enabled
    ${config.showIcon ? `
    const icon = document.createElement('div');
    icon.innerHTML = '${getIconSvg(config.iconType)}';
    icon.style.flexShrink = '0';
    notification.appendChild(icon);
    ` : ''}
    
    // Add message
    const message = document.createElement('div');
    message.style.margin = '0';
    message.innerHTML = generateMessage();
    notification.appendChild(message);
    
    // Add animation
    notification.style.animation = getAnimation();
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s forwards';
      setTimeout(() => notification.remove(), 500);
    }, ${config.duration});
  }
  
  function generateMessage() {
    const firstNames = ${JSON.stringify(config.firstNames)};
    const lastNames = ${JSON.stringify(config.lastNames)};
    const products = ${JSON.stringify(config.customProducts)};
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    let message = '${safeMessageTemplate}'
      .replace('[Name]', firstName + ' ' + lastName)
      .replace('[Product]', product);      

    return message;
  }

  
  function getAnimation() {
    switch('${config.animation}') {
      case 'fade':
        return 'fadeIn 0.5s forwards';
      case 'slide':
        return 'slideIn 0.5s forwards';
      case 'bounce':
        return 'bounceIn 0.5s forwards';
      default:
        return 'fadeIn 0.5s forwards';
    }
  }
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = \`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); opacity: 0.8; }
      70% { transform: scale(0.9); opacity: 0.9; }
      100% { transform: scale(1); opacity: 1; }
    }
  \`;
  document.head.appendChild(style);
  
  // Start showing notifications
  setInterval(createNotification, ${config.frequency});
})();
</script>`;
  };

  const getIconSvg = (iconType: string) => {
    switch (iconType) {
      case 'bell':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>';
      case 'cart':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';
      case 'check':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      default:
        return '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode()).then(() => {
      toast.success('¡Código copiado al portapapeles!');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Código Generado</h3>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Copiar Código
        </button>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          className="!bg-gray-50 !p-4 rounded-lg"
        >
          {generateCode()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
