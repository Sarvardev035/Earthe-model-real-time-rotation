import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camera position
camera.position.z = 15;

// Orbit Controls - More sensitive and smooth
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03; // More responsive
controls.rotateSpeed = 0.8; // Increased sensitivity
controls.zoomSpeed = 1.2; // Faster zoom
controls.panSpeed = 0.8;
controls.minDistance = 3;
controls.maxDistance = 50;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;

// Control variables
let earthRotationSpeed = 1;
let moonOrbitSpeed = 1;
let timeScale = 1;
let isPaused = false;

// Lighting
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Sun (Point Light)
const sunLight = new THREE.PointLight(0xffffff, 2, 100);
sunLight.position.set(20, 0, 0);
scene.add(sunLight);

// Sun Mesh
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 1
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.copy(sunLight.position);
scene.add(sun);

// Add sun glow
const sunGlowGeometry = new THREE.SphereGeometry(2.3, 32, 32);
const sunGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.3
});
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
sunGlow.position.copy(sun.position);
scene.add(sunGlow);

// Earth with real texture
const earthGeometry = new THREE.SphereGeometry(2, 128, 128);
const textureLoader = new THREE.TextureLoader();

// Load real Earth textures from NASA
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
const earthBumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
const earthSpecularMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');

const earthMaterial = new THREE.MeshPhongMaterial({ 
    map: earthTexture,
    bumpMap: earthBumpMap,
    bumpScale: 0.05,
    specularMap: earthSpecularMap,
    specular: 0x333333,
    shininess: 25
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.rotation.x = 23.5 * Math.PI / 180; // Earth's axial tilt
scene.add(earth);

// Earth clouds with real texture
const cloudsGeometry = new THREE.SphereGeometry(2.015, 128, 128);
const cloudsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');
const cloudsMaterial = new THREE.MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
});
const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
clouds.rotation.x = 23.5 * Math.PI / 180;
scene.add(clouds);

// Moon with real texture
const moonGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const moonTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg');
const moonMaterial = new THREE.MeshPhongMaterial({ 
    map: moonTexture,
    bumpMap: moonTexture,
    bumpScale: 0.02
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true
});

const starsVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Animation variables
let time = 0;

// UI Control Event Listeners
const earthSpeedSlider = document.getElementById('earthSpeed');
const earthSpeedValue = document.getElementById('earthSpeedValue');
const moonSpeedSlider = document.getElementById('moonSpeed');
const moonSpeedValue = document.getElementById('moonSpeedValue');
const timeScaleSlider = document.getElementById('timeScale');
const timeScaleValue = document.getElementById('timeScaleValue');
const resetViewButton = document.getElementById('resetView');
const toggleRotationButton = document.getElementById('toggleRotation');

earthSpeedSlider.addEventListener('input', (e) => {
    earthRotationSpeed = parseFloat(e.target.value);
    earthSpeedValue.textContent = earthRotationSpeed.toFixed(1) + 'x';
});

moonSpeedSlider.addEventListener('input', (e) => {
    moonOrbitSpeed = parseFloat(e.target.value);
    moonSpeedValue.textContent = moonOrbitSpeed.toFixed(1) + 'x';
});

timeScaleSlider.addEventListener('input', (e) => {
    timeScale = parseFloat(e.target.value);
    timeScaleValue.textContent = timeScale.toFixed(1) + 'x';
});

resetViewButton.addEventListener('click', () => {
    camera.position.set(0, 0, 15);
    controls.target.set(0, 0, 0);
    controls.update();
});

toggleRotationButton.addEventListener('click', () => {
    isPaused = !isPaused;
    toggleRotationButton.textContent = isPaused ? 'Resume' : 'Pause';
});

// Keyboard controls for manual rotation
window.addEventListener('keydown', (e) => {
    const rotationAmount = 0.05;
    
    switch(e.key) {
        case 'ArrowLeft':
            earth.rotation.y -= rotationAmount;
            clouds.rotation.y -= rotationAmount;
            break;
        case 'ArrowRight':
            earth.rotation.y += rotationAmount;
            clouds.rotation.y += rotationAmount;
            break;
        case 'ArrowUp':
            earth.rotation.x += rotationAmount;
            clouds.rotation.x += rotationAmount;
            break;
        case 'ArrowDown':
            earth.rotation.x -= rotationAmount;
            clouds.rotation.x -= rotationAmount;
            break;
        case ' ': // Spacebar
            isPaused = !isPaused;
            toggleRotationButton.textContent = isPaused ? 'Resume' : 'Pause';
            break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (!isPaused) {
        time += 0.01 * timeScale;
        
        // Earth rotation on its axis (24 hours = 0.002 radians per frame)
        earth.rotation.y += 0.002 * earthRotationSpeed * timeScale;
        clouds.rotation.y += 0.0025 * earthRotationSpeed * timeScale;
        
        // Moon orbits around Earth (27.3 days)
        const moonOrbitRadius = 5;
        moon.position.x = Math.cos(time * 0.5 * moonOrbitSpeed) * moonOrbitRadius;
        moon.position.z = Math.sin(time * 0.5 * moonOrbitSpeed) * moonOrbitRadius;
        moon.rotation.y += 0.001 * moonOrbitSpeed * timeScale;
        
        // Sun glow pulsing effect
        sunGlow.scale.set(
            1 + Math.sin(time * 2) * 0.05,
            1 + Math.sin(time * 2) * 0.05,
            1 + Math.sin(time * 2) * 0.05
        );
        
        // Subtle star rotation
        stars.rotation.y += 0.0001 * timeScale;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
