# 🌍 Digital Globe

An interactive 3D digital globe featuring Earth, Sun, Moon, and a beautiful starfield. Built with Three.js.

![Digital Globe](https://img.shields.io/badge/Three.js-0.160.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🌍 **Rotating Earth** - Watch Earth spin on its axis with realistic textures
- 🌙 **Orbiting Moon** - Moon orbits around Earth in real-time
- ☀️ **Dynamic Sun** - Pulsing sun with glow effect and lighting
- ⭐ **Starfield** - 10,000 stars creating an immersive space environment
- 🌥️ **Cloud Layer** - Semi-transparent clouds drifting over Earth
- 🎮 **Interactive Controls** - Drag to rotate, scroll to zoom

## 🚀 Quick Start

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser. No build process required!

### Option 2: Using a Local Server

For better performance and to avoid CORS issues:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎮 Controls

- **Rotate View**: Click and drag with mouse
- **Zoom**: Scroll mouse wheel
- **Pan**: Right-click and drag (or Ctrl + drag)

## 🛠️ Technologies

- **Three.js** - 3D graphics library
- **WebGL** - Hardware-accelerated 3D rendering
- **Pure JavaScript** - No frameworks, just vanilla JS

## 📁 Project Structure

```
digital-globe/
├── index.html      # Main HTML file
├── style.css       # Styling and layout
├── main.js         # Three.js scene and animations
└── README.md       # Documentation
```

## 🌟 Features in Detail

### Earth
- Procedurally generated continents and oceans
- Rotates on its axis (one full rotation ≈ 5 minutes)
- Phong material for realistic lighting

### Moon
- Orbits Earth with realistic distance
- Procedurally generated crater texture
- Rotates on its own axis

### Sun
- Acts as primary light source
- Pulsing glow effect
- Illuminates Earth and Moon

### Stars
- 10,000 randomly positioned stars
- Subtle rotation for depth effect
- Creates immersive space environment

## 🎨 Customization

Edit `main.js` to customize:

```javascript
// Change Earth rotation speed
earth.rotation.y += 0.002; // Increase for faster rotation

// Adjust Moon orbit radius
const moonOrbitRadius = 5; // Change orbit distance

// Modify star count
for (let i = 0; i < 10000; i++) // Change number
```

## 📱 Browser Support

Works in all modern browsers that support WebGL:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning or your own projects!

## 👨‍💻 Author

Created with ❤️ by Sarvarbek

## 🙏 Acknowledgments

- Three.js community for the amazing library
- NASA for space inspiration

---

**Enjoy exploring the cosmos! 🚀**
