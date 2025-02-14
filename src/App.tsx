import React, { useState } from 'react';
import { NotificationConfig } from './types';
import { NotificationPreview } from './components/NotificationPreview';
import { ConfigPanel } from './components/ConfigPanel';
import { CodeGenerator } from './components/CodeGenerator';
import { Toaster } from 'react-hot-toast';

const defaultConfig: NotificationConfig = {
  position: 'bottom-left',
  animation: 'bounce',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  borderRadius: 8,
  fontSize: 15,
  padding: 15,
  duration: 7000,
  frequency: 15000,
  showIcon: true,
  iconType: 'cart',
  firstNames: [
    'Valentina',
    'Camila',
    'Sofía',
    'Mariana',
    'Isabella',
    'Gabriela',
    'Natalia',
    'Daniela',
    'Luciana',
    'Fernanda',
    'Alejandra',
    'Paola',
    'Jimena',
    'Renata',
    'Andrea',
    'Juliana',
    'Catalina',
    'Mónica',
    'Victoria',
    'Claudia',
  ],
  lastNames: [
    'González',
    'Rodríguez',
    'Pérez',
    'Martínez',
    'López',
    'Sánchez',
    'Ramírez',
    'Cruz',
    'Morales',
    'Torres',
    'Fernández',
    'Castillo',
    'Herrera',
    'Vargas',
    'Romero',
    'Ortiz',
    'Jiménez',
    'Mendoza',
    'Chávez',
    'Reyes',
  ],
  customProducts: [
    'Producto Increíble',
    'Servicio Premium',
    'Gadget Innovador',
  ],
  messageTemplate: '✅ ¡COMPRA VERIFICADA: [Name] acaba de adquirir [Product]!',
  shadow: true,
};

function App() {
  const [config, setConfig] = useState<NotificationConfig>(defaultConfig);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Generador de Notificaciones
          </h1>
          <p className="text-gray-600">
            Crea notificaciones personalizadas y atractivas para tu sitio web
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">
                Personaliza tu Notificación
              </h2>
              <ConfigPanel config={config} onChange={setConfig} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Vista Previa</h2>
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-800 text-white p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 text-center text-sm">
                      Vista Previa del Sitio Web
                    </div>
                  </div>
                </div>
                <div className="h-[400px] bg-white relative overflow-hidden">
                  <div className="p-4">
                    <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="w-2/3 h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-gray-200 rounded"></div>
                      <div className="h-24 bg-gray-200 rounded"></div>
                      <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                    <NotificationPreview config={config} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CodeGenerator config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
