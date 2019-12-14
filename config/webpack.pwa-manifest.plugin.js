const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const appName = process.env.NODE_ENV === 'production' ? 'PapaGère' : 'PapaGère-Staging';
const appIconFolderPath = 'app/images/icons/app-icons/';
const appIcon = process.env.NODE_ENV === 'production' ? 'app-icon.png' : 'app-icon-staging.png';
const appIconLarge = process.env.NODE_ENV === 'production' ? 'large-app-icon-staging.png' : 'large-app-icon-staging.png';
const appIconPath = appIconFolderPath + appIcon;
const appIconLargePath = appIconFolderPath + appIconLarge;

module.exports = new WebpackPwaManifest({
  ios: true,
  name: appName,
  short_name: appName,
  background_color: '#ffffff',
  start_url: '.',
  scope: '.',
  display: 'standalone',
  orientation: 'portrait-primary',
  theme_color: '#fff',
  description: 'Votre contrat devient, un jeu d\'enfant. Vous êtes Parents ou AssMats\', Libérez votre esprit !',
  dir: 'ltr',
  lang: 'fr-FR',
  icons: [
    {
      src: path.resolve(appIconPath),
      sizes: [48, 72, 96, 144, 192, 384, 512],
      destination: path.join('icons', 'app-icons'),
    },
    {
      src: path.resolve(appIconLargePath),
      size: '1024x1024',
      destination: path.join('icons', 'app-icons'),
    },
    {
      src: path.resolve(appIconPath),
      sizes: [120, 152, 167, 180, 800],
      destination: path.join('icons', 'app-icons', 'ios'),
      ios: true,
    },
  ],
});
