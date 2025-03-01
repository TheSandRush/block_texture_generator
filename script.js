<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minecraft Texture Generator</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #2c3e50;
            color: #ecf0f1;
        }
        
        #container {
            display: flex;
            height: 100vh;
        }
        
        #canvas-container {
            flex: 3;
            position: relative;
        }
        
        #controls {
            flex: 1;
            padding: 20px;
            background-color: #34495e;
            overflow-y: auto;
            border-left: 2px solid #1c2833;
            min-width: 250px;
        }
        
        #preview-container {
            margin-top: 20px;
            text-align: center;
        }
        
        canvas {
            display: block;
        }
        
        h1, h2 {
            color: #3498db;
            margin-top: 0;
        }
        
        .control-group {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #445566;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        select, input[type="range"], input[type="number"], input[type="color"] {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #7f8c8d;
            background-color: #ecf0f1;
        }
        
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #2980b9;
        }
        
        #texture-preview {
            max-width: 100%;
            border: 2px solid #3498db;
            background-color: #1c2833;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }
        
        #export-container {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #445566;
        }
        
        .slider-container {
            display: flex;
            align-items: center;
        }
        
        .slider-container input[type="range"] {
            flex: 4;
        }
        
        .slider-container input[type="number"] {
            flex: 1;
            margin-left: 10px;
            width: 60px;
        }
        
        .presets {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-bottom: 15px;
        }
        
        .preset-btn {
            flex: 1 0 calc(33% - 5px);
            min-width: 70px;
            padding: 8px 5px;
            font-size: 0.9em;
        }
        
        .color-picker-container {
            display: flex;
            align-items: center;
        }
        
        .color-picker-container input[type="color"] {
            width: 50px;
            height: 30px;
        }
        
        .color-picker-container input[type="text"] {
            flex: 1;
            margin-left: 10px;
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #7f8c8d;
            background-color: #ecf0f1;
        }
        
        .tooltip {
            position: relative;
            display: inline-block;
            cursor: help;
            margin-left: 5px;
        }
        
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: #1c2833;
            color: #ecf0f1;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
            font-weight: normal;
            font-size: 0.9em;
        }
        
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
        
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .spinner {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #rotation-toggle {
            position: absolute;
            bottom: 20px;
            left: 20px;
            z-index: 10;
            background-color: rgba(52, 73, 94, 0.7);
        }
        
        /* Download modal styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1001;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.7);
        }
        
        .modal-content {
            background-color: #34495e;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #1c2833;
            border-radius: 6px;
            width: 80%;
            max-width: 600px;
        }
        
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
            color: #fff;
            text-decoration: none;
            cursor: pointer;
        }
        
        #download-image {
            max-width: 100%;
            border: 2px solid #3498db;
            margin: 15px 0;
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }
    </style>
</head>
<body>
    <div id="loading-screen">
        <div class="spinner"></div>
    </div>
    
    <div id="container">
        <div id="canvas-container">
            <button id="rotation-toggle">Pause Rotation</button>
        </div>
        <div id="controls">
            <h1>Minecraft Texture Generator</h1>
            
            <div class="control-group">
                <h2>Presets</h2>
                <div class="presets">
                    <button class="preset-btn" data-preset="stone">Stone</button>
                    <button class="preset-btn" data-preset="dirt">Dirt</button>
                    <button class="preset-btn" data-preset="wood">Wood</button>
                    <button class="preset-btn" data-preset="grass">Grass</button>
                    <button class="preset-btn" data-preset="sand">Sand</button>
                    <button class="preset-btn" data-preset="brick">Brick</button>
                </div>
            </div>
            
            <div class="control-group">
                <h2>Material</h2>
                <label for="material-type">Material Type</label>
                <select id="material-type">
                    <option value="stone">Stone</option>
                    <option value="dirt">Dirt</option>
                    <option value="wood">Wood</option>
                    <option value="metal">Metal</option>
                    <option value="brick">Brick</option>
                    <option value="sand">Sand</option>
                </select>
                
                <div class="color-picker-container">
                    <label for="base-color">Base Color</label>
                    <input type="color" id="base-color" value="#8c8c8c">
                    <input type="text" id="base-color-hex" value="#8c8c8c">
                </div>
                
                <div class="color-picker-container">
                    <label for="accent-color">Accent Color</label>
                    <input type="color" id="accent-color" value="#6e6e6e">
                    <input type="text" id="accent-color-hex" value="#6e6e6e">
                </div>
            </div>
            
            <div class="control-group">
                <h2>Details</h2>
                
                <label for="noise-scale">Noise Scale 
                    <span class="tooltip">?
                        <span class="tooltiptext">Controls size of texture details</span>
                    </span>
                </label>
                <div class="slider-container">
                    <input type="range" id="noise-scale" min="1" max="16" value="4" step="1">
                    <input type="number" id="noise-scale-value" min="1" max="16" value="4">
                </div>
                
                <label for="noise-strength">Noise Strength 
                    <span class="tooltip">?
                        <span class="tooltiptext">Controls intensity of texture details</span>
                    </span>
                </label>
                <div class="slider-container">
                    <input type="range" id="noise-strength" min="1" max="100" value="30" step="1">
                    <input type="number" id="noise-strength-value" min="1" max="100" value="30">
                </div>
                
                <label for="pattern-type">Pattern Type</label>
                <select id="pattern-type">
                    <option value="noise">Noise</option>
                    <option value="cracked">Cracked</option>
                    <option value="checker">Checker</option>
                    <option value="striped">Striped</option>
                    <option value="zigzag">Zigzag</option>
                </select>
                
                <label for="edge-darkness">Edge Darkness 
                    <span class="tooltip">?
                        <span class="tooltiptext">Controls darkness of edges for 3D effect</span>
                    </span>
                </label>
                <div class="slider-container">
                    <input type="range" id="edge-darkness" min="0" max="100" value="40" step="1">
                    <input type="number" id="edge-darkness-value" min="0" max="100" value="40">
                </div>
            </div>
            
            <div class="control-group">
                <h2>3D Effect</h2>
                
                <label for="depth">Depth Effect 
                    <span class="tooltip">?
                        <span class="tooltiptext">Controls how 3D the texture appears</span>
                    </span>
                </label>
                <div class="slider-container">
                    <input type="range" id="depth" min="0" max="100" value="30" step="1">
                    <input type="number" id="depth-value" min="0" max="100" value="30">
                </div>
                
                <label for="bevel">Edge Bevel 
                    <span class="tooltip">?
                        <span class="tooltiptext">Controls the appearance of edges</span>
                    </span>
                </label>
                <div class="slider-container">
                    <input type="range" id="bevel" min="0" max="100" value="20" step="1">
                    <input type="number" id="bevel-value" min="0" max="100" value="20">
                </div>
            </div>
            
            <div id="preview-container">
                <h2>Texture Preview</h2>
                <canvas id="texture-preview" width="128" height="128"></canvas>
            </div>
            
            <div id="export-container">
                <button id="randomize">Randomize</button>
                <button id="generate">Regenerate</button>
                <button id="export-texture">Export Texture</button>
            </div>
        </div>
    </div>
    
    <!-- Export Modal -->
    <div id="export-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Export Texture</h2>
            <p>Right-click on the image below and select "Save image as..." to download your texture map.</p>
            <img id="download-image" alt="Texture Map">
            <button id="download-button">Download Texture</button>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"></script>
    <script>
        // Initialize Three.js scene
        let scene, camera, renderer, cube, textureSize = 32;
        let previewCanvas, previewCtx;
        let isRotating = true;
        let textures = {};
        let simplex = new SimplexNoise();
        
        // Material presets
        const presets = {
            stone: {
                materialType: 'stone',
                baseColor: '#8c8c8c',
                accentColor: '#6e6e6e',
                noiseScale: 4,
                noiseStrength: 30,
                patternType: 'noise',
                edgeDarkness: 40,
                depth: 30,
                bevel: 20
            },
            dirt: {
                materialType: 'dirt',
                baseColor: '#8b5a2b',
                accentColor: '#654321',
                noiseScale: 6,
                noiseStrength: 50,
                patternType: 'noise',
                edgeDarkness: 30,
                depth: 40,
                bevel: 10
            },
            wood: {
                materialType: 'wood',
                baseColor: '#b5651d',
                accentColor: '#8b4513',
                noiseScale: 3,
                noiseStrength: 40,
                patternType: 'striped',
                edgeDarkness: 35,
                depth: 45,
                bevel: 15
            },
            grass: {
                materialType: 'dirt',
                baseColor: '#5d8a4a',
                accentColor: '#3b5b2e',
                noiseScale: 5,
                noiseStrength: 45,
                patternType: 'noise',
                edgeDarkness: 25,
                depth: 35,
                bevel: 10
            },
            sand: {
                materialType: 'sand',
                baseColor: '#d2b48c',
                accentColor: '#c2a278',
                noiseScale: 7,
                noiseStrength: 25,
                patternType: 'noise',
                edgeDarkness: 20,
                depth: 20,
                bevel: 5
            },
            brick: {
                materialType: 'brick',
                baseColor: '#b73a3a',
                accentColor: '#772222',
                noiseScale: 2,
                noiseStrength: 20,
                patternType: 'cracked',
                edgeDarkness: 50,
                depth: 60,
                bevel: 30
            }
        };
        
        function init() {
            // Set up scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x2c3e50);
            
            // Set up camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 3;
            
            // Set up renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
            document.getElementById('canvas-container').appendChild(renderer.domElement);
            
            // Set up preview canvas
            previewCanvas = document.getElementById('texture-preview');
            previewCtx = previewCanvas.getContext('2d');
            
            // Create initial textures
            createTextures();
            
            // Create cube
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const materials = [
                new THREE.MeshBasicMaterial({ map: textures.right }),
                new THREE.MeshBasicMaterial({ map: textures.left }),
                new THREE.MeshBasicMaterial({ map: textures.top }),
                new THREE.MeshBasicMaterial({ map: textures.bottom }),
                new THREE.MeshBasicMaterial({ map: textures.front }),
                new THREE.MeshBasicMaterial({ map: textures.back })
            ];
            
            cube = new THREE.Mesh(geometry, materials);
            scene.add(cube);
            
            // Event listeners
            window.addEventListener('resize', onWindowResize);
            document.getElementById('generate').addEventListener('click', updateTextures);
            document.getElementById('randomize').addEventListener('click', randomizeSettings);
            document.getElementById('export-texture').addEventListener('click', exportTexture);
            document.getElementById('rotation-toggle').addEventListener('click', toggleRotation);
            
            // Add event listeners for all input controls
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (input.type === 'range') {
                    input.addEventListener('input', function() {
                        document.getElementById(this.id + '-value').value = this.value;
                    });
                    
                    const numberInput = document.getElementById(input.id + '-value');
                    if (numberInput) {
                        numberInput.addEventListener('input', function() {
                            document.getElementById(input.id).value = this.value;
                        });
                    }
                }
                
                if (input.type === 'color') {
                    input.addEventListener('input', function() {
                        document.getElementById(this.id + '-hex').value = this.value;
                    });
                    
                    const hexInput = document.getElementById(input.id + '-hex');
                    if (hexInput) {
                        hexInput.addEventListener('input', function() {
                            if (/^#[0-9A-F]{6}$/i.test(this.value)) {
                                document.getElementById(input.id.replace('-hex', '')).value = this.value;
                            }
                        });
                    }
                }
            });
            
            // Preset buttons
            const presetButtons = document.querySelectorAll('.preset-btn');
            presetButtons.forEach(button => {
                button.addEventListener('click', function() {
                    applyPreset(this.dataset.preset);
                });
            });
            
            // Modal setup
            const modal = document.getElementById('export-modal');
            const closeBtn = document.getElementsByClassName('close')[0];
            const downloadBtn = document.getElementById('download-button');
            
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
            
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
            
            downloadBtn.addEventListener('click', function() {
                const link = document.createElement('a');
                link.download = 'minecraft-texture.png';
                link.href = document.getElementById('download-image').src;
                link.click();
            });
            
            // Start animation
            animate();
            
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
            }, 1000);
        }
        
        function toggleRotation() {
            isRotating = !isRotating;
            document.getElementById('rotation-toggle').textContent = isRotating ? 'Pause Rotation' : 'Resume Rotation';
        }
        
        function onWindowResize() {
            camera.aspect = (window.innerWidth * 0.75) / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            if (isRotating) {
                cube.rotation.x += 0.005;
                cube.rotation.y += 0.01;
            }
            
            renderer.render(scene, camera);
        }
        
        function createTextures() {
            const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
            
            faces.forEach(face => {
                const canvas = document.createElement('canvas');
                canvas.width = textureSize;
                canvas.height = textureSize;
                
                generateTextureForFace(canvas, face);
                
                textures[face] = new THREE.CanvasTexture(canvas);
                textures[face].magFilter = THREE.NearestFilter;
                textures[face].minFilter = THREE.NearestFilter;
            });
            
            // Also update the preview texture
            updatePreviewTexture();
        }
        
        function updateTextures() {
            const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
            
            faces.forEach(face => {
                const canvas = document.createElement('canvas');
                canvas.width = textureSize;
                canvas.height = textureSize;
                
                generateTextureForFace(canvas, face);
                
                textures[face].image = canvas;
                textures[face].needsUpdate = true;
            });
            
            // Also update the preview texture
            updatePreviewTexture();
        }
        
        function generateTextureForFace(canvas, face) {
            const ctx = canvas.getContext('2d');
            const materialType = document.getElementById('material-type').value;
            const baseColor = document.getElementById('base-color').value;
            const accentColor = document.getElementById('accent-color').value;
            const noiseScale = parseInt(document.getElementById('noise-scale').value);
            const noiseStrength = parseInt(document.getElementById('noise-strength').value) / 100;
            const patternType = document.getElementById('pattern-type').value;
            const edgeDarkness = parseInt(document.getElementById('edge-darkness').value) / 100;
            const depth = parseInt(document.getElementById('depth').value) / 100;
            const bevel = parseInt(document.getElementById('bevel').value) / 100;
            
            // Convert hex colors to RGB
            const baseRGB = hexToRgb(baseColor);
            const accentRGB = hexToRgb(accentColor);
            
            // Fill with base color
            ctx.fillStyle = baseColor;
            ctx.fillRect(0, 0, textureSize, textureSize);
            
            // Apply pattern based on type
            for (let x = 0; x < textureSize; x++) {
                for (let y = 0; y < textureSize; y++) {
                    let noiseValue = 0;
                    
                    switch (patternType) {
                        case 'noise':
                            noiseValue = (simplex.noise2D(x / noiseScale, y / noiseScale) + 1) / 2;
                            break;
                        case 'cracked':
                            const crack1 = Math.abs(simplex.noise2D(x / noiseScale, y / noiseScale)) > 0.7 ? 1 : 0;
                            const crack2 = Math.abs(simplex.noise2D(x / (noiseScale * 2), y / (noiseScale * 2))) > 0.8 ? 1 : 0;
                            noiseValue = crack1 || crack2 ? 1 : 0;
                            break;
                        case 'checker':
                            const checkSize = Math.max(1, Math.floor(textureSize / noiseScale));
                            noiseValue = ((Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0) ? 0.2 : 0.8;
                            break;
                        case 'striped':
                            const stripeSize = Math.max(1, Math.floor(textureSize / noiseScale));
                            noiseValue = (Math.floor(x / stripeSize) % 2 === 0) ? 0.3 : 0.7;
                            break;
                        case 'zigzag':
                            const zigSize = Math.max(1, Math.floor(textureSize / noiseScale));
                            noiseValue = ((Math.floor(x / zigSize) + Math.floor(y / zigSize)) % 4 < 2) ? 0.3 : 0.7;
                            break;
                    }
                    
                    // Apply material specific adjustments
                    let materialNoise = 0;
                    switch (materialType) {
                        case 'stone':
                            materialNoise = (simplex.noise2D((x + 100) / (noiseScale * 0.5), (y + 100) / (noiseScale * 0.5)) + 1) / 2;
                            break;
                        case 'dirt':
                            materialNoise = (simplex.noise2D((x + 200) / (noiseScale * 0.7), (y + 200) / (noiseScale * 0.7)) + 1) / 2;
                            break;
                        case 'wood':
                            materialNoise = (simplex.noise2D(x / (noiseScale * 0.5), (y + 300) / (noiseScale * 3)) + 1) / 2;
                            break;
                        case 'metal':
                            materialNoise = (simplex.noise2D((x + 400) / (noiseScale * 2), (y + 400) / (noiseScale * 2)) + 1) / 2;
                            break;
                        case 'brick':
                            const brickW = Math.floor(textureSize / 4);
                            const brickH = Math.floor(textureSize / 2);
                            const offsetX = (Math.floor(y / brickH) % 2) * Math.floor(brickW / 2);
                            const brickX = (x + offsetX) % brickW;
                            const brickY = y % brickH;
                            const isMortar = brickX < 1 || brickY < 1;
                            materialNoise = isMortar ? 0.1 : 0.9;
                            break;
                        case 'sand':
                            materialNoise = (simplex.noise2D((x + 500) / (noiseScale * 0.3), (y + 500) / (noiseScale * 0.3)) + 1) / 2;
                            break;
                    }
                    
                    // Combine pattern and material
                    noiseValue = (noiseValue * 0.7 + materialNoise * 0.3);
                    
                    // Apply edge darkening for 3D effect
                    let edgeFactor = 0;
                    if (face === 'top') {
                        edgeFactor = ((x < textureSize * 0.2 ? (x / (textureSize * 0.2)) : 1) * 
                                     (y < textureSize * 0.2 ? (y / (textureSize * 0.2)) : 1) * 
                                     (x > textureSize * 0.8 ? ((textureSize - x) / (textureSize * 0.2)) : 1) * 
                                     (y > textureSize * 0.8 ? ((textureSize - y) / (textureSize * 0.2)) : 1));
                    } else {
                        // Different edge effect for side faces
                        edgeFactor = ((x < textureSize * 0.1 ? (x / (textureSize * 0.1)) : 1) * 
                                     (y < textureSize * 0.1 ? (y / (textureSize * 0.1)) : 1) * 
                                     (x > textureSize * 0.9 ? ((textureSize - x) / (textureSize * 0.1)) : 1) * 
                                     (y > textureSize * 0.9 ? ((textureSize - y) / (textureSize * 0.1)) : 1));
                    }
                    
                    // Apply bevel effect at corners
                    const cornerDist = Math.min(
                        Math.min(x, textureSize - x), 
                        Math.min(y, textureSize - y)
                    ) / (textureSize * 0.1);
                    const bevelFactor = Math.min(1, cornerDist);
                    edgeFactor *= (1 - bevel + bevel * bevelFactor);
                    
                    // Apply depth effect based on noise
                    const depthFactor = 1 - depth * (1 - noiseValue);
                    
                    // Calculate final pixel color
                    let r = Math.floor(baseRGB.r * (1 - noiseStrength) + accentRGB.r * noiseStrength * noiseValue);
                    let g = Math.floor(baseRGB.g * (1 - noiseStrength) + accentRGB.g * noiseStrength * noiseValue);
                    let b = Math.floor(baseRGB.b * (1 - noiseStrength) + accentRGB.b * noiseStrength * noiseValue);
                    
                    // Apply edge darkness and depth
                    r = Math.floor(r * (1 - edgeDarkness + edgeDarkness * edgeFactor) * depthFactor);
                    g = Math.floor(g * (1 - edgeDarkness + edgeDarkness * edgeFactor) * depthFactor);
                    b = Math.floor(b * (1 - edgeDarkness + edgeDarkness * edgeFactor) * depthFactor);
                    
                    // Ensure color values are valid
                    r = Math.max(0, Math.min(255, r));
                    g = Math.max(0, Math.min(255, g));
                    b = Math.max(0, Math.min(255, b));
// This completes the script.js file that was cut off

// Initialize Three.js scene
let scene, camera, renderer, cube, textureSize = 32;
let previewCanvas, previewCtx;
let isRotating = true;
let textures = {};
let simplex = new SimplexNoise();

// Material presets
const presets = {
    stone: {
        materialType: 'stone',
        baseColor: '#8c8c8c',
        accentColor: '#6e6e6e',
        noiseScale: 4,
        noiseStrength: 30,
        patternType: 'noise',
        edgeDarkness: 40,
        depth: 30,
        bevel: 20
    },
    dirt: {
        materialType: 'dirt',
        baseColor: '#8b5a2b',
        accentColor: '#654321',
        noiseScale: 6,
        noiseStrength: 50,
        patternType: 'noise',
        edgeDarkness: 30,
        depth: 40,
        bevel: 10
    },
    wood: {
        materialType: 'wood',
        baseColor: '#b5651d',
        accentColor: '#8b4513',
        noiseScale: 3,
        noiseStrength: 40,
        patternType: 'striped',
        edgeDarkness: 35,
        depth: 45,
        bevel: 15
    },
    grass: {
        materialType: 'dirt',
        baseColor: '#5d8a4a',
        accentColor: '#3b5b2e',
        noiseScale: 5,
        noiseStrength: 45,
        patternType: 'noise',
        edgeDarkness: 25,
        depth: 35,
        bevel: 10
    },
    sand: {
        materialType: 'sand',
        baseColor: '#d2b48c',
        accentColor: '#c2a278',
        noiseScale: 7,
        noiseStrength: 25,
        patternType: 'noise',
        edgeDarkness: 20,
        depth: 20,
        bevel: 5
    },
    brick: {
        materialType: 'brick',
        baseColor: '#b73a3a',
        accentColor: '#772222',
        noiseScale: 2,
        noiseStrength: 20,
        patternType: 'cracked',
        edgeDarkness: 50,
        depth: 60,
        bevel: 30
    }
};

function init() {
    // Set up scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c3e50);
    
    // Set up camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    
    // Set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Set up preview canvas
    previewCanvas = document.getElementById('texture-preview');
    previewCtx = previewCanvas.getContext('2d');
    
    // Create initial textures
    createTextures();
    
    // Create cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = [
        new THREE.MeshBasicMaterial({ map: textures.right }),
        new THREE.MeshBasicMaterial({ map: textures.left }),
        new THREE.MeshBasicMaterial({ map: textures.top }),
        new THREE.MeshBasicMaterial({ map: textures.bottom }),
        new THREE.MeshBasicMaterial({ map: textures.front }),
        new THREE.MeshBasicMaterial({ map: textures.back })
    ];
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.getElementById('generate').addEventListener('click', updateTextures);
    document.getElementById('randomize').addEventListener('click', randomizeSettings);
    document.getElementById('export-texture').addEventListener('click', exportTexture);
    document.getElementById('rotation-toggle').addEventListener('click', toggleRotation);
    
    // Add event listeners for all input controls
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input.type === 'range') {
            input.addEventListener('input', function() {
                document.getElementById(this.id + '-value').value = this.value;
            });
            
            const numberInput = document.getElementById(input.id + '-value');
            if (numberInput) {
                numberInput.addEventListener('input', function() {
                    document.getElementById(input.id).value = this.value;
                });
            }
        }
        
        if (input.type === 'color') {
            input.addEventListener('input', function() {
                document.getElementById(this.id + '-hex').value = this.value;
            });
            
            const hexInput = document.getElementById(input.id + '-hex');
            if (hexInput) {
                hexInput.addEventListener('input', function() {
                    if (/^#[0-9A-F]{6}$/i.test(this.value)) {
                        document.getElementById(input.id.replace('-hex', '')).value = this.value;
                    }
                });
            }
        }
    });
    
    // Preset buttons
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            applyPreset(this.dataset.preset);
        });
    });
    
    // Modal setup
    const modal = document.getElementById('export-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const downloadBtn = document.getElementById('download-button');
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'minecraft-texture.png';
        link.href = document.getElementById('download-image').src;
        link.click();
    });
    
    // Start animation
    animate();
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1000);
}

function toggleRotation() {
    isRotating = !isRotating;
    document.getElementById('rotation-toggle').textContent = isRotating ? 'Pause Rotation' : 'Resume Rotation';
}

function onWindowResize() {
    camera.aspect = (window.innerWidth * 0.75) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (isRotating) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
}

function createTextures() {
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    
    faces.forEach(face => {
        const canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        
        generateTextureForFace(canvas, face);
        
        textures[face] = new THREE.CanvasTexture(canvas);
        textures[face].magFilter = THREE.NearestFilter;
        textures[face].minFilter = THREE.NearestFilter;
    });
    
    // Also update the preview texture
    updatePreviewTexture();
}

function updateTextures() {
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    
    faces.forEach(face => {
        const canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        
        generateTextureForFace(canvas, face);
        
        textures[face].image = canvas;
        textures[face].needsUpdate = true;
    });
    
    // Also update the preview texture
    updatePreviewTexture();
}

function generateTextureForFace(canvas, face) {
    const ctx = canvas.getContext('2d');
    const materialType = document.getElementById('material-type').value;
    const baseColor = document.getElementById('base-color').value;
    const accentColor = document.getElementById('accent-color').value;
    const noiseScale = parseInt(document.getElementById('noise-scale').value);
    const noiseStrength = parseInt(document.getElementById('noise-strength').value) / 100;
    const patternType = document.getElementById('pattern-type').value;
    const edgeDarkness = parseInt(document.getElementById('edge-darkness').value) / 100;
    const depth = parseInt(document.getElementById('depth').value) / 100;
    const bevel = parseInt(document.getElementById('bevel').value) / 100;
    
    // Convert hex colors to RGB
    const baseRGB = hexToRgb(baseColor);
    const accentRGB = hexToRgb(accentColor);
    
    // Fill with base color
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, textureSize, textureSize);
    
    // Apply pattern based on type
    for (let x = 0; x < textureSize; x++) {
        for (let y = 0; y < textureSize; y++) {
            let noiseValue = 0;
            
            switch (patternType) {
                case 'noise':
                    noiseValue = (simplex.noise2D(x / noiseScale, y / noiseScale) + 1) / 2;
                    break;
                case 'cracked':
                    const crack1 = Math.abs(simplex.noise2D(x / noiseScale, y / noiseScale)) > 0.7 ? 1 : 0;
                    const crack2 = Math.abs(simplex.noise2D(x / (noiseScale * 2), y / (noiseScale * 2))) > 0.8 ? 1 : 0;
                    noiseValue = crack1 || crack2 ? 1 : 0;
                    break;
                case 'checker':
                    const checkSize = Math.max(1, Math.floor(textureSize / noiseScale));
                    noiseValue = ((Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0) ? 0.2 : 0.8;
                    break;
                case 'striped':
                    const stripeSize = Math.max(1, Math.floor(textureSize / noiseScale));
                    noiseValue = (Math.floor(x / stripeSize) % 2 === 0) ? 0.3 : 0.7;
                    break;
                case 'zigzag':
                    const zigSize = Math.max(1, Math.floor(textureSize / noiseScale));
                    noiseValue = ((Math.floor(x / zigSize) + Math.floor(y / zigSize)) % 4 < 2) ? 0.3 : 0.7;
                    break;
            }
            
            // Apply material specific adjustments
            let materialNoise = 0;
            switch (materialType) {
                case 'stone':
                    materialNoise = (simplex.noise2D((x + 100) / (noiseScale * 0.5), (y + 100) / (noiseScale * 0.5)) + 1) / 2;
                    break;
                case 'dirt':
                    materialNoise = (simplex.noise2D((x + 200) / (noiseScale * 0.7), (y + 200) / (noiseScale * 0.7)) + 1) / 2;
                    break;
                case 'wood':
                    materialNoise = (simplex.noise2D(x / (noiseScale * 0.5), (y + 300) / (noiseScale * 3)) + 1) / 2;
                    break;
                case 'metal':
                    materialNoise = (simplex.noise2D((x + 400) / (noiseScale * 2), (y + 400) / (noiseScale * 2)) + 1) / 2;
                    break;
                case 'brick':
                    const brickW = Math.floor(textureSize / 4);
                    const brickH = Math.floor(textureSize / 2);
                    const offsetX = (Math.floor(y / brickH) % 2) * Math.floor(brickW / 2);
                    const brickX = (x + offsetX) % brickW;
                    const brickY = y % brickH;
                    const isMortar = brickX < 1 || brickY < 1;
                    materialNoise = isMortar ? 0.1 : 0.9;
                    break;
                case 'sand':
                    materialNoise = (simplex.noise2D((x + 500) / (noiseScale * 0.3), (y + 500) / (noiseScale * 0.3)) + 1) / 2;
                    break;
            }
            
            // Combine pattern and material
            noiseValue = (noiseValue * 0.7 + materialNoise * 0.3);
            
            // Apply edge darkening for 3D effect
            let edgeFactor = 0;
            if (face === 'top') {
                edgeFactor = ((x < textureSize * 0.2 ? (x / (textureSize * 0.2)) : 1) * 
                             (y < textureSize * 0.2 ? (y / (textureSize * 0.2)) : 1) * 
                             (x > textureSize * 0.8 ? ((textureSize - x) / (textureSize * 0.2)) : 1) * 
                             (y > textureSize * 0.8 ? ((textureSize - y) / (textureSize * 0.2)) : 1));
            } else {
                // Different edge effect for side faces
                edgeFactor = ((x < textureSize * 0.1 ? (x / (textureSize * 0.1)) : 1) * 
                             (y < textureSize * 0.1 ? (y / (textureSize * 0.1)) : 1) * 
                             (x > textureSize * 0.9 ? ((textureSize - x) / (textureSize * 0.1)) : 1) * 
                             (y > textureSize * 0.9 ? ((textureSize - y) / (textureSize * 0.1)) : 1));
            }
            
            // Apply bevel effect at corners
            const cornerDist = Math.min(
                Math.min(x, textureSize - x), 
                Math.min(y, textureSize - y)
            ) / (textureSize * 0.1);
            const bevelFactor = Math.min(1, cornerDist);
            edgeFactor *= (1 - bevel + bevel * bevelFactor);
            
            // Apply depth effect based on noise
            const depthFactor = 1 - depth * (1 - noiseValue);
            
            // Calculate final pixel color
            let r = Math.floor(baseRGB.r * (1 - noiseStrength) + accentRGB.r * noiseStrength * noiseValue);
            let g = Math.floor(baseRGB.g * (1 - noiseStrength) + accentRGB.g * noiseStrength * noiseValue);
            let b = Math.floor(baseRGB.b * (1 - noiseStrength) + accentRGB.b * noiseStrength * noiseValue);
            
            // Apply edge darkness and depth
            r = Math.floor(r * (1 - edgeDarkness + edgeDarkness * edgeFactor) * depthFactor);
            g = Math.floor(g * (1 - edgeDarkness + edgeDarkness * edgeFactor) * depthFactor);
            b = Math.floor(b * (1 - edgeDarkness + edgeDarkness * edgeFactor) * depthFactor);
            
            // Ensure color values are valid
            r = Math.max(0, Math.min(255, r));
            g = Math.max(0, Math.min(255, g));
            b = Math.max(0, Math.min(255, b));
            
            // Set pixel color
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function updatePreviewTexture() {
    // Create a larger preview texture
    const previewSize = 128;
    const scale = previewSize / textureSize;
    
    // Get the front face texture
    const frontCanvas = textures.front.image;
    
    // Clear preview
    previewCtx.clearRect(0, 0, previewSize, previewSize);
    
    // Scale up the texture using nearest-neighbor sampling
    for (let x = 0; x < previewSize; x++) {
        for (let y = 0; y < previewSize; y++) {
            const sourceX = Math.floor(x / scale);
            const sourceY = Math.floor(y / scale);
            
            // Get the color of the corresponding pixel in the texture
            const pixelData = frontCanvas.getContext('2d').getImageData(sourceX, sourceY, 1, 1).data;
            
            // Draw the scaled pixel
            previewCtx.fillStyle = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
            previewCtx.fillRect(x, y, 1, 1);
        }
    }
}

function exportTexture() {
    // Create a texture atlas (all six faces arranged in a grid)
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = textureSize * 3;
    exportCanvas.height = textureSize * 2;
    const exportCtx = exportCanvas.getContext('2d');
    
    // Arrange faces in a grid
    const arrangement = [
        { face: 'top', x: textureSize, y: 0 },
        { face: 'left', x: 0, y: textureSize },
        { face: 'front', x: textureSize, y: textureSize },
        { face: 'right', x: textureSize * 2, y: textureSize },
        { face: 'back', x: textureSize * 3, y: textureSize }, // This is outside the canvas, but included for completeness
        { face: 'bottom', x: textureSize, y: textureSize * 2 } // This is outside the canvas, but included for completeness
    ];
    
    // Draw each face at its position
    arrangement.forEach(({face, x, y}) => {
        if (x < exportCanvas.width && y < exportCanvas.height) {
            exportCtx.drawImage(textures[face].image, x, y);
        }
    });
    
    // Create a larger preview image
    const downloadImg = document.getElementById('download-image');
    downloadImg.src = exportCanvas.toDataURL('image/png');
    
    // Show the modal
    document.getElementById('export-modal').style.display = 'block';
}

function randomizeSettings() {
    // Randomize material type
    const materialTypes = ['stone', 'dirt', 'wood', 'metal', 'brick', 'sand'];
    const randomMaterial = materialTypes[Math.floor(Math.random() * materialTypes.length)];
    document.getElementById('material-type').value = randomMaterial;
    
    // Randomize pattern type
    const patternTypes = ['noise', 'cracked', 'checker', 'striped', 'zigzag'];
    const randomPattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    document.getElementById('pattern-type').value = randomPattern;
    
    // Randomize colors
    document.getElementById('base-color').value = randomColor();
    document.getElementById('base-color-hex').value = document.getElementById('base-color').value;
    
    document.getElementById('accent-color').value = randomColor();
    document.getElementById('accent-color-hex').value = document.getElementById('accent-color').value;
    
    // Randomize sliders
    document.getElementById('noise-scale').value = Math.floor(Math.random() * 16) + 1;
    document.getElementById('noise-scale-value').value = document.getElementById('noise-scale').value;
    
    document.getElementById('noise-strength').value = Math.floor(Math.random() * 100) + 1;
    document.getElementById('noise-strength-value').value = document.getElementById('noise-strength').value;
    
    document.getElementById('edge-darkness').value = Math.floor(Math.random() * 100) + 1;
    document.getElementById('edge-darkness-value').value = document.getElementById('edge-darkness').value;
    
    document.getElementById('depth').value = Math.floor(Math.random() * 100) + 1;
    document.getElementById('depth-value').value = document.getElementById('depth').value;
    
    document.getElementById('bevel').value = Math.floor(Math.random() * 100) + 1;
    document.getElementById('bevel-value').value = document.getElementById('bevel').value;
    
    // Update textures
    updateTextures();
}

function applyPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;
    
    document.getElementById('material-type').value = preset.materialType;
    document.getElementById('base-color').value = preset.baseColor;
    document.getElementById('base-color-hex').value = preset.baseColor;
    document.getElementById('accent-color').value = preset.accentColor;
    document.getElementById('accent-color-hex').value = preset.accentColor;
    document.getElementById('noise-scale').value = preset.noiseScale;
    document.getElementById('noise-scale-value').value = preset.noiseScale;
    document.getElementById('noise-strength').value = preset.noiseStrength;
    document.getElementById('noise-strength-value').value = preset.noiseStrength;
    document.getElementById('pattern-type').value = preset.patternType;
    document.getElementById('edge-darkness').value = preset.edgeDarkness;
    document.getElementById('edge-darkness-value').value = preset.edgeDarkness;
    document.getElementById('depth').value = preset.depth;
    document.getElementById('depth-value').value = preset.depth;
    document.getElementById('bevel').value = preset.bevel;
    document.getElementById('bevel-value').value = preset.bevel;
    
    updateTextures();
}

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

// Initialize the application when the page loads
window.addEventListener('load', init);
