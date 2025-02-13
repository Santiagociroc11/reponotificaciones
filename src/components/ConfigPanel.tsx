import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { NotificationConfig } from '../types';
import { Bell, ShoppingCart, Check, Bold, Italic, Underline, Strikethrough } from 'lucide-react';

interface Props {
  config: NotificationConfig;
  onChange: (config: NotificationConfig) => void;
}

export const ConfigPanel: React.FC<Props> = ({ config, onChange }) => {
  const updateConfig = (updates: Partial<NotificationConfig>) => {
    onChange({ ...config, ...updates });
  };

  const formatHelp = `
    Formato de texto:
    *texto* = negrita
    _texto_ = cursiva
    ~texto~ = tachado
    +texto+ = subrayado
  `;

  return (
    <div className="bg-white rounded-lg space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Posición</h3>
        <select
          className="w-full p-2 border rounded"
          value={config.position}
          onChange={(e) => updateConfig({ position: e.target.value as any })}
        >
          <option value="top-right">Superior Derecha</option>
          <option value="top-left">Superior Izquierda</option>
          <option value="bottom-right">Inferior Derecha</option>
          <option value="bottom-left">Inferior Izquierda</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Animación</h3>
        <select
          className="w-full p-2 border rounded"
          value={config.animation}
          onChange={(e) => updateConfig({ animation: e.target.value as any })}
        >
          <option value="fade">Desvanecer</option>
          <option value="slide">Deslizar</option>
          <option value="bounce">Rebotar</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Colores</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Color de Fondo</label>
            <HexColorPicker
              color={config.backgroundColor}
              onChange={(color) => updateConfig({ backgroundColor: color })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Color de Texto</label>
            <HexColorPicker
              color={config.textColor}
              onChange={(color) => updateConfig({ textColor: color })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Radio del Borde (px)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={config.borderRadius}
            onChange={(e) => updateConfig({ borderRadius: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tamaño de Fuente (px)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={config.fontSize}
            onChange={(e) => updateConfig({ fontSize: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Relleno (px)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={config.padding}
            onChange={(e) => updateConfig({ padding: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Duración (ms)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={config.duration}
            onChange={(e) => updateConfig({ duration: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Frecuencia (ms)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={config.frequency}
            onChange={(e) => updateConfig({ frequency: Number(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.showIcon}
            onChange={(e) => updateConfig({ showIcon: e.target.checked })}
          />
          Mostrar Icono
        </label>
        {config.showIcon && (
          <select
            className="mt-2 w-full p-2 border rounded"
            value={config.iconType}
            onChange={(e) => updateConfig({ iconType: e.target.value })}
          >
            <option value="bell">Campana</option>
            <option value="cart">Carrito</option>
            <option value="check">Check</option>
          </select>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.shadow}
            onChange={(e) => updateConfig({ shadow: e.target.checked })}
          />
          Mostrar Sombra
        </label>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Nombres (uno por línea)</h3>
        <textarea
          className="w-full p-2 border rounded"
          value={config.firstNames.join('\n')}
          onChange={(e) => updateConfig({ firstNames: e.target.value.split('\n').filter(Boolean) })}
          rows={4}
          placeholder="Juan
María
Carlos"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Apellidos (uno por línea)</h3>
        <textarea
          className="w-full p-2 border rounded"
          value={config.lastNames.join('\n')}
          onChange={(e) => updateConfig({ lastNames: e.target.value.split('\n').filter(Boolean) })}
          rows={4}
          placeholder="Pérez
García
López"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Productos (uno por línea)</h3>
        <textarea
          className="w-full p-2 border rounded"
          value={config.customProducts.join('\n')}
          onChange={(e) => updateConfig({ customProducts: e.target.value.split('\n').filter(Boolean) })}
          rows={4}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Plantilla del Mensaje</h3>
        <div className="mb-2 p-3 bg-gray-50 rounded text-sm">
          <p className="font-medium mb-2">Formato de texto:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Bold size={16} /> <code>*texto*</code>
            </div>
            <div className="flex items-center gap-2">
              <Italic size={16} /> <code>_texto_</code>
            </div>
            <div className="flex items-center gap-2">
              <Strikethrough size={16} /> <code>~texto~</code>
            </div>
            <div className="flex items-center gap-2">
              <Underline size={16} /> <code>+texto+</code>
            </div>
          </div>
        </div>
        <textarea
          className="w-full p-2 border rounded"
          value={config.messageTemplate}
          onChange={(e) => updateConfig({ messageTemplate: e.target.value })}
          rows={3}
          placeholder="🚀 ¡*[Name]* acaba de comprar _[Product]_!"
        />
      </div>
    </div>
  );
};