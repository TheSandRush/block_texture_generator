// Add this at the top of pattern-layer-system.js
// Avoid conflicts with existing variables
if (typeof window.patternSystemInitialized === 'undefined') {
    window.patternSystemInitialized = false;
    // Any variables that might conflict should be namespaced
    // For example, if you have a presets variable, rename it to patternPresets
}
// pattern-layer-system.js - Add this file to your project

/**
 * Pattern Layer System for Magic Block
 * This module adds a pattern layer selector and application system
 * that integrates with the existing texture generation pipeline.
 */

// Global state for the pattern system
window.patternSystem = {
    activeLayers: {
        front: [],
        back: [],
        top: [],
        bottom: [],
        left: [],
        right: []
    },
    selectedFace: 'front',
    patternDatabase: null,
    initialized: false
};

/**
 * Initialize the pattern layer system
 * This should be called after the main app is initialized
 */
function initPatternLayerSystem() {
    if (window.patternSystem.initialized) return;
    
    console.log('Initializing Pattern Layer System...');
    
    // Load the pattern database
    loadPatternDatabase()
        .then(() => {
            createPatternSidebar();
            setupPatternEventListeners();
            window.patternSystem.initialized = true;
            console.log('Pattern Layer System initialized successfully');
        })
        .catch(error => {
            console.error('Failed to initialize Pattern Layer System:', error);
        });
}

/**
 * Load the pattern database
 */
async function loadPatternDatabase() {
    try {
        // Check if we already have the database loaded
        if (window.patternDatabase && window.patternDatabase.patterns) {
            window.patternSystem.patternDatabase = {};
            // Convert array to object with id as key
            window.patternDatabase.patterns.forEach(pattern => {
                window.patternSystem.patternDatabase[pattern.id] = pattern;
            });
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Pattern database not found'));
        }
    } catch (error) {
        console.error('Error loading pattern database:', error);
        throw error;
    }
}

/**
 * Create the pattern sidebar UI
 */
function createPatternSidebar() {
    // Create the sidebar container
    const patternSidebar = document.createElement('div');
    patternSidebar.className = 'pattern-sidebar';
    patternSidebar.innerHTML = `
        <div class="pattern-header">
            <h3>Pattern Layers</h3>
            <div class="face-selector">
                <label for="pattern-face-select">Face:</label>
                <select id="pattern-face-select">
                    <option value="front">Front</option>
                    <option value="back">Back</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
        </div>
        <div class="pattern-search">
            <input type="text" id="pattern-search-input" placeholder="Search patterns...">
            <select id="pattern-category-select">
                <option value="all">All Categories</option>
                <option value="geometric">Geometric</option>
                <option value="architectural">Architectural</option>
                <option value="natural">Natural</option>
                <option value="decorative">Decorative</option>
                <option value="technical">Technical</option>
                <option value="gaming">Gaming</option>
            </select>
        </div>
        <div class="pattern-grid" id="pattern-grid"></div>
        <div class="active-layers">
            <h4>Active Layers</h4>
            <div class="layer-list" id="layer-list"></div>
            <div class="layer-actions">
                <button id="apply-layers-btn" class="primary-btn">Apply Layers</button>
                <button id="clear-layers-btn">Clear Layers</button>
            </div>
        </div>
    `;
    
    // Add CSS styles first
    addPatternStyles();
    
    // Insert the sidebar into the DOM
    const mainContent = document.querySelector('.main-content');
    const canvasContainer = document.getElementById('canvas-container');
    
    if (mainContent && canvasContainer) {
        mainContent.insertBefore(patternSidebar, canvasContainer);
        
        // Add CSS class to main content to accommodate the new sidebar
        mainContent.classList.add('with-pattern-sidebar');
        
        // Initialize the pattern grid
        populatePatternGrid();
    } else {
        console.error('Could not find main-content or canvas-container elements');
    }
}

/**
 * Add CSS styles for the pattern system
 */
function addPatternStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Pattern System Layout */
        .main-content {
            display: grid !important;
            grid-template-columns: 260px 1fr 260px !important;
            gap: 1rem;
            height: 100%;
            overflow: hidden;
            padding: 1rem;
        }
        
        #canvas-container {
            grid-column: 2;
            position: relative;
            height: 100%;
            min-height: 400px;
        }
        
        .controls-panel {
            grid-column: 3;
            height: 100%;
            overflow-y: auto;
        }
        
        /* Pattern Sidebar Styles */
        .pattern-sidebar {
            grid-column: 1;
            width: 260px;
            min-width: 260px;
            background-color: rgba(18, 18, 18, 0.95);
            padding: 1rem;
            overflow-y: auto;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-right: 1px solid rgba(32, 196, 202, 0.3);
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .pattern-header {
            border-bottom: 1px solid rgba(32, 196, 202, 0.3);
            padding-bottom: 1rem;
        }
        
        .pattern-header h3 {
            color: rgb(32, 196, 202);
            margin: 0 0 0.5rem 0;
            font-size: 1.2rem;
        }
        
        .face-selector {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .face-selector select {
            width: 100%;
            padding: 0.5rem;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            color: white;
        }
        
        .pattern-search {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .pattern-search input,
        .pattern-search select {
            width: 100%;
            padding: 0.5rem;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            color: white;
        }
        
        .pattern-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            padding: 0.5rem;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .pattern-item {
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.2s ease;
            background: rgba(0, 0, 0, 0.2);
        }
        
        .pattern-item:hover {
            border-color: rgba(32, 196, 202, 0.8);
            transform: translateY(-2px);
        }
        
        .pattern-item.selected {
            border-color: rgba(32, 196, 202, 1);
            box-shadow: 0 0 10px rgba(32, 196, 202, 0.5);
        }
        
        .pattern-item img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .pattern-item span {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 4px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 10px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .active-layers {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .active-layers h4 {
            color: rgb(32, 196, 202);
            margin: 0;
            font-size: 1rem;
        }
        
        .layer-list {
            min-height: 100px;
            max-height: 300px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            padding: 0.5rem;
        }
        
        .layer-item {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            padding: 0.5rem;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            margin-bottom: 0.5rem;
        }
        
        .layer-handle {
            cursor: move;
            padding: 4px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        
        .layer-handle:hover {
            background-color: rgba(32, 196, 202, 0.2);
        }
        
        .layer-handle svg {
            display: block;
        }
        
        .layer-preview {
            width: 32px;
            height: 32px;
            flex-shrink: 0;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
            border: 1px solid rgba(32, 196, 202, 0.3);
        }
        
        .layer-info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .layer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        }
        
        .layer-name {
            font-size: 12px;
            color: white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .remove-layer {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            padding: 3px;
            border: none;
            background: transparent;
            color: rgba(255, 255, 255, 0.5);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .remove-layer:hover {
            background: rgba(255, 0, 0, 0.2);
            color: rgba(255, 0, 0, 0.8);
        }
        
        .layer-controls {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .layer-opacity {
            flex: 1;
            height: 4px;
            -webkit-appearance: none;
            background: rgba(32, 196, 202, 0.3);
            border-radius: 2px;
        }
        
        .layer-opacity::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgb(32, 196, 202);
            cursor: pointer;
        }
        
        .blend-mode-select {
            padding: 2px 4px;
            font-size: 11px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 3px;
            color: white;
        }
        
        /* Layer drag states */
        .layer-item-ghost {
            opacity: 0.5;
            background: rgba(32, 196, 202, 0.1);
        }
        
        .layer-item-chosen {
            background: rgba(32, 196, 202, 0.2);
        }
        
        .layer-item-drag {
            opacity: 0.8;
        }
        
        /* Loading and Error States */
        .pattern-item.loading::after,
        .pattern-item.error::after,
        .pattern-item.no-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .pattern-item.loading::after {
            content: '⌛';
        }
        
        .pattern-item.error::after {
            content: '⚠️';
        }
        
        .pattern-item.no-image::after {
            content: '🖼️';
        }
    `;
    document.head.appendChild(styleElement);
}

/**
 * Create a placeholder canvas with a default pattern
 * @returns {string} Data URL of the placeholder canvas
 */
function createPlaceholderCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Fill with a light gray background
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, 64, 64);
    
    // Draw a simple pattern
    ctx.strokeStyle = '#999999';
    ctx.lineWidth = 2;
    
    // Draw diagonal lines
    for (let i = -64; i < 64; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 64, 64);
        ctx.stroke();
    }
    
    return canvas.toDataURL();
}

/**
 * Populate the pattern grid with items from the database
 */
function populatePatternGrid(category = 'all', searchTerm = '') {
    const grid = document.getElementById('pattern-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const patterns = window.patternDatabase ? window.patternDatabase.patterns : [];
    if (!patterns || !patterns.length) {
        console.error('No patterns found in database');
        return;
    }
    
    patterns.forEach(pattern => {
        // Filter by category if specified
        if (category !== 'all' && pattern.category !== category) return;
        
        // Filter by search term if specified
        if (searchTerm && !pattern.name.toLowerCase().includes(searchTerm.toLowerCase())) return;
        
        const item = document.createElement('div');
        item.className = 'pattern-item';
        item.setAttribute('data-pattern-id', pattern.id);
        
        const img = new Image();
        img.alt = pattern.name;
        img.title = pattern.name;
        
        // Create a loading placeholder
        const loadingPlaceholder = createPlaceholderCanvas();
        img.src = loadingPlaceholder;
        
        // Only try to load the actual image if we have a source
        if (pattern.src) {
            const actualImage = new Image();
            actualImage.onload = () => {
                img.src = actualImage.src;
                item.classList.remove('loading');
            };
            actualImage.onerror = () => {
                // Keep the placeholder on error
                item.classList.add('error');
                console.warn(`Pattern image not found: ${pattern.name}`);
            };
            actualImage.src = pattern.src.startsWith('http') ? pattern.src : `patterns/${pattern.src}`;
        } else {
            item.classList.add('no-image');
        }
        
        const label = document.createElement('span');
        label.textContent = pattern.name;
        
        item.appendChild(img);
        item.appendChild(label);
        grid.appendChild(item);
        
        // Add click handler
        item.addEventListener('click', () => {
            addPatternLayer(pattern.id);
            item.classList.add('selected');
            setTimeout(() => item.classList.remove('selected'), 200);
        });
    });
}

/**
 * Add pattern to the active layers
 * @param {string} patternId - ID of the pattern to add
 */
function addPatternLayer(patternId) {
    const pattern = window.patternSystem.patternDatabase[patternId];
    if (!pattern) return;
    
    const face = window.patternSystem.selectedFace;
    const layerId = `${patternId}-${Date.now()}`;
    
    // Create a new layer with default settings
    const newLayer = {
        id: layerId,
        patternId: patternId,
        name: pattern.name,
        opacity: 1,
        blendMode: 'normal',
        scale: 1,
        rotation: 0,
        offset: { x: 0, y: 0 }
    };
    
    // Add the layer to the active layers for the current face
    window.patternSystem.activeLayers[face].push(newLayer);
    
    // Update the layer list UI
    updateLayerList();
    
    // Apply the updated layers
    applyPatternLayers();
}

/**
 * Update the layer list for the currently selected face
 */
function updateLayerList() {
    const layerList = document.getElementById('layer-list');
    if (!layerList) return;
    
    const face = window.patternSystem.selectedFace;
    const layers = window.patternSystem.activeLayers[face];
    
    layerList.innerHTML = '';
    
    layers.forEach((layer, index) => {
        const item = document.createElement('div');
        item.className = 'layer-item';
        item.setAttribute('data-layer-id', layer.id);
        
        const handle = document.createElement('div');
        handle.className = 'layer-handle';
        handle.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 12 12">
                <circle cx="3" cy="3" r="1.5" fill="rgba(32, 196, 202, 0.5)"/>
                <circle cx="9" cy="3" r="1.5" fill="rgba(32, 196, 202, 0.5)"/>
                <circle cx="3" cy="9" r="1.5" fill="rgba(32, 196, 202, 0.5)"/>
                <circle cx="9" cy="9" r="1.5" fill="rgba(32, 196, 202, 0.5)"/>
            </svg>
        `;
        
        const preview = document.createElement('div');
        preview.className = 'layer-preview';
        
        const pattern = window.patternSystem.patternDatabase[layer.patternId];
        if (pattern && pattern.src) {
            const img = new Image();
            img.onload = () => preview.style.backgroundImage = `url(${img.src})`;
            img.onerror = () => {
                preview.style.backgroundImage = `url(${createPlaceholderCanvas()})`;
            };
            img.src = pattern.src.startsWith('http') ? pattern.src : `patterns/${pattern.src}`;
        } else {
            preview.style.backgroundImage = `url(${createPlaceholderCanvas()})`;
        }
        
        const info = document.createElement('div');
        info.className = 'layer-info';
        info.innerHTML = `
            <div class="layer-header">
                <span class="layer-name">${layer.name}</span>
                <button class="remove-layer" title="Remove Layer">
                    <svg width="14" height="14" viewBox="0 0 14 14">
                        <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <div class="layer-controls">
                <input type="range" class="layer-opacity" value="${layer.opacity * 100}" min="0" max="100"
                    title="Opacity: ${Math.round(layer.opacity * 100)}%">
                <select class="blend-mode-select">
                    <option value="normal">Normal</option>
                    <option value="multiply">Multiply</option>
                    <option value="screen">Screen</option>
                    <option value="overlay">Overlay</option>
                    <option value="darken">Darken</option>
                    <option value="lighten">Lighten</option>
                </select>
            </div>
        `;
        
        item.appendChild(handle);
        item.appendChild(preview);
        item.appendChild(info);
        layerList.appendChild(item);
        
        // Add event listeners for layer controls
        const opacitySlider = info.querySelector('.layer-opacity');
        opacitySlider.addEventListener('input', (e) => {
            layer.opacity = e.target.value / 100;
            opacitySlider.title = `Opacity: ${Math.round(layer.opacity * 100)}%`;
            applyPatternLayers();
        });
        
        const deleteBtn = info.querySelector('.remove-layer');
        deleteBtn.addEventListener('click', () => {
            window.patternSystem.activeLayers[face].splice(index, 1);
            updateLayerList();
            applyPatternLayers();
        });
    });
}

/**
 * Set up event listeners for the pattern system
 */
function setupPatternEventListeners() {
    // Face selector
    const faceSelect = document.getElementById('pattern-face-select');
    if (faceSelect) {
        faceSelect.addEventListener('change', (e) => {
            window.patternSystem.selectedFace = e.target.value;
            updateLayerList();
        });
    }

    // Pattern search
    const searchInput = document.getElementById('pattern-search-input');
    const categorySelect = document.getElementById('pattern-category-select');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            populatePatternGrid(
                categorySelect ? categorySelect.value : 'all',
                searchInput.value.trim()
            );
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            populatePatternGrid(
                categorySelect.value,
                searchInput ? searchInput.value.trim() : ''
            );
        });
    }

    // Layer action buttons
    const applyBtn = document.getElementById('apply-layers-btn');
    const clearBtn = document.getElementById('clear-layers-btn');

    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyPatternLayers();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const face = window.patternSystem.selectedFace;
            window.patternSystem.activeLayers[face] = [];
            updateLayerList();
            applyPatternLayers();
        });
    }

    // Layer list drag and drop
    const layerList = document.getElementById('layer-list');
    if (layerList) {
        new Sortable(layerList, {
            animation: 150,
            handle: '.layer-handle',
            ghostClass: 'layer-item-ghost',
            chosenClass: 'layer-item-chosen',
            dragClass: 'layer-item-drag',
            onEnd: () => {
                // Update layer order based on DOM order
                const face = window.patternSystem.selectedFace;
                const layers = [];
                layerList.querySelectorAll('.layer-item').forEach(item => {
                    const layerId = item.getAttribute('data-layer-id');
                    const existingLayer = window.patternSystem.activeLayers[face].find(l => l.id === layerId);
                    if (existingLayer) {
                        layers.push(existingLayer);
                    }
                });
                window.patternSystem.activeLayers[face] = layers;
                applyPatternLayers();
            }
        });
    }
}

/**
 * Apply the current layer stack to the face texture
 */
function applyPatternLayers() {
    const face = window.patternSystem.selectedFace;
    const layers = window.patternSystem.activeLayers[face];
    
    if (layers.length === 0) {
        console.log(`No layers to apply to ${face} face`);
        return;
    }
    
    // Create a canvas to compose the layers
    const canvas = document.createElement('canvas');
    canvas.width = window.textureSize;
    canvas.height = window.textureSize;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Start with a transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply each layer from bottom to top (reversed from the UI display)
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        const pattern = window.patternSystem.patternDatabase[layer.patternId];
        
        if (!pattern) continue;
        
        // Load the pattern image
        const img = new Image();
        img.src = `patterns/${pattern.src}`;
        
        // Apply the layer when the image is loaded
        img.onload = () => {
            // Draw pattern with proper blending
            applyPatternToCanvas(ctx, img, layer);
            
            // If this is the top layer, apply to the cube face
            if (i === 0) {
                updateCubeTexture(face, canvas);
            }
        };
        
        img.onerror = () => {
            console.error(`Failed to load pattern image: ${pattern.src}`);
        };
    }
}

/**
 * Apply a pattern layer to a canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on
 * @param {HTMLImageElement} img - Pattern image
 * @param {Object} layer - Layer configuration
 */
function applyPatternToCanvas(ctx, img, layer) {
    // Save the current context state
    ctx.save();
    
    // Set blend mode
    ctx.globalCompositeOperation = layer.blendMode;
    
    // Set opacity
    ctx.globalAlpha = layer.opacity;
    
    // Draw the original pattern
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Apply color tint
    if (layer.color && layer.color !== '#000000') {
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = layer.color;
        ctx.globalAlpha = 0.5; // Reduce the intensity of the tint
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    // Restore context
    ctx.restore();
}

/**
 * Update the cube's texture for a specific face
 * @param {string} face - Face to update ('front', 'back', etc.)
 * @param {HTMLCanvasElement} canvas - Canvas with the new texture
 */
function updateCubeTexture(face, canvas) {
    if (!window.textures || !window.textures[face]) {
        console.error(`Texture for face ${face} not found`);
        return;
    }
    
    // Create a temporary canvas to apply the patterns on top of the existing texture
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = window.textureSize;
    tempCanvas.height = window.textureSize;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    
    // First draw the existing texture (if any)
    if (window.textures[face].image) {
        tempCtx.drawImage(window.textures[face].image, 0, 0);
    }
    
    // Then draw the pattern canvas on top
    tempCtx.drawImage(canvas, 0, 0);
    
    // Update the texture
    window.textures[face].image = tempCanvas;
    window.textures[face].needsUpdate = true;
    
    // Update the face preview if it exists
    const facePreview = document.querySelector(`.face-card[data-face="${face}"] canvas`);
    if (facePreview) {
        const previewCtx = facePreview.getContext('2d');
        previewCtx.clearRect(0, 0, facePreview.width, facePreview.height);
        previewCtx.drawImage(tempCanvas, 0, 0, facePreview.width, facePreview.height);
    }
    
    // Update the main preview if we're updating the front face
    if (face === 'front') {
        updatePreviewTexture();
    }
    
    console.log(`Updated ${face} face texture with pattern layers`);
}
