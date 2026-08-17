const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'assets', 'images', 'pages');
const targetDir = path.join(__dirname, 'assets', 'images', 'auth');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map background images
const copies = [
  { src: 'inside-studio.jpg', target: 'login-bg.jpg' },
  { src: 'signup-beauty-bg.jpg', target: 'signup-bg.jpg' },
  { src: 'forgot-password-bg.jpg', target: 'forgot-password-bg.jpg' }
];

copies.forEach(item => {
  const srcPath = path.join(srcDir, item.src);
  const targetPath = path.join(targetDir, item.target);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, targetPath);
    console.log(`Copied ${item.src} -> ${item.target}`);
  } else {
    console.log(`Source missing: ${item.src}`);
  }
});
