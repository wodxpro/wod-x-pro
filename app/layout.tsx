import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: 'WOD[X] PRO',
  description: 'Transforme esforço físico em valor digital real.',
  manifest: '/manifest.json',
  themeColor: '#ff1c16',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WOD[X] PRO',
    startupImage: [
      {
        url: '/icons/ios/1024.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/icons/ios/1024.png',
        media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/icons/ios/1024.png',
        media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  icons: {
    apple: [
      { url: '/icons/ios/180.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/ios/152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/ios/120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/ios/76.png', sizes: '76x76', type: 'image/png' },
      { url: '/icons/ios/60.png', sizes: '60x60', type: 'image/png' },
    ],
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/pwa/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.className}>
      <head>
        {/* Meta tags para iOS PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="WOD[X] PRO" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Meta tags para miniapp (Telegram, WeChat, etc.) */}
        <meta name="telegram-web-app" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

