import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/renderers/CSS2DRenderer.js';

const sunData = {
    name: 'Sun', type: 'star', originalRadius: 3, diameterKM: 1392700, color: 0xffdd88,
    wikiLink: 'https://en.wikipedia.org/wiki/Sun',
    description: "The star at the center of our Solar System. Its gravity holds the system together, and its light and heat make life possible on Earth.",
    structure: [ { name: 'Photosphere', radius: 1.0, color: '#ffeeaa', layerDescription: "Visible surface" },{ name: 'Convective Zone', radius: 0.98, color: '#ffcc66', layerDescription: "Energy transported by convection" },{ name: 'Radiative Zone', radius: 0.7, color: '#ffaa33', layerDescription: "Energy transported by radiation" },{ name: 'Core', radius: 0.25, color: '#ffffff', layerDescription: "Nuclear fusion occurs here" } ]
};

const planetData = [
    { name: 'Mercury', type: 'rocky', color: 0xaaaaaa, radius: 0.38, distance: 5, speed: 0.02, realDistanceKM: 58e6, orbitalPeriodDays: 88, diameterKM: 4880, wikiLink: 'https://en.wikipedia.org/wiki/Mercury_(planet)', moons: [], roughness: 0.9, metalness: 0.1, description: "The smallest planet in our Solar System and closest to the Sun. It has a heavily cratered surface and extreme temperature variations.", structure: [ { name: 'Crust', radius: 1.0, color: '#999999', layerDescription: "Solid silicate rock" }, { name: 'Mantle', radius: 0.8, color: '#dd8844', layerDescription: "Silicate rock" }, { name: 'Core', radius: 0.5, color: '#cccccc', layerDescription: "Likely molten Iron" } ]},
    { name: 'Venus', type: 'rocky', color: 0xffe4b5, radius: 0.95, distance: 7, speed: 0.015, realDistanceKM: 108e6, orbitalPeriodDays: 225, diameterKM: 12104, wikiLink: 'https://en.wikipedia.org/wiki/Venus', moons: [], roughness: 0.8, metalness: 0.2, description: "Similar in size and structure to Earth, but with a thick, toxic atmosphere that traps heat, making it the hottest planet.", structure: [ { name: 'Crust', radius: 1.0, color: '#d4ac88', layerDescription: "Solid silicate rock" }, { name: 'Mantle', radius: 0.85, color: '#cc6622', layerDescription: "Silicate rock" }, { name: 'Core', radius: 0.5, color: '#eeeecc', layerDescription: "Iron-Nickel alloy" } ]},
    { name: 'Earth', type: 'rocky', color: 0x4682b4, radius: 1, distance: 10, speed: 0.01, realDistanceKM: 150e6, orbitalPeriodDays: 365, diameterKM: 12756, wikiLink: 'https://en.wikipedia.org/wiki/Earth', moons: [
        { name: 'Moon', type: 'rocky', color: 0xcccccc, radius: 0.27, distance: 1.8, speed: 0.05, roughness: 0.9, metalness: 0.1, diameterKM: 3474, wikiLink: 'https://en.wikipedia.org/wiki/Moon', description: "Earth's only natural satellite. Its gravitational pull stabilizes Earth's wobble and causes tides.", structure: [ { name: 'Crust', radius: 1.0, color: '#d3d3d3', layerDescription: "Silicate rock (Anorthosite/Basalt)" },{ name: 'Mantle', radius: 0.9, color: '#a9a9a9', layerDescription: "Silicate rock" },{ name: 'Core', radius: 0.2, color: '#808080', layerDescription: "Small, dense (Iron-rich)" } ]}
    ], roughness: 0.5, metalness: 0.1, description: "Our home planet, the only place known to harbor life. It has liquid water on its surface and a protective atmosphere.", structure: [ { name: 'Crust', radius: 1.0, color: '#8c7b70', layerDescription: "Solid silicate rock (thin)" },{ name: 'Mantle', radius: 0.99, color: '#dd5522', layerDescription: "Viscous silicate rock" },{ name: 'Outer Core', radius: 0.55, color: '#ffaa00', layerDescription: "Liquid Iron-Nickel" },{ name: 'Inner Core', radius: 0.2, color: '#ffffee', layerDescription: "Solid Iron-Nickel" } ]},
    { name: 'Mars', type: 'rocky', color: 0xff4500, radius: 0.53, distance: 15, speed: 0.008, realDistanceKM: 228e6, orbitalPeriodDays: 687, diameterKM: 6792, wikiLink: 'https://en.wikipedia.org/wiki/Mars', moons: [
        { name: 'Phobos', type: 'rocky', radius: 0.1, distance: 0.8, speed: 0.08, color: 0xaaaaaa, roughness: 0.95, metalness: 0.1, diameterKM: 22, wikiLink: 'https://en.wikipedia.org/wiki/Phobos_(moon)', description: "The larger, inner moon of Mars. Likely a captured asteroid, heavily cratered.", structure: [] },
        { name: 'Deimos', type: 'rocky', radius: 0.08, distance: 1.2, speed: 0.06, color: 0xbbbbbb, roughness: 0.95, metalness: 0.1, diameterKM: 12, wikiLink: 'https://en.wikipedia.org/wiki/Deimos_(moon)', description: "The smaller, outer moon of Mars. Also likely a captured asteroid.", structure: [] }
    ], roughness: 0.9, metalness: 0.2, description: "The 'Red Planet', known for its rusty color, polar ice caps, large volcanoes, and deep canyons. Evidence suggests water flowed there in the past.", structure: [ { name: 'Crust', radius: 1.0, color: '#c1440e', layerDescription: "Solid rock (iron rich)" },{ name: 'Mantle', radius: 0.8, color: '#884422', layerDescription: "Silicate rock" },{ name: 'Core', radius: 0.45, color: '#aaaacc', layerDescription: "Partially molten Iron-Sulfide" } ]},
    { name: 'Jupiter', type: 'gas', color: 0xffdab9, radius: 4, distance: 25, speed: 0.004, realDistanceKM: 778e6, orbitalPeriodDays: 4333, diameterKM: 142984, wikiLink: 'https://en.wikipedia.org/wiki/Jupiter', moons: [
        { name: 'Io', type: 'rocky', color: 0xfffec8, radius: 0.3, distance: 5.5, speed: 0.06, roughness: 0.7, metalness: 0.1, diameterKM: 3643, wikiLink: 'https://en.wikipedia.org/wiki/Io_(moon)', description: "The most volcanically active body in the Solar System, heated by Jupiter's gravity.", structure: [ { name: 'Crust', radius: 1.0, color: '#fff8dc', layerDescription: "Sulfur / Silicate rock" },{ name: 'Mantle', radius: 0.9, color: '#f4a460', layerDescription: "Molten silicate rock" },{ name: 'Core', radius: 0.5, color: '#8b4513', layerDescription: "Iron / Iron-Sulfide" } ]},
        { name: 'Europa', type: 'icy', color: 0xd8c0a8, radius: 0.28, distance: 6.5, speed: 0.05, roughness: 0.4, metalness: 0.05, diameterKM: 3122, wikiLink: 'https://en.wikipedia.org/wiki/Europa_(moon)', description: "Smooth, icy surface likely hiding a vast subsurface ocean of liquid water.", structure: [ { name: 'Ice Crust', radius: 1.0, color: '#f0f8ff', layerDescription: "Water ice" },{ name: 'Ocean', radius: 0.9, color: '#4682b4', layerDescription: "Liquid water" },{ name: 'Mantle', radius: 0.8, color: '#a0522d', layerDescription: "Silicate rock" },{ name: 'Core', radius: 0.3, color: '#696969', layerDescription: "Iron" } ]},
        { name: 'Ganymede', type: 'icy', color: 0xbcac9b, radius: 0.45, distance: 7.8, speed: 0.04, roughness: 0.6, metalness: 0.1, diameterKM: 5268, wikiLink: 'https://en.wikipedia.org/wiki/Ganymede_(moon)', description: "The largest moon in the Solar System, larger than Mercury. Has its own magnetic field.", structure: [ { name: 'Ice Crust', radius: 1.0, color: '#dcdcdc', layerDescription: "Water ice" },{ name: 'Ocean', radius: 0.9, color: '#5f9ea0', layerDescription: "Salty liquid water" },{ name: 'Mantle', radius: 0.8, color: '#b8860b', layerDescription: "Silicate rock" },{ name: 'Core', radius: 0.4, color: '#808080', layerDescription: "Iron" } ]},
        { name: 'Callisto', type: 'icy', color: 0x9e9e9e, radius: 0.42, distance: 9.5, speed: 0.03, roughness: 0.8, metalness: 0.1, diameterKM: 4821, wikiLink: 'https://en.wikipedia.org/wiki/Callisto_(moon)', description: "Heavily cratered, ancient surface. May also have a subsurface ocean.", structure: [ { name: 'Ice Crust', radius: 1.0, color: '#b0c4de', layerDescription: "Water ice (cratered)" },{ name: 'Ocean?', radius: 0.9, color: '#778899', layerDescription: "Possible liquid water" },{ name: 'Mantle', radius: 0.8, color: '#708090', layerDescription: "Rock / Ice mixture" },{ name: 'Core', radius: 0.4, color: '#696969', layerDescription: "Rock / Ice mixture" } ]}
    ], roughness: 0.6, metalness: 0.0, description: "The largest planet in the Solar System, a gas giant composed mainly of hydrogen and helium, featuring a Great Red Spot storm.", structure: [ { name: 'Atmosphere', radius: 1.0, color: '#ffdab9', layerDescription: "Hydrogen, Helium gas" },{ name: 'Molecular Hydrogen', radius: 0.9, color: '#dcbfa6', layerDescription: "Liquid Hydrogen" },{ name: 'Metallic Hydrogen', radius: 0.7, color: '#aa9988', layerDescription: "Liquid Metallic Hydrogen" },{ name: 'Core', radius: 0.15, color: '#777799', layerDescription: "Dense Rock/Ice mixture" } ]},
    { name: 'Saturn', type: 'gas', color: 0xf4a460, radius: 3.5, distance: 35, speed: 0.003, realDistanceKM: 1427e6, orbitalPeriodDays: 10759, diameterKM: 120536, wikiLink: 'https://en.wikipedia.org/wiki/Saturn', hasRing: true, moons: [], roughness: 0.7, metalness: 0.0, description: "Famous for its stunning and complex ring system made of ice and rock particles. It's another gas giant, mostly hydrogen and helium.", structure: [ { name: 'Atmosphere', radius: 1.0, color: '#f4a460', layerDescription: "Hydrogen, Helium gas" },{ name: 'Molecular Hydrogen', radius: 0.9, color: '#d8b080', layerDescription: "Liquid Hydrogen" },{ name: 'Metallic Hydrogen', radius: 0.6, color: '#aa8866', layerDescription: "Liquid Metallic Hydrogen" },{ name: 'Core', radius: 0.15, color: '#8888aa', layerDescription: "Dense Rock/Ice mixture" } ]},
    { name: 'Uranus', type: 'ice', color: 0xadd8e6, radius: 2, distance: 45, speed: 0.002, realDistanceKM: 2871e6, orbitalPeriodDays: 30687, diameterKM: 51118, wikiLink: 'https://en.wikipedia.org/wiki/Uranus', moons: [], roughness: 0.7, metalness: 0.1, description: "An ice giant with a blue-green hue due to methane. It rotates on its side, possibly due to a past collision.", structure: [ { name: 'Atmosphere', radius: 1.0, color: '#add8e6', layerDescription: "Hydrogen, Helium, Methane gas" },{ name: 'Mantle', radius: 0.8, color: '#88aacc', layerDescription: "Water, Ammonia, Methane ices" },{ name: 'Core', radius: 0.2, color: '#aaaaaa', layerDescription: "Silicate Rock/Ice" } ]},
    { name: 'Neptune', type: 'ice', color: 0x4169e1, radius: 1.9, distance: 55, speed: 0.001, realDistanceKM: 4498e6, orbitalPeriodDays: 60190, diameterKM: 49528, wikiLink: 'https://en.wikipedia.org/wiki/Neptune', moons: [], roughness: 0.6, metalness: 0.1, description: "The farthest planet from the Sun, a dark, cold ice giant with strong winds and a dynamic atmosphere.", structure: [ { name: 'Atmosphere', radius: 1.0, color: '#4169e1', layerDescription: "Hydrogen, Helium, Methane gas" },{ name: 'Mantle', radius: 0.75, color: '#5577bb', layerDescription: "Water, Ammonia, Methane ices" },{ name: 'Core', radius: 0.25, color: '#bbbbbb', layerDescription: "Silicate Rock/Ice" } ]}
];

let scene, camera, webglRenderer, css2DRenderer, controls;
let sun, sunLabelObject, sunGlow;
let planets = [];
let moons = [];
let orbits = [], orbitInfoLabels = [];
let clickableObjects = [];
let raycaster, mouse;
let animationSpeedMultiplier = 0.2;
let sizeMultiplier = 1.2;
let currentDistanceUnit = 'km';
const KM_PER_LIGHT_YEAR = 9.461e12;
const SVG_NS = "http://www.w3.org/2000/svg";
let currentComparisonBody = null;
let allCelestialBodies = [];

let isNavigating = false;
let navigationTargetPos = new THREE.Vector3();
let navigationControlsTarget = new THREE.Vector3();

let sizeSlider, sizeValueSpan, speedSlider, speedValueSpan;
let compareSizeBtn, comparisonPanel, compareSelect, closeComparisonBtn;
let comparisonDisplay, compareBody1Name, compareItem1, compareItem2;
let planetNavSelect, moonNavSelect;

function formatDistanceKM(km) { if (km >= 1e9) { return (km / 1e9).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' billion km'; } else { return (km / 1e6).toLocaleString() + ' million km'; } }
function formatDistanceLY(km) { const ly = km / KM_PER_LIGHT_YEAR; return ly.toFixed(6) + ' ly'; }
function getFormattedDistance(km) { if (typeof km !== 'number' || isNaN(km)) { console.error("Invalid distance value received:", km); return "Invalid Distance"; } return currentDistanceUnit === 'km' ? formatDistanceKM(km) : formatDistanceLY(km); }
function formatDiameterKM(km) { if (typeof km !== 'number' || isNaN(km)) { return "N/A"; } return km.toLocaleString() + ' km'; }
function generateGlowTexture() { const canvas = document.createElement('canvas'); canvas.width = 128; canvas.height = 128; const context = canvas.getContext('2d'); const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 ); gradient.addColorStop(0.1, 'rgba(255, 220, 170, 1)'); gradient.addColorStop(0.4, 'rgba(255, 180, 100, 0.6)'); gradient.addColorStop(1, 'rgba(255, 150, 0, 0)'); context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height); return new THREE.CanvasTexture(canvas); }
function formatOrbitalPeriod(days) { if (days < 365 * 2) { return days.toLocaleString() + ' days'; } else { const years = days / 365.25; return years.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' years'; } }

function createRockyTexture(baseColorHex, detailColorHex, size = 256) {
    const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size; const context = canvas.getContext('2d');
    context.fillStyle = `#${baseColorHex.toString(16).padStart(6, '0')}`; context.fillRect(0, 0, size, size);
    context.fillStyle = `#${detailColorHex.toString(16).padStart(6, '0')}`; for (let i = 0; i < size * size * 0.1; i++) { const x = Math.random() * size; const y = Math.random() * size; const speckleSize = Math.random() * 2 + 1; context.fillRect(x, y, speckleSize, speckleSize); }
    const texture = new THREE.CanvasTexture(canvas); texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping; texture.needsUpdate = true; return texture;
}

function createGasGiantTexture(colorsHex, size = 256) {
    const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size; const context = canvas.getContext('2d');
    const numBands = colorsHex.length; const bandHeight = size / numBands;
    for (let i = 0; i < numBands; i++) { context.fillStyle = `#${colorsHex[i].toString(16).padStart(6, '0')}`; context.fillRect(0, i * bandHeight, size, bandHeight); }
    context.fillStyle = 'rgba(0, 0, 0, 0.05)'; for(let i=0; i<size * 0.1; i++) { context.fillRect(Math.random() * size, 0, Math.random() * 2 + 1, size); }
    context.fillStyle = 'rgba(255, 255, 255, 0.05)'; for(let i=0; i<size * 0.1; i++) { context.fillRect(Math.random() * size, 0, Math.random() * 2 + 1, size); }
    const texture = new THREE.CanvasTexture(canvas); texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping; texture.needsUpdate = true; return texture;
}

function getAllCelestialBodies() {
    const bodies = [sunData];
    planetData.forEach(planet => {
        bodies.push({...planet, color: planet.color || 0x888888 });
        if (planet.moons && planet.moons.length > 0) {
            planet.moons.forEach(moon => {
                bodies.push({...moon, color: moon.color || 0x888888 });
            });
        }
    });
    return bodies.filter(body => body && typeof body.diameterKM === 'number');
}

function init() {
    scene = new THREE.Scene();
    const starGeometry = new THREE.BufferGeometry(); const starVertices = []; for (let i = 0; i < 10000; i++) { const x = THREE.MathUtils.randFloatSpread(2000); const y = THREE.MathUtils.randFloatSpread(2000); const z = THREE.MathUtils.randFloatSpread(2000); const d = Math.sqrt(x*x + y*y + z*z); if (d > 500) { starVertices.push(x, y, z); } } starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3)); const starMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.5, sizeAttenuation: true }); const stars = new THREE.Points(starGeometry, starMaterial); scene.add(stars);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 35, 65);

    webglRenderer = new THREE.WebGLRenderer({ antialias: true });
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container').appendChild(webglRenderer.domElement);

    css2DRenderer = new CSS2DRenderer();
    css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    css2DRenderer.domElement.style.position = 'absolute';
    css2DRenderer.domElement.style.top = '0px';
    css2DRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('labels').appendChild(css2DRenderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x606060); scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 4, 600); scene.add(pointLight);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    sizeSlider = document.getElementById('size-slider');
    sizeValueSpan = document.getElementById('size-value');
    speedSlider = document.getElementById('speed-slider');
    speedValueSpan = document.getElementById('speed-value');
    compareSizeBtn = document.getElementById('compare-size-btn');
    comparisonPanel = document.getElementById('comparison-panel');
    compareSelect = document.getElementById('compare-select');
    closeComparisonBtn = document.getElementById('close-comparison-btn');
    comparisonDisplay = document.getElementById('comparison-display');
    compareBody1Name = document.getElementById('compare-body1-name');
    compareItem1 = document.getElementById('compare-item-1');
    compareItem2 = document.getElementById('compare-item-2');
    planetNavSelect = document.getElementById('planet-nav-select');
    moonNavSelect = document.getElementById('moon-nav-select');

    allCelestialBodies = getAllCelestialBodies();

    createSolarSystem();
    populateNavDropdowns();

    controls = new OrbitControls(camera, webglRenderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.minDistance = 5; controls.maxDistance = 300;
    controls.target.set(0, 0, 0);

    window.addEventListener('resize', onWindowResize, false);
    webglRenderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);

    sizeSlider.addEventListener('input', onSizeSliderChange);
    speedSlider.addEventListener('input', onSpeedSliderChange);

    document.getElementById('info-close').addEventListener('click', hideInfoCard);
    document.getElementById('unit-toggle').addEventListener('click', toggleDistanceUnits);
    compareSizeBtn.addEventListener('click', showComparisonPanel);
    closeComparisonBtn.addEventListener('click', hideComparisonPanel);
    compareSelect.addEventListener('change', updateComparisonDisplay);
    planetNavSelect.addEventListener('change', handleNavSelect);
    moonNavSelect.addEventListener('change', handleNavSelect);

    updateCelestialBodySizes();
}

function createSolarSystem() {
    const sunGeometry = new THREE.SphereGeometry(sunData.originalRadius, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd88 });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = sunData;
    clickableObjects.push(sun);

    const spriteMaterial = new THREE.SpriteMaterial({ map: generateGlowTexture(), color: 0xffddaa, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    sunGlow = new THREE.Sprite(spriteMaterial);
    sun.add(sunGlow);
    scene.add(sun);

    const sunDiv = document.createElement('div'); sunDiv.className = 'label'; sunDiv.textContent = 'Sun'; sunDiv.style.pointerEvents = 'auto'; sunDiv.addEventListener('click', (event) => { event.stopPropagation(); showInfoCard(sunData); }); sunLabelObject = new CSS2DObject(sunDiv); sun.add(sunLabelObject);

    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa, opacity: 0.4, transparent: true });

    planetData.forEach(data => {
        const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
        let planetTexture;
        if (data.type === 'rocky') { const detailColor = new THREE.Color(data.color).multiplyScalar(0.6).getHex(); planetTexture = createRockyTexture(data.color, detailColor); }
        else if (data.type === 'gas') { const color1 = data.color; const color2 = new THREE.Color(data.color).multiplyScalar(0.8).getHex(); const color3 = new THREE.Color(data.color).multiplyScalar(1.1).getHex(); planetTexture = createGasGiantTexture([color1, color2, color1, color3, color2]); }
        else if (data.type === 'ice') { const color1 = data.color; const color2 = new THREE.Color(data.color).offsetHSL(0, 0.1, -0.1).getHex(); const color3 = new THREE.Color(data.color).offsetHSL(0, -0.05, 0.05).getHex(); planetTexture = createGasGiantTexture([color1, color2, color3, color2]); }
        else { const detailColor = new THREE.Color(data.color).multiplyScalar(0.6).getHex(); planetTexture = createRockyTexture(data.color, detailColor); }

        const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture, roughness: data.roughness, metalness: data.metalness });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        const pivot = new THREE.Object3D(); scene.add(pivot); pivot.add(planet); planet.position.x = data.distance;
        planet.userData = { ...data, type: 'planet' };
        clickableObjects.push(planet);

        const planetDiv = document.createElement('div'); planetDiv.className = 'label'; planetDiv.textContent = `${data.name}`; planetDiv.style.pointerEvents = 'auto'; planetDiv.addEventListener('click', (event) => { event.stopPropagation(); showInfoCard(planet.userData); }); const planetLabel = new CSS2DObject(planetDiv); planet.add(planetLabel);
        planets.push({ mesh: planet, pivot: pivot, speed: data.speed, label: planetLabel, originalRadius: data.radius });

        const orbitCurve = new THREE.EllipseCurve(0, 0, data.distance, data.distance, 0, 2 * Math.PI, false, 0); const points = orbitCurve.getPoints(100); const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points); const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial); orbitLine.rotation.x = Math.PI / 2; scene.add(orbitLine); orbits.push(orbitLine);

        const orbitInfoDiv = document.createElement('div'); orbitInfoDiv.className = 'label orbit-label'; orbitInfoDiv.textContent = `~${getFormattedDistance(data.realDistanceKM)} / ${formatOrbitalPeriod(data.orbitalPeriodDays)}`; orbitInfoDiv.style.pointerEvents = 'none'; const orbitInfoLabel = new CSS2DObject(orbitInfoDiv); orbitInfoLabel.position.set(data.distance, 0, 0); orbitInfoLabel.userData = { distanceKM: data.realDistanceKM, periodDays: data.orbitalPeriodDays }; scene.add(orbitInfoLabel); orbitInfoLabels.push(orbitInfoLabel);

        if (data.hasRing) {
            const ringGeometry = new THREE.RingGeometry(data.radius * 1.2, data.radius * 1.8, 64); const pos = ringGeometry.attributes.position; const v3 = new THREE.Vector3(); for (let i = 0; i < pos.count; i++){ v3.fromBufferAttribute(pos, i); ringGeometry.attributes.position.setXYZ(i, v3.x, 0 , v3.y); } ringGeometry.attributes.position.needsUpdate = true; const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xaaa666, side: THREE.DoubleSide, opacity: 0.6, transparent: true, depthWrite: false, roughness: 0.8, metalness: 0.1 }); const ring = new THREE.Mesh(ringGeometry, ringMaterial); ring.rotation.x = -Math.PI * 0.4; ring.rotation.y = Math.PI * 0.1; planet.add(ring);
        }

        (data.moons || []).forEach(moonData => {
            const moonGeometry = new THREE.SphereGeometry(moonData.radius, 16, 16);
            let moonTexture;
            if (moonData.type === 'icy') { const detailColor = new THREE.Color(moonData.color).multiplyScalar(0.7).getHex(); moonTexture = createRockyTexture(moonData.color, detailColor, 128); }
            else { const detailColor = new THREE.Color(moonData.color).multiplyScalar(0.6).getHex(); moonTexture = createRockyTexture(moonData.color, detailColor, 128); }
            const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture, roughness: moonData.roughness, metalness: moonData.metalness });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            const moonPivot = new THREE.Object3D(); planet.add(moonPivot); moonPivot.add(moon); moon.position.x = moonData.distance;
            moon.userData = { ...moonData, type: 'moon', parentPlanet: data.name };
            clickableObjects.push(moon);
            const moonDiv = document.createElement('div'); moonDiv.className = 'label moon-label'; moonDiv.textContent = moonData.name; moonDiv.style.pointerEvents = 'auto'; moonDiv.addEventListener('click', (event) => { event.stopPropagation(); showInfoCard(moon.userData); }); const moonLabel = new CSS2DObject(moonDiv); moon.add(moonLabel);
            moons.push({ mesh: moon, pivot: moonPivot, speed: moonData.speed, label: moonLabel, originalRadius: moonData.radius, parentPlanetMesh: planet });
        });
    });
    updateCelestialBodySizes();
}

function populateNavDropdowns() {
    planetData.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet.name;
        option.textContent = planet.name;
        planetNavSelect.appendChild(option);
    });

    planetData.forEach(planet => {
        if (planet.moons && planet.moons.length > 0) {
            planet.moons.forEach(moon => {
                const option = document.createElement('option');
                option.value = moon.name;
                option.textContent = moon.name;
                moonNavSelect.appendChild(option);
            });
        }
    });
}

function updateCelestialBodySizes() {
    if (sun && sunLabelObject && sunGlow) { sun.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier); sunGlow.scale.set(10 * sizeMultiplier, 10 * sizeMultiplier, 1); sunLabelObject.position.set(0, sunData.originalRadius * sizeMultiplier * 1.4, 0); }
    planets.forEach(p => { p.mesh.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier); p.label.position.set(0, p.originalRadius * sizeMultiplier * 1.6, 0); });
    moons.forEach(m => { m.mesh.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier); const baseOffsetY = 0.1; m.label.position.set(0, (m.originalRadius * 1.8 * sizeMultiplier) + baseOffsetY, 0); });
}

function showInfoCard(data) {
    if (!data || !data.name || !data.description) { console.error("Invalid data passed to showInfoCard:", data); return; }
    currentComparisonBody = data;

    const infoCard = document.getElementById('info-card');
    const diagramContainer = document.getElementById('structure-diagram');
    const layersListContainer = document.getElementById('info-layers');
    const sizeP = document.getElementById('info-size');
    const descriptionP = document.getElementById('info-description');
    const structureNote = document.getElementById('info-structure-note');

    document.getElementById('info-title').textContent = data.name;

    let descriptionHTML = data.description;
    if (data.wikiLink) {
        descriptionHTML += ` <a href="${data.wikiLink}" target="_blank" rel="noopener noreferrer">(Read more on Wikipedia)</a>`;
    }
    descriptionP.innerHTML = descriptionHTML;

    if (data.diameterKM) {
        sizeP.textContent = `Equatorial Diameter: ~${formatDiameterKM(data.diameterKM)}`;
        sizeP.style.display = 'block';
        compareSizeBtn.style.display = 'block';
    } else {
        sizeP.style.display = 'none';
        compareSizeBtn.style.display = 'none';
    }

    diagramContainer.innerHTML = '';
    layersListContainer.innerHTML = '<h3>Layers (Outermost to Innermost):</h3>';

    if (data.structure && data.structure.length > 0) {
        diagramContainer.style.display = 'block';
        layersListContainer.style.display = 'block';
        structureNote.style.display = 'block';

        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("viewBox", "-1.05 -1.05 2.1 2.1");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        diagramContainer.appendChild(svg);

        data.structure.forEach((layer) => {
            const radius = layer.radius;
            const circle = document.createElementNS(SVG_NS, "circle");
            circle.setAttribute("cx", "0");
            circle.setAttribute("cy", "0");
            circle.setAttribute("r", radius.toString());
            circle.setAttribute("fill", layer.color);
            circle.setAttribute("stroke", "rgba(0,0,0,0.3)");
            circle.setAttribute("stroke-width", "0.01");

            const title = document.createElementNS(SVG_NS, "title");
            title.textContent = `${layer.name}: ${layer.layerDescription || ''}`;
            circle.appendChild(title);

            svg.appendChild(circle);
        });

        data.structure.forEach((layer) => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${layer.name}:</strong> ${layer.layerDescription || ''}`;
            layersListContainer.appendChild(p);
        });
    } else {
        diagramContainer.style.display = 'none';
        layersListContainer.style.display = 'none';
        structureNote.style.display = 'none';
    }
    infoCard.style.display = 'flex';
}

function hideInfoCard() {
    document.getElementById('info-card').style.display = 'none';
    currentComparisonBody = null;
}

function toggleDistanceUnits() {
    currentDistanceUnit = (currentDistanceUnit === 'km') ? 'ly' : 'km';
    const button = document.getElementById('unit-toggle');
    button.textContent = (currentDistanceUnit === 'km') ? 'Show Light-Years' : 'Show Kilometers';
    orbitInfoLabels.forEach(label => {
        if (label.userData) {
            const distKM = label.userData.distanceKM;
            const periodDays = label.userData.periodDays;
            label.element.textContent = `~${getFormattedDistance(distKM)} / ${formatOrbitalPeriod(periodDays)}`;
        }
    });
}

function showComparisonPanel() {
    if (!currentComparisonBody || typeof currentComparisonBody.diameterKM !== 'number') return;

    compareSelect.innerHTML = '';
    allCelestialBodies.forEach(body => {
        const option = document.createElement('option');
        option.value = body.name;
        option.textContent = body.name;
        compareSelect.appendChild(option);
    });

    let defaultCompare = allCelestialBodies.find(b => b.name === 'Earth');
    if (!defaultCompare || defaultCompare.name === currentComparisonBody.name) {
        defaultCompare = allCelestialBodies.find(b => b.type === 'planet' && b.name !== currentComparisonBody.name);
    }
    if (!defaultCompare) defaultCompare = allCelestialBodies.find(b => b.name !== currentComparisonBody.name);
    compareSelect.value = defaultCompare ? defaultCompare.name : '';

    compareBody1Name.textContent = currentComparisonBody.name;
    comparisonPanel.style.display = 'flex';
    updateComparisonDisplay();
}

function hideComparisonPanel() {
    comparisonPanel.style.display = 'none';
}

function updateComparisonDisplay() {
    if (!currentComparisonBody) return;

    const selectedName = compareSelect.value;
    const body2 = allCelestialBodies.find(b => b.name === selectedName);

    if (!body2) return;

    const body1 = currentComparisonBody;

    const diam1 = body1.diameterKM;
    const diam2 = body2.diameterKM;

    const maxDiam = Math.max(diam1, diam2);
    let r1, r2;
    const minSvgRadius = 0.05;

    if (diam1 >= diam2) {
        r1 = 1.0;
        r2 = diam2 / diam1;
        if (r2 < minSvgRadius) {
            r2 = minSvgRadius;
        }
    } else {
        r2 = 1.0;
        r1 = diam1 / diam2;
        if (r1 < minSvgRadius) {
            r1 = minSvgRadius;
        }
    }

    const circle1 = compareItem1.querySelector('svg circle');
    circle1.setAttribute('r', r1.toString());
    const color1 = body1.color || 0x888888;
    circle1.setAttribute('fill', `#${color1.toString(16).padStart(6,'0')}`);
    compareItem1.querySelector('.name').textContent = body1.name;
    compareItem1.querySelector('.diameter').textContent = `~${formatDiameterKM(diam1)}`;

    const circle2 = compareItem2.querySelector('svg circle');
    circle2.setAttribute('r', r2.toString());
    const color2 = body2.color || 0x888888;
    circle2.setAttribute('fill', `#${color2.toString(16).padStart(6,'0')}`);
    compareItem2.querySelector('.name').textContent = body2.name;
    compareItem2.querySelector('.diameter').textContent = `~${formatDiameterKM(diam2)}`;
}

function handleNavSelect(event) {
    const selectedName = event.target.value;
    if (selectedName) {
        if (event.target.id === 'planet-nav-select') {
            moonNavSelect.value = '';
        } else {
            planetNavSelect.value = '';
        }
        navigateToBody(selectedName);
    }
}

function navigateToBody(bodyName) {
    let targetMesh = null;
    let bodyData = null;
    let parentMesh = null;

    if (bodyName === 'Sun') {
        targetMesh = sun;
        bodyData = sunData;
    } else {
        const planetInfo = planets.find(p => p.mesh.userData.name === bodyName);
        if (planetInfo) {
            targetMesh = planetInfo.mesh;
            bodyData = planetInfo.mesh.userData;
            parentMesh = sun;
        } else {
            const moonInfo = moons.find(m => m.mesh.userData.name === bodyName);
            if (moonInfo) {
                targetMesh = moonInfo.mesh;
                bodyData = moonInfo.mesh.userData;
                parentMesh = moonInfo.parentPlanetMesh;
            }
        }
    }

    if (!targetMesh || !bodyData) {
        console.error("Could not find target body:", bodyName);
        return;
    }

    const targetWorldPos = new THREE.Vector3();
    targetMesh.getWorldPosition(targetWorldPos);

    navigationControlsTarget.copy(targetWorldPos);

    let effectiveRadius = bodyData.originalRadius || 1;
    if (bodyData.type === 'star') effectiveRadius = sunData.originalRadius;
    effectiveRadius *= sizeMultiplier;

    const offsetDistance = Math.max(5, effectiveRadius * 8);

    let direction = new THREE.Vector3();
    if (bodyData.type === 'star') {
        direction.set(0, 0.5, 1).normalize();
    } else {
        const parentWorldPos = new THREE.Vector3();
        if (parentMesh) {
            parentMesh.getWorldPosition(parentWorldPos);
            direction.subVectors(targetWorldPos, parentWorldPos).normalize();
        } else {
            direction.copy(targetWorldPos).normalize();
        }
    }

    navigationTargetPos.copy(targetWorldPos).add(direction.multiplyScalar(offsetDistance));
    navigationTargetPos.y += offsetDistance * 0.2;

    isNavigating = true;

    showInfoCard(bodyData);
}

function onWindowResize() { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); webglRenderer.setSize(window.innerWidth, window.innerHeight); css2DRenderer.setSize(window.innerWidth, window.innerHeight); }

function onDocumentMouseDown(event) {
    if (event.target !== webglRenderer.domElement) { return; }
    isNavigating = false;
    event.preventDefault(); mouse.x = (event.clientX / window.innerWidth) * 2 - 1; mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; raycaster.setFromCamera(mouse, camera);
    try {
        const intersects = raycaster.intersectObjects(clickableObjects, true);
        if (intersects.length > 0) {
            let clickedObject = intersects[0].object;
            while (clickedObject && !(clickedObject.userData && clickedObject.userData.type)) { clickedObject = clickedObject.parent; }
            if (clickedObject && clickedObject.userData && (clickedObject.userData.type === 'planet' || clickedObject.userData.type === 'moon' || clickedObject.userData.type === 'star')) {
                if (comparisonPanel.style.display === 'flex') {
                    hideComparisonPanel();
                }
                showInfoCard(clickedObject.userData);

            }
        } else { }
    } catch (error) { console.error("Error during raycasting:", error); }
}

function onSizeSliderChange(event) { sizeMultiplier = parseFloat(event.target.value); sizeValueSpan.textContent = `${sizeMultiplier.toFixed(1)}x`; updateCelestialBodySizes(); }
function onSpeedSliderChange(event) { animationSpeedMultiplier = parseFloat(event.target.value); speedValueSpan.textContent = `${animationSpeedMultiplier.toFixed(1)}x`; }

function animate() {
    requestAnimationFrame(animate); const delta = 0.01;

    if (isNavigating) {
        const lerpFactor = 0.05;
        camera.position.lerp(navigationTargetPos, lerpFactor);
        controls.target.lerp(navigationControlsTarget, lerpFactor);
        controls.update();

        if (camera.position.distanceTo(navigationTargetPos) < 0.5 && controls.target.distanceTo(navigationControlsTarget) < 0.1) {
            isNavigating = false;
            camera.position.copy(navigationTargetPos);
            controls.target.copy(navigationControlsTarget);
            controls.update();
        }
    } else {
        controls.update();
    }

    if (sun) sun.rotation.y += delta * 0.1 * animationSpeedMultiplier;
    planets.forEach(p => { p.pivot.rotation.y += p.speed * delta * 60 * animationSpeedMultiplier; p.mesh.rotation.y += delta * 1.0 * animationSpeedMultiplier; });
    moons.forEach(m => { m.pivot.rotation.y += m.speed * delta * 60 * animationSpeedMultiplier; m.mesh.rotation.y += delta * 1.5 * animationSpeedMultiplier; });

    webglRenderer.render(scene, camera);
    css2DRenderer.render(scene, camera);
}

window.onload = () => { init(); animate(); };
