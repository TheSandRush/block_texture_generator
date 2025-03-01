// Initialize Three.js scene
let scene, camera, renderer, cube, textureSize = 32;
let previewCanvas, previewCtx;
let isRotating = true;
let textures = {};
let simplex;

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
    // Initialize simplex noise
    simplex = new SimplexNoise();
    
    // Set up scene
    scene = new THREE.Scene();
    
    // Set up camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    
    // Set up renderer with transparency
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
        { face: 'back', x: 0, y: 0 }, // Fixed position
        { face: 'bottom', x: textureSize * 2, y: 0 } // Fixed position
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
