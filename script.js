// Initialize Three.js scene
if (typeof window.scene === 'undefined') {
    window.scene = undefined;
    window.camera = undefined;
    window.renderer = undefined;
    window.controls = undefined;
    window.cube = undefined;
    window.textureSize = 32;
    window.previewCanvas = undefined;
    window.previewCtx = undefined;
    window.isRotating = true;
    window.textures = {};
    window.simplex = undefined;
    window.sharedColorPalette = null;
    window.customTextures = {
        front: null,
        back: null,
        top: null,
        bottom: null,
        left: null,
        right: null
    };
}

// Material presets
const presets = window.blockPresets || {
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
        noiseScale: 2,        // reduced to make pattern cleaner
        noiseStrength: 15,    // reduced from 20 to make it less noisy
        patternType: 'checker', // changed from 'cracked' to 'checker' for cleaner brick pattern
        edgeDarkness: 40,     // reduced from 50
        depth: 30,            // reduced from 60
        bevel: 20             // reduced from 30
    }
};

// Save presets to window to prevent redeclaration
window.blockPresets = presets;

// Handle orientation change properly
function handleOrientationChange() {
    // Give the browser time to update dimensions after orientation change
    setTimeout(function() {
        onWindowResize();
    }, 100);
}

// Window resize handler
function onWindowResize() {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;
    
    const containerWidth = canvasContainer.clientWidth;
    const containerHeight = canvasContainer.clientHeight;
    
    // Update camera aspect ratio based on container dimensions
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer size
    renderer.setSize(containerWidth, containerHeight);
    
    // Adjust camera position based on screen size
    if (window.innerWidth <= 480) {
        // Small mobile devices
        camera.position.z = 2.0;
    } else if (window.innerWidth <= 768) {
        // Medium mobile devices
        camera.position.z = 2.2;
    } else {
        // Desktops and larger devices
        camera.position.z = 2.5;
    }

    // Update controls target if needed
    if (controls) {
        controls.update();
    }
}

// Color quantization function to limit the palette to 255 colors or less
function quantizeColors(imageData, maxColors = 64) {
    const width = imageData.width;
    const height = imageData.height;
    const pixels = imageData.data;
    const colorMap = new Map();
    const colorCounts = new Map();
    
    // First pass: count all unique colors
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const colorKey = `${r},${g},${b}`;
        
        if (colorCounts.has(colorKey)) {
            colorCounts.set(colorKey, colorCounts.get(colorKey) + 1);
        } else {
            colorCounts.set(colorKey, 1);
        }
    }
    
    // Check if we already have fewer colors than the max
    if (colorCounts.size <= maxColors) {
        console.log(`Texture already has ${colorCounts.size} colors, no quantization needed.`);
        return imageData;
    }
    
    // Sort colors by frequency
    const sortedColors = Array.from(colorCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, maxColors);
    
    // Create a mapping from original colors to palette colors
    sortedColors.forEach(([colorKey]) => {
        colorMap.set(colorKey, colorKey);
    });
    
    // For colors not in the palette, map to the closest palette color
    const unmappedColors = Array.from(colorCounts.keys())
        .filter(colorKey => !colorMap.has(colorKey));
    
    unmappedColors.forEach(colorKey => {
        const [r, g, b] = colorKey.split(',').map(Number);
        let closestColorKey = sortedColors[0][0];
        let minDistance = Number.MAX_VALUE;
        
        sortedColors.forEach(([paletteColorKey]) => {
            const [pr, pg, pb] = paletteColorKey.split(',').map(Number);
            // Simple Euclidean distance in RGB space
            const distance = Math.sqrt(
                Math.pow(pr - r, 2) + 
                Math.pow(pg - g, 2) + 
                Math.pow(pb - b, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestColorKey = paletteColorKey;
            }
        });
        
        colorMap.set(colorKey, closestColorKey);
    });
    
    // Second pass: apply the color mapping to the image
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const colorKey = `${r},${g},${b}`;
        
        const mappedColorKey = colorMap.get(colorKey);
        if (mappedColorKey) {
            const [pr, pg, pb] = mappedColorKey.split(',').map(Number);
            pixels[i] = pr;
            pixels[i + 1] = pg;
            pixels[i + 2] = pb;
        }
    }
    
    console.log(`Texture quantized from ${colorCounts.size} to ${sortedColors.length} colors.`);
    return imageData;
}

// Generate a shared color palette from all faces
function generateSharedColorPalette() {
    const facesData = [];
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    
    // Create temporary canvases for each face
    faces.forEach(face => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = textureSize;
        tempCanvas.height = textureSize;
        
        // Generate raw texture without quantization
        generateTextureForFace(tempCanvas, face, false);
        
        // Get pixel data
        const ctx = tempCanvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, textureSize, textureSize);
        facesData.push(imageData.data);
    });
    
    // Count all unique colors across all faces
    const colorCounts = new Map();
    
    facesData.forEach(data => {
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const colorKey = `${r},${g},${b}`;
            
            if (colorCounts.has(colorKey)) {
                colorCounts.set(colorKey, colorCounts.get(colorKey) + 1);
            } else {
                colorCounts.set(colorKey, 1);
            }
        }
    });
    
    console.log(`Total unique colors across all faces: ${colorCounts.size}`);
    
    // If we already have fewer colors than the max, no need to quantize
    if (colorCounts.size <= 255) {
        console.log(`Already have ${colorCounts.size} colors, no quantization needed.`);
        // Convert to palette format
        return Array.from(colorCounts.keys()).map(key => {
            const [r, g, b] = key.split(',').map(Number);
            return {r, g, b};
        });
    }
    
    // Sort colors by frequency
    const sortedColors = Array.from(colorCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 255);
    
    // Convert to palette format
    const palette = sortedColors.map(([colorKey]) => {
        const [r, g, b] = colorKey.split(',').map(Number);
        return {r, g, b};
    });
    
    console.log(`Generated shared palette with ${palette.length} colors.`);
    return palette;
}

// Find closest color in palette
function findClosestColor(r, g, b, palette) {
    let closestColor = palette[0];
    let minDistance = Number.MAX_VALUE;
    
    palette.forEach(color => {
        // Simple Euclidean distance in RGB space
        const distance = Math.sqrt(
            Math.pow(color.r - r, 2) + 
            Math.pow(color.g - g, 2) + 
            Math.pow(color.b - b, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color;
        }
    });
    
    return closestColor;
}

// Apply shared palette to image data
function applySharedPalette(imageData, palette) {
    const pixels = imageData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        
        const closestColor = findClosestColor(r, g, b, palette);
        
        pixels[i] = closestColor.r;
        pixels[i + 1] = closestColor.g;
        pixels[i + 2] = closestColor.b;
    }
    
    return imageData;
}

// Math pattern generation functions
const mathPatterns = {
    'sine-waves': (x, y, scale) => {
        const freq = scale / 50;
        return (Math.sin(x * freq) * Math.cos(y * freq) + 1) / 2;
    },
    
    'ripples': (x, y, scale) => {
        const centerX = textureSize / 2;
        const centerY = textureSize / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const freq = scale / 20;
        return (Math.sin(dist * freq) + 1) / 2;
    },
    
    'voronoi': (x, y, scale) => {
        const points = [];
        const numPoints = Math.floor(scale / 5) + 2;
        
        // Generate random points if not already generated
        if (!window.voronoiPoints || window.voronoiPoints.length !== numPoints) {
            window.voronoiPoints = [];
            for (let i = 0; i < numPoints; i++) {
                window.voronoiPoints.push({
                    x: Math.random() * textureSize,
                    y: Math.random() * textureSize
                });
            }
        }
        
        // Find minimum distance to any point
        let minDist = Infinity;
        for (const point of window.voronoiPoints) {
            const dx = x - point.x;
            const dy = y - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            minDist = Math.min(minDist, dist);
        }
        
        return minDist / (textureSize / 2);
    },
    
    'mandelbrot': (x, y, scale) => {
        const maxIter = 50;
        const zoom = scale / 10;
        
        // Map texture coordinates to mandelbrot space
        const real = (x - textureSize / 2) / (textureSize / 4 * zoom);
        const imag = (y - textureSize / 2) / (textureSize / 4 * zoom);
        
        let zr = 0;
        let zi = 0;
        let i;
        
        for (i = 0; i < maxIter; i++) {
            const zr2 = zr * zr;
            const zi2 = zi * zi;
            
            if (zr2 + zi2 > 4) break;
            
            const newZr = zr2 - zi2 + real;
            const newZi = 2 * zr * zi + imag;
            
            zr = newZr;
            zi = newZi;
        }
        
        return i / maxIter;
    },
    
    'perlin-flow': (x, y, scale) => {
        const freq = scale / 50;
        const noise1 = simplex.noise2D(x * freq, y * freq);
        const noise2 = simplex.noise2D((x + 100) * freq, (y + 100) * freq);
        const angle = noise1 * Math.PI * 2;
        const strength = noise2;
        
        return (Math.sin(angle) * strength + 1) / 2;
    },
    
    'fractal': (x, y, scale) => {
        let value = 0;
        let amplitude = 1;
        let frequency = scale / 50;
        
        // Add multiple layers of noise with different frequencies
        for (let i = 0; i < 4; i++) {
            value += amplitude * (simplex.noise2D(x * frequency, y * frequency) + 1) / 2;
            amplitude *= 0.5;
            frequency *= 2;
        }
        
        return value / 1.875; // Normalize to 0-1 range
    }
};

function generateMathPattern(x, y, patternType, scale, customFormula) {
    if (customFormula) {
        try {
            // Create a safe function from the custom formula
            const safeFunction = new Function('x', 'y', 'Math', `
                try {
                    return ${customFormula};
                } catch (e) {
                    return 0;
                }
            `);
            
            // Execute the formula and normalize result to 0-1 range
            const result = safeFunction(x, y, Math);
            return (result + 1) / 2;
        } catch (e) {
            console.error('Invalid math formula:', e);
            return 0;
        }
    }
    
    const pattern = mathPatterns[patternType];
    if (!pattern) return 0;
    
    return pattern(x, y, scale);
}

function init() {
    console.log("Initializing Magic Block...");
    try {
        // Initialize simplex noise
        simplex = new SimplexNoise();
        console.log("SimplexNoise initialized");
        
        // Set up scene
        scene = new THREE.Scene();
        // No background color - using transparent renderer
        
        // Set up camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2.5; // Desktop default

        // Set up renderer with transparency
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const canvasContainer = document.getElementById('canvas-container');
        // Calculate initial size based on container, not window
        const containerWidth = canvasContainer.clientWidth;
        const containerHeight = canvasContainer.clientHeight;
        renderer.setSize(containerWidth, containerHeight);
        canvasContainer.appendChild(renderer.domElement);
        
        // Set up OrbitControls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Add smooth damping
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = 1.5; // Minimum zoom distance
        controls.maxDistance = 10;  // Maximum zoom distance
        controls.enablePan = true;
        controls.autoRotate = true; // Enable auto-rotation
        controls.autoRotateSpeed = 2.0; // Rotation speed

        // Set up preview canvas with willReadFrequently
        previewCanvas = document.getElementById('texture-preview');
        if (!previewCanvas) {
            console.error("Preview canvas element not found!");
            return; // Exit initialization if element is missing
        }
        previewCtx = previewCanvas.getContext('2d', { willReadFrequently: true });
        console.log("Preview canvas initialized");
        
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
        console.log("Cube created and added to scene");
        
        // Event listeners
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Check if elements exist before adding event listeners
        const generateBtn = document.getElementById('generate');
        const randomizeBtn = document.getElementById('randomize');
        const exportBtn = document.getElementById('export-texture');
        const rotationToggleBtn = document.getElementById('rotation-toggle');
        
        if (generateBtn) generateBtn.addEventListener('click', updateTextures);
        if (randomizeBtn) randomizeBtn.addEventListener('click', randomizeSettings);
        if (exportBtn) exportBtn.addEventListener('click', exportTexture);
        if (rotationToggleBtn) rotationToggleBtn.addEventListener('click', toggleRotation);
        console.log("Button event listeners initialized");
        
        // Add event listeners for all input controls
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            const updateControls = () => {
                if (input.type === 'range') {
                    const valueInput = document.getElementById(input.id + '-value');
                    if (valueInput) {
                        valueInput.value = input.value;
                    }
                }
                
                if (input.type === 'color') {
                    const hexInput = document.getElementById(input.id + '-hex');
                    if (hexInput) {
                        hexInput.value = input.value;
                    }
                }
                
                // Update textures immediately
                updateTextures();
            };

            // Add input and change event listeners
            input.addEventListener('input', updateControls);
            input.addEventListener('change', updateControls);
            
            if (input.type === 'range') {
                const numberInput = document.getElementById(input.id + '-value');
                if (numberInput) {
                    numberInput.addEventListener('input', function() {
                        const rangeInput = document.getElementById(input.id);
                        if (rangeInput) {
                            rangeInput.value = this.value;
                            updateTextures();
                        }
                    });
                }
            }
            
            if (input.type === 'color') {
                const hexInput = document.getElementById(input.id + '-hex');
                if (hexInput) {
                    hexInput.addEventListener('input', function() {
                        if (/^#[0-9A-F]{6}$/i.test(this.value)) {
                            const colorInput = document.getElementById(input.id.replace('-hex', ''));
                            if (colorInput) {
                                colorInput.value = this.value;
                                updateTextures();
                            }
                        }
                    });
                }
            }
        });
        console.log("Input control event listeners initialized");
        
        // Preset buttons
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(button => {
            button.addEventListener('click', function() {
                applyPreset(this.dataset.preset);
            });
        });
        
        // Modal setup
        const modal = document.getElementById('export-modal');
        if (modal) {
            const closeBtns = document.getElementsByClassName('close');
            const pngDownloadBtn = document.getElementById('download-png-button');
            const vxbDownloadBtn = document.getElementById('download-vxb-button');
            
            if (closeBtns.length > 0) {
                closeBtns[0].onclick = function() {
                    modal.style.display = 'none';
                };
            }
            
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
            
            if (pngDownloadBtn) {
                pngDownloadBtn.addEventListener('click', function() {
                    const link = document.createElement('a');
                    link.download = 'magic-block-texture.png';
                    const downloadImg = document.getElementById('download-image');
                    if (downloadImg) {
                        link.href = downloadImg.src;
                        link.click();
                    }
                });
            }
            
            if (vxbDownloadBtn) {
                vxbDownloadBtn.addEventListener('click', exportAsVxb);
            }
        }
        console.log("Modal setup complete");
        
        // Start animation
        animate();
        console.log("Animation started");
        
        // Call resize handler once to set proper dimensions
        onWindowResize();
        
        // Hide loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                console.log("Loading screen hidden");
            }
        }, 1500); // Increased timeout to ensure everything is ready

        initCustomTextureHandlers();

        // Add preview container expand/collapse functionality
        const previewContainer = document.querySelector('.texture-preview-container');
        if (previewContainer) {
            previewContainer.addEventListener('click', function(e) {
                // Don't toggle if clicking on a button
                if (e.target.tagName === 'BUTTON') return;
                
                this.classList.toggle('expanded');
                
                // Update preview faces when expanded
                if (this.classList.contains('expanded')) {
                    updateFaceCanvases();
                }
            });
        }

        // Initialize panel collapse functionality
        initPanelCollapse();

        // Initialize math controls
        initMathControls();
        
        // Initialize pattern layer system if available
        if (typeof initPatternLayerSystem === 'function') {
            initPatternLayerSystem();
        } else {
            console.error('Pattern layer system not loaded properly');
        }
    } catch (error) {
        console.error("Initialization error:", error);
        alert("There was an error initializing Magic Block. Please check the console for details.");
    }
}

function toggleRotation() {
    if (controls) {
        controls.autoRotate = !controls.autoRotate;
        const rotationToggleBtn = document.getElementById('rotation-toggle');
        if (rotationToggleBtn) {
            rotationToggleBtn.textContent = controls.autoRotate ? 'Pause Rotation' : 'Resume Rotation';
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (controls) {
        controls.update(); // Update controls in animation loop
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function createTextures() {
    // Generate a shared color palette for all faces
    sharedColorPalette = generateSharedColorPalette();
    console.log(`Using shared palette with ${sharedColorPalette.length} colors`);
    
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    
    faces.forEach(face => {
        const canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        
        generateTextureForFace(canvas, face, true);
        
        textures[face] = new THREE.CanvasTexture(canvas);
        textures[face].magFilter = THREE.NearestFilter;
        textures[face].minFilter = THREE.NearestFilter;
    });
    
    // Add this line to update the face previews
    updateFaceCanvases();
    
    // Also update the preview texture
    updatePreviewTexture();
}

function updateTextures() {
    // Regenerate the shared palette
    sharedColorPalette = generateSharedColorPalette();
    console.log(`Updated shared palette with ${sharedColorPalette.length} colors`);
    
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    
    faces.forEach(face => {
        const canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        
        generateTextureForFace(canvas, face, true);
        
        if (textures[face]) {
            textures[face].image = canvas;
            textures[face].needsUpdate = true;
        }
    });
    
    // Add this line to update the face previews
    updateFaceCanvases();
    
    // Also update the preview texture
    updatePreviewTexture();
}

function generateTextureForFace(canvas, face, useSharedPalette = true) {
    // Check for custom texture first
    if (customTextures[face]) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(customTextures[face], 0, 0);
        return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Get form values with null checks
    const materialTypeElement = document.getElementById('material-type');
    const baseColorElement = document.getElementById('base-color');
    const accentColorElement = document.getElementById('accent-color');
    const noiseScaleElement = document.getElementById('noise-scale');
    const noiseStrengthElement = document.getElementById('noise-strength');
    const patternTypeElement = document.getElementById('pattern-type');
    const edgeDarknessElement = document.getElementById('edge-darkness');
    const depthElement = document.getElementById('depth');
    const bevelElement = document.getElementById('bevel');
    
    // Set defaults if elements not found
    const materialType = materialTypeElement ? materialTypeElement.value : 'stone';
    const baseColor = baseColorElement ? baseColorElement.value : '#8c8c8c';
    const accentColor = accentColorElement ? accentColorElement.value : '#6e6e6e';
    const noiseScale = noiseScaleElement ? parseInt(noiseScaleElement.value) : 4;
    const noiseStrength = noiseStrengthElement ? parseInt(noiseStrengthElement.value) / 100 : 0.3;
    const patternType = patternTypeElement ? patternTypeElement.value : 'noise';
    const edgeDarkness = edgeDarknessElement ? parseInt(edgeDarknessElement.value) / 100 : 0.4;
    const depth = depthElement ? parseInt(depthElement.value) / 100 : 0.3;
    const bevel = bevelElement ? parseInt(bevelElement.value) / 100 : 0.2;
    
    // Get math-specific settings if pattern type is 'math'
    const mathPatternTypeElement = document.getElementById('math-pattern-type');
    const mathScaleElement = document.getElementById('math-scale');
    const mathFormulaElement = document.getElementById('math-formula');
    const formulaColorElement = document.getElementById('formula-color');
    
    const mathPatternType = mathPatternTypeElement ? mathPatternTypeElement.value : 'sine-waves';
    const mathScale = mathScaleElement ? parseInt(mathScaleElement.value) : 10;
    const customFormula = mathFormulaElement ? mathFormulaElement.value.trim() : '';
    const formulaColor = formulaColorElement ? formulaColorElement.value : '#4a90e2';
    
    // Convert hex colors to RGB
    const baseRGB = hexToRgb(baseColor);
    const accentRGB = hexToRgb(accentColor);
    const formulaRGB = hexToRgb(formulaColor);
    
    // Fill with base color
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, textureSize, textureSize);
    
    // Apply pattern based on type
    for (let x = 0; x < textureSize; x++) {
        for (let y = 0; y < textureSize; y++) {
            let noiseValue = 0;
            
            if (patternType === 'math') {
                noiseValue = generateMathPattern(x, y, mathPatternType, mathScale, customFormula);
            } else {
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
                    const brickW = Math.floor(textureSize / 3);
                    const brickH = Math.floor(textureSize / 2);
                    const mortarSize = 1;
                    const offsetX = (Math.floor(y / brickH) % 2) * Math.floor(brickW / 2);
                    const brickX = (x + offsetX) % brickW;
                    const brickY = y % brickH;
                    const isMortar = brickX < mortarSize || brickY < mortarSize;
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
            let r, g, b;
            
            if (patternType === 'math' && customFormula) {
                // Use formula color for custom formula
                r = Math.floor(baseRGB.r * (1 - noiseStrength) + formulaRGB.r * noiseStrength * noiseValue);
                g = Math.floor(baseRGB.g * (1 - noiseStrength) + formulaRGB.g * noiseStrength * noiseValue);
                b = Math.floor(baseRGB.b * (1 - noiseStrength) + formulaRGB.b * noiseStrength * noiseValue);
            } else {
                r = Math.floor(baseRGB.r * (1 - noiseStrength) + accentRGB.r * noiseStrength * noiseValue);
                g = Math.floor(baseRGB.g * (1 - noiseStrength) + accentRGB.g * noiseStrength * noiseValue);
                b = Math.floor(baseRGB.b * (1 - noiseStrength) + accentRGB.b * noiseStrength * noiseValue);
            }
            
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
    
    // Apply the shared palette if needed
    if (useSharedPalette && sharedColorPalette) {
        const imageData = ctx.getImageData(0, 0, textureSize, textureSize);
        const paletteAppliedData = applySharedPalette(imageData, sharedColorPalette);
        ctx.putImageData(paletteAppliedData, 0, 0);
    } else if (!useSharedPalette) {
        // No need to quantize here since we're just collecting colors for the shared palette
    } else {
        // Fallback to individual quantization when shared palette isn't available
        const imageData = ctx.getImageData(0, 0, textureSize, textureSize);
        const quantizedData = quantizeColors(imageData, 255);
        ctx.putImageData(quantizedData, 0, 0);
    }
    
    // Check if we have pattern layers to apply
    if (window.patternSystem && 
        window.patternSystem.activeLayers && 
        window.patternSystem.activeLayers[face] && 
        window.patternSystem.activeLayers[face].length > 0) {
        
        // Apply pattern layers on top of the generated texture
        const layers = window.patternSystem.activeLayers[face];
        
        // Apply each layer from bottom to top (reversed from the UI display)
        for (let i = layers.length - 1; i >= 0; i--) {
            const layer = layers[i];
            const pattern = window.patternSystem.patternDatabase.patterns.find(p => p.id === layer.patternId);
            
            if (!pattern) continue;
            
            // Draw pattern with proper blending
            ctx.save();
            ctx.globalCompositeOperation = layer.blendMode;
            ctx.globalAlpha = layer.opacity;
            
            // Load the pattern image asynchronously
            const img = new Image();
            img.src = `patterns/${pattern.src}`;
            
            // This is a bit hacky but works for immediate preview
            // We're drawing synchronously to avoid the complexity of async texture generation
            // In a production app, you might want to use a better approach with proper loading handling
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Apply color tint
                if (layer.color && layer.color !== '#000000') {
                    ctx.globalCompositeOperation = 'source-atop';
                    ctx.fillStyle = layer.color;
                    ctx.globalAlpha = 0.5; // Reduce the intensity of the tint
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                
                ctx.restore();
                
                // For immediate preview update, refresh the texture
                if (textures[face]) {
                    textures[face].needsUpdate = true;
                }
                
                // Update face previews
                updateFaceCanvases();
                
                // Update main preview if this is the front face
                if (face === 'front') {
                    updatePreviewTexture();
                }
            };
            
            img.onerror = () => {
                console.error(`Failed to load pattern image: ${pattern.src}`);
                ctx.restore();
            };
        }
    }
}

function updatePreviewTexture() {
    if (!previewCtx) {
        console.error("Preview context not available");
        return;
    }
    
    // Create a larger preview texture
    const previewSize = 128;
    const scale = previewSize / textureSize;
    
    // Get the front face texture
    const frontCanvas = textures.front ? textures.front.image : null;
    if (!frontCanvas) {
        console.error("Front texture not available");
        return;
    }
    
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

function updateFaceCanvases() {
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    faces.forEach(face => {
        if (!textures[face]) return;
        
        const faceCard = document.querySelector(`.face-card[data-face="${face}"] canvas`);
        if (!faceCard) return;
        
        const ctx = faceCard.getContext('2d');
        const sourceCanvas = textures[face].image;
        
        // Clear and draw the face texture
        ctx.clearRect(0, 0, faceCard.width, faceCard.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sourceCanvas, 0, 0, faceCard.width, faceCard.height);
    });
}

function exportTexture() {
    // Make sure pattern layers are applied to all faces before exporting
    if (window.patternLayerSystem && window.patternLayerSystem.applyAllLayers) {
        window.patternLayerSystem.applyAllLayers();
    }
    
    // Create a texture atlas (all six faces arranged in a grid)
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = textureSize * 3;
    exportCanvas.height = textureSize * 2;
    const exportCtx = exportCanvas.getContext('2d', { willReadFrequently: true });
    
    // Arrange faces in a grid
    const arrangement = [
        { face: 'top', x: textureSize, y: 0 },
        { face: 'left', x: 0, y: textureSize },
        { face: 'front', x: textureSize, y: textureSize },
        { face: 'right', x: textureSize * 2, y: textureSize },
        { face: 'back', x: 0, y: 0 },
        { face: 'bottom', x: textureSize * 2, y: 0 }
    ];
    
    // Draw each face at its position
    arrangement.forEach(({face, x, y}) => {
        if (x < exportCanvas.width && y < exportCanvas.height && textures[face] && textures[face].image) {
            exportCtx.drawImage(textures[face].image, x, y);
        }
    });
    
    // Create a larger preview image
    const downloadImg = document.getElementById('download-image');
    if (downloadImg) {
        downloadImg.src = exportCanvas.toDataURL('image/png');
    }
    
    // Store the textures for VXB export
    window.textureFaces = {
        right: textures.right.image,
        back: textures.back.image,
        bottom: textures.bottom.image,
        top: textures.top.image,
        front: textures.front.image,
        left: textures.left.image
    };
    
    // Show the modal
    const modal = document.getElementById('export-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function exportAsVxb() {
    try {
        if (!window.VxbConverter) {
            console.error("VXB Converter not available");
            alert("VXB Converter not available. Make sure vxb-converter.js is loaded correctly.");
            return;
        }

        // Get all face textures, preferring custom textures when available
        const faces = {};
        const faceOrder = ['right', 'left', 'top', 'bottom', 'front', 'back'];

        faceOrder.forEach(faceName => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');

            if (customTextures[faceName]) {
                // Use custom texture
                ctx.drawImage(customTextures[faceName], 0, 0);
            } else if (textures[faceName]) {
                // Use generated texture
                ctx.drawImage(textures[faceName].image, 0, 0);
            } else {
                // Fallback
                ctx.fillStyle = '#888888';
                ctx.fillRect(0, 0, 32, 32);
                console.warn(`Missing face texture: ${faceName}, using default color`);
            }

            faces[faceName] = canvas;
        });

        // Create blobs for each face
        const blobPromises = faceOrder.map(faceName => {
            return new Promise((resolve, reject) => {
                const canvas = faces[faceName];
                canvas.toBlob(blob => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(`Failed to create blob for face: ${faceName}`);
                    }
                }, 'image/png');
            });
        });

        Promise.all(blobPromises)
            .then(blobs => {
                const materialType = document.getElementById('material-type').value || 'block';
                console.log(`Exporting VXB with ${blobs.length} faces in order: ${faceOrder.join(', ')}`);
                return window.VxbConverter.convertAndSaveMultipleVxb(blobs, `magic_${materialType}`);
            })
            .catch(error => {
                console.error("Error processing textures for VXB:", error);
                alert("Failed to export as VXB. See console for details.");
            });
    } catch (error) {
        console.error("Error exporting as VXB:", error);
        alert("Failed to export as VXB. See console for details.");
    }
}

function randomizeSettings() {
    // Get all form elements for randomization
    const materialTypeElement = document.getElementById('material-type');
    const patternTypeElement = document.getElementById('pattern-type');
    const baseColorElement = document.getElementById('base-color');
    const baseColorHexElement = document.getElementById('base-color-hex');
    const accentColorElement = document.getElementById('accent-color');
    const accentColorHexElement = document.getElementById('accent-color-hex');
    const noiseScaleElement = document.getElementById('noise-scale');
    const noiseScaleValueElement = document.getElementById('noise-scale-value');
    const noiseStrengthElement = document.getElementById('noise-strength');
    const noiseStrengthValueElement = document.getElementById('noise-strength-value');
    const edgeDarknessElement = document.getElementById('edge-darkness');
    const edgeDarknessValueElement = document.getElementById('edge-darkness-value');
    const depthElement = document.getElementById('depth');
    const depthValueElement = document.getElementById('depth-value');
    const bevelElement = document.getElementById('bevel');
    const bevelValueElement = document.getElementById('bevel-value');
    
    // Randomize material type
    const materialTypes = ['stone', 'dirt', 'wood', 'metal', 'brick', 'sand'];
    const randomMaterial = materialTypes[Math.floor(Math.random() * materialTypes.length)];
    if (materialTypeElement) materialTypeElement.value = randomMaterial;
    
    // Randomize pattern type
    const patternTypes = ['noise', 'cracked', 'checker', 'striped', 'zigzag'];
    const randomPattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    if (patternTypeElement) patternTypeElement.value = randomPattern;
    
    // Randomize colors
    const randomBaseColor = randomColor();
    if (baseColorElement) baseColorElement.value = randomBaseColor;
    if (baseColorHexElement) baseColorHexElement.value = randomBaseColor;
    
    const randomAccentColor = randomColor();
    if (accentColorElement) accentColorElement.value = randomAccentColor;
    if (accentColorHexElement) accentColorHexElement.value = randomAccentColor;
    
    // Randomize sliders
    const randomNoiseScale = Math.floor(Math.random() * 16) + 1;
    if (noiseScaleElement) noiseScaleElement.value = randomNoiseScale;
    if (noiseScaleValueElement) noiseScaleValueElement.value = randomNoiseScale;
    
    const randomNoiseStrength = Math.floor(Math.random() * 100) + 1;
    if (noiseStrengthElement) noiseStrengthElement.value = randomNoiseStrength;
    if (noiseStrengthValueElement) noiseStrengthValueElement.value = randomNoiseStrength;
    
    const randomEdgeDarkness = Math.floor(Math.random() * 100) + 1;
    if (edgeDarknessElement) edgeDarknessElement.value = randomEdgeDarkness;
    if (edgeDarknessValueElement) edgeDarknessValueElement.value = randomEdgeDarkness;
    
    const randomDepth = Math.floor(Math.random() * 100) + 1;
    if (depthElement) depthElement.value = randomDepth;
    if (depthValueElement) depthValueElement.value = randomDepth;
    
    const randomBevel = Math.floor(Math.random() * 100) + 1;
    if (bevelElement) bevelElement.value = randomBevel;
    if (bevelValueElement) bevelValueElement.value = randomBevel;
    
    // Clear all pattern layers when randomizing
    if (window.patternLayerSystem && window.patternLayerSystem.clearAllLayers) {
        window.patternLayerSystem.clearAllLayers();
    }
    
    // Update textures
    updateTextures();
}

function applyPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;
    
    // Apply preset values to form elements
    const materialTypeElement = document.getElementById('material-type');
    const baseColorElement = document.getElementById('base-color');
    const baseColorHexElement = document.getElementById('base-color-hex');
    const accentColorElement = document.getElementById('accent-color');
    const accentColorHexElement = document.getElementById('accent-color-hex');
    const noiseScaleElement = document.getElementById('noise-scale');
    const noiseScaleValueElement = document.getElementById('noise-scale-value');
    const noiseStrengthElement = document.getElementById('noise-strength');
    const noiseStrengthValueElement = document.getElementById('noise-strength-value');
    const patternTypeElement = document.getElementById('pattern-type');
    const edgeDarknessElement = document.getElementById('edge-darkness');
    const edgeDarknessValueElement = document.getElementById('edge-darkness-value');
    const depthElement = document.getElementById('depth');
    const depthValueElement = document.getElementById('depth-value');
    const bevelElement = document.getElementById('bevel');
    const bevelValueElement = document.getElementById('bevel-value');
    
    if (materialTypeElement) materialTypeElement.value = preset.materialType;
    if (baseColorElement) baseColorElement.value = preset.baseColor;
    if (baseColorHexElement) baseColorHexElement.value = preset.baseColor;
    if (accentColorElement) accentColorElement.value = preset.accentColor;
    if (accentColorHexElement) accentColorHexElement.value = preset.accentColor;
    if (noiseScaleElement) noiseScaleElement.value = preset.noiseScale;
    if (noiseScaleValueElement) noiseScaleValueElement.value = preset.noiseScale;
    if (noiseStrengthElement) noiseStrengthElement.value = preset.noiseStrength;
    if (noiseStrengthValueElement) noiseStrengthValueElement.value = preset.noiseStrength;
    if (patternTypeElement) patternTypeElement.value = preset.patternType;
    if (edgeDarknessElement) edgeDarknessElement.value = preset.edgeDarkness;
    if (edgeDarknessValueElement) edgeDarknessValueElement.value = preset.edgeDarkness;
    if (depthElement) depthElement.value = preset.depth;
    if (depthValueElement) depthValueElement.value = preset.depth;
    if (bevelElement) bevelElement.value = preset.bevel;
    if (bevelValueElement) bevelValueElement.value = preset.bevel;
    
    // Clear all pattern layers when applying a preset
    if (window.patternLayerSystem && window.patternLayerSystem.clearAllLayers) {
        window.patternLayerSystem.clearAllLayers();
    }
    
    // Update textures
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

function initCustomTextureHandlers() {
    const faceCanvases = document.querySelectorAll('.face-preview');
    const faceInputs = document.querySelectorAll('.face-input');
    const clearButton = document.getElementById('clear-custom-textures');

    // Add click handler to canvases to trigger file input
    faceCanvases.forEach(canvas => {
        canvas.addEventListener('click', () => {
            const face = canvas.dataset.face;
            const input = document.querySelector(`.face-input[data-face="${face}"]`);
            if (input) input.click();
        });
    });

    // Handle file selection
    faceInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const face = input.dataset.face;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Create a temporary canvas for processing
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = 32;
                    tempCanvas.height = 32;
                    const ctx = tempCanvas.getContext('2d');

                    // Draw and resize the image
                    ctx.drawImage(img, 0, 0, 32, 32);

                    // Update preview
                    const previewCanvas = document.querySelector(`.face-preview[data-face="${face}"]`);
                    if (previewCanvas) {
                        const previewCtx = previewCanvas.getContext('2d');
                        previewCtx.clearRect(0, 0, 64, 64);
                        previewCtx.imageSmoothingEnabled = false;
                        previewCtx.drawImage(tempCanvas, 0, 0, 64, 64);
                    }

                    // Store the processed texture
                    customTextures[face] = tempCanvas;

                    // Update the cube face
                    updateCubeFace(face, tempCanvas);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    });

    // Clear custom textures
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            Object.keys(customTextures).forEach(face => {
                customTextures[face] = null;
                
                // Clear preview
                const previewCanvas = document.querySelector(`.face-preview[data-face="${face}"]`);
                if (previewCanvas) {
                    const ctx = previewCanvas.getContext('2d');
                    ctx.clearRect(0, 0, 64, 64);
                }
                
                // Clear file input
                const input = document.querySelector(`.face-input[data-face="${face}"]`);
                if (input) input.value = '';
            });

            // Regenerate cube textures
            updateTextures();
        });
    }
}

function updateCubeFace(face, textureCanvas) {
    if (textures[face]) {
        textures[face].image = textureCanvas;
        textures[face].needsUpdate = true;
    }
}

function initPanelCollapse() {
    const sections = document.querySelectorAll('.panel-section:not(.primary-actions)');
    
    sections.forEach(section => {
        const heading = section.querySelector('h3');
        const content = section.querySelector('.panel-content');
        
        if (heading && content) {
            // Add aria attributes for accessibility
            heading.setAttribute('role', 'button');
            heading.setAttribute('aria-expanded', 'false'); // Changed from 'true' to 'false' for default collapsed state
            heading.setAttribute('aria-controls', `panel-${section.id || Math.random().toString(36).substr(2, 9)}`);
            content.setAttribute('id', heading.getAttribute('aria-controls'));
            
            // Add click handler
            heading.addEventListener('click', () => {
                const isCollapsed = section.classList.toggle('collapsed');
                heading.setAttribute('aria-expanded', !isCollapsed);
                
                // Save panel state to localStorage
                const panelId = heading.getAttribute('aria-controls');
                localStorage.setItem(`panel-${panelId}-collapsed`, isCollapsed);
            });
            
            // Set default state to collapsed unless localStorage has a specific value
            const panelId = heading.getAttribute('aria-controls');
            const savedState = localStorage.getItem(`panel-${panelId}-collapsed`);
            const isCollapsed = savedState !== null ? savedState === 'true' : true; // Default to true (collapsed) if no saved state
            
            if (isCollapsed) {
                section.classList.add('collapsed');
                heading.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

function initMathControls() {
    const mathPatternsSection = document.getElementById('math-patterns-section');
    const patternTypeSelect = document.getElementById('pattern-type');
    const mathPatternSelect = document.getElementById('math-pattern-type');
    const mathScaleInput = document.getElementById('math-scale');
    const mathScaleValue = document.getElementById('math-scale-value');
    const mathFormula = document.getElementById('math-formula');
    const mathPresetButtons = document.querySelectorAll('.math-preset-btn');
    const mathScaleContainer = document.getElementById('math-scale-container');
    const formulaColorInput = document.getElementById('formula-color');
    const formulaColorHex = document.getElementById('formula-color-hex');
    
    // Show/hide math controls based on pattern type
    patternTypeSelect.addEventListener('change', function() {
        if (this.value === 'math') {
            mathPatternsSection.style.display = 'block';
        } else {
            mathPatternsSection.style.display = 'none';
        }
        updateTextures();
    });
    
    // Initialize state
    mathPatternsSection.style.display = patternTypeSelect.value === 'math' ? 'block' : 'none';
    
    // Math controls event listeners
    mathPatternSelect.addEventListener('change', updateTextures);
    mathScaleInput.addEventListener('input', () => {
        mathScaleValue.value = mathScaleInput.value;
        updateTextures();
    });
    mathScaleValue.addEventListener('input', () => {
        mathScaleInput.value = mathScaleValue.value;
        updateTextures();
    });
    mathFormula.addEventListener('input', () => {
        if (mathFormula.value.trim()) {
            mathPatternSelect.disabled = true;
            // Hide scale container when using custom formula
            mathScaleContainer.style.display = 'none';
        } else {
            mathPatternSelect.disabled = false;
            // Show scale container when not using custom formula
            mathScaleContainer.style.display = 'block';
        }
        updateTextures();
    });
    
    // Initialize scale container visibility based on formula content
    if (mathFormula.value.trim()) {
        mathScaleContainer.style.display = 'none';
    }
    
    // Formula color event listeners
    formulaColorInput.addEventListener('input', () => {
        formulaColorHex.value = formulaColorInput.value;
        updateTextures();
    });
    
    formulaColorHex.addEventListener('input', () => {
        // Validate hex color format
        if (/^#[0-9A-F]{6}$/i.test(formulaColorHex.value)) {
            formulaColorInput.value = formulaColorHex.value;
            updateTextures();
        }
    });
    
    // Math preset buttons
    mathPresetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const preset = button.dataset.preset;
            mathPatternSelect.value = preset;
            mathFormula.value = '';
            mathPatternSelect.disabled = false;
            // Show scale container when using preset
            mathScaleContainer.style.display = 'block';
            updateTextures();
            
            // Update active state
            mathPresetButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Add pattern system script to the page
document.addEventListener('DOMContentLoaded', function() {
    const patternScript = document.createElement('script');
    patternScript.src = 'pattern-layer-system.js';
    document.head.appendChild(patternScript);
});

// Initialize the application when the page loads
window.addEventListener('load', init);
