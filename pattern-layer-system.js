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
 * This could be loaded from a JSON file in production
 */
async function loadPatternDatabase() {
    // For now, we'll use the expanded pattern database directly
    // In production, you might want to load this from a JSON file
    try {
        // Check if we already have the database module imported
        if (typeof patternDatabase !== 'undefined') {
            window.patternSystem.patternDatabase = patternDatabase;
            return Promise.resolve();
        }
        
        // Create script element to load the pattern database
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'pattern-database.js';
            script.onload = () => {
                if (typeof patternDatabase !== 'undefined') {
                    window.patternSystem.patternDatabase = patternDatabase;
                    resolve();
                } else {
                    reject(new Error('Pattern database loaded but not defined'));
                }
            };
            script.onerror = () => reject(new Error('Failed to load pattern database'));
            document.head.appendChild(script);
        });
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
    
    // Insert the sidebar into the DOM
    const controlsPanel = document.querySelector('.controls-panel');
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent && controlsPanel) {
        mainContent.insertBefore(patternSidebar, controlsPanel);
        
        // Add CSS class to main content to accommodate the new sidebar
        mainContent.classList.add('with-pattern-sidebar');
    } else {
        console.error('Could not find main-content or controls-panel elements');
    }
    
    // Populate pattern grid
    populatePatternGrid();
    
    // Add CSS for the pattern sidebar
    addPatternStyles();
}

/**
 * Add CSS styles for the pattern system
 */
function addPatternStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Pattern Sidebar Styles */
        .main-content.with-pattern-sidebar {
            display: grid;
            grid-template-columns: 260px 1fr 260px;
            overflow: hidden;
        }
        
        .pattern-sidebar {
            width: 260px;
            min-width: 260px;
            background-color: rgba(18, 18, 18, 0.95);
            padding: 0.75rem;
            overflow-y: auto;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-left: 1px solid rgba(32, 196, 202, 0.3);
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .pattern-sidebar::-webkit-scrollbar {
            width: 6px;
        }
        
        .pattern-sidebar::-webkit-scrollbar-track {
            background: rgba(18, 18, 18, 0.95);
        }
        
        .pattern-sidebar::-webkit-scrollbar-thumb {
            background: rgba(32, 196, 202, 0.3);
            border-radius: 3px;
        }
        
        .pattern-sidebar::-webkit-scrollbar-thumb:hover {
            background: rgba(32, 196, 202, 0.5);
        }
        
        .pattern-header {
            margin-bottom: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(32, 196, 202, 0.3);
        }
        
        .pattern-header h3 {
            color: #20c4ca;
            font-weight: 500;
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }
        
        .face-selector {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }
        
        .face-selector label {
            color: #aaa;
            font-size: 0.8rem;
        }
        
        .face-selector select {
            flex: 1;
            padding: 0.4rem;
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            color: white;
            font-size: 0.85rem;
        }
        
        .pattern-search {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
        }
        
        .pattern-search input,
        .pattern-search select {
            padding: 0.4rem;
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            color: white;
            font-size: 0.85rem;
        }
        
        .pattern-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            overflow-y: auto;
            flex: 1;
            max-height: 300px;
            padding-right: 0.25rem;
            margin-bottom: 0.75rem;
            border-bottom: 1px solid rgba(32, 196, 202, 0.15);
            padding-bottom: 0.75rem;
        }
        
        .pattern-grid::-webkit-scrollbar {
            width: 4px;
        }
        
        .pattern-grid::-webkit-scrollbar-track {
            background: rgba(18, 18, 18, 0.95);
        }
        
        .pattern-grid::-webkit-scrollbar-thumb {
            background: rgba(32, 196, 202, 0.3);
            border-radius: 2px;
        }
        
        .pattern-item {
            aspect-ratio: 1;
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.15s, border-color 0.15s;
            position: relative;
            background-color: rgba(10, 10, 10, 0.4);
        }
        
        .pattern-item:hover {
            transform: scale(1.05);
            border-color: rgba(32, 196, 202, 0.8);
        }
        
        .pattern-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            image-rendering: pixelated;
        }
        
        .pattern-item-tooltip {
            position: absolute;
            bottom: -2.5rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(18, 18, 18, 0.95);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.15s;
            z-index: 10;
            border: 1px solid rgba(32, 196, 202, 0.3);
        }
        
        .pattern-item:hover .pattern-item-tooltip {
            opacity: 1;
        }
        
        .active-layers {
            margin-top: 0.75rem;
        }
        
        .active-layers h4 {
            color: #20c4ca;
            font-weight: 500;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .layer-list {
            max-height: 200px;
            overflow-y: auto;
            margin-bottom: 0.75rem;
        }
        
        .layer-item {
            display: flex;
            align-items: center;
            padding: 0.4rem;
            margin-bottom: 0.25rem;
            background-color: rgba(30, 30, 30, 0.6);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            position: relative;
        }
        
        .layer-item-preview {
            width: 32px;
            height: 32px;
            border-radius: 2px;
            overflow: hidden;
            margin-right: 0.5rem;
            flex-shrink: 0;
            background-color: rgba(10, 10, 10, 0.4);
        }
        
        .layer-item-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            image-rendering: pixelated;
        }
        
        .layer-item-info {
            flex: 1;
            min-width: 0;
        }
        
        .layer-item-name {
            font-size: 0.8rem;
            color: white;
            margin-bottom: 0.15rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .layer-item-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .layer-item-opacity {
            flex: 1;
            height: 4px;
            -webkit-appearance: none;
            background: rgba(32, 196, 202, 0.2);
            border-radius: 2px;
            outline: none;
        }
        
        .layer-item-opacity::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #20c4ca;
            cursor: pointer;
            border: 1px solid rgba(18, 18, 18, 0.95);
        }
        
        .layer-item-color {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border: none;
            border-radius: 2px;
            cursor: pointer;
            box-shadow: 0 0 0 1px rgba(32, 196, 202, 0.3);
        }
        
        .layer-item-color::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        
        .layer-item-color::-webkit-color-swatch {
            border: none;
            border-radius: 2px;
        }
        
        .layer-item-blend {
            padding: 0.15rem 0.25rem;
            font-size: 0.7rem;
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 2px;
            color: white;
        }
        
        .layer-item-delete {
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 59, 59, 0.2);
            border: 1px solid rgba(255, 59, 59, 0.5);
            border-radius: 50%;
            color: #ff5e5e;
            cursor: pointer;
            font-size: 0.7rem;
            transition: all 0.2s;
        }
        
        .layer-item-delete:hover {
            background-color: rgba(255, 59, 59, 0.4);
        }
        
        .layer-item-move {
            cursor: grab;
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(32, 196, 202, 0.1);
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 50%;
            color: #20c4ca;
            font-size: 0.7rem;
        }
        
        .layer-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .layer-actions button {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid rgba(32, 196, 202, 0.3);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
            background-color: rgba(30, 30, 30, 0.6);
            color: white;
            font-weight: 500;
            font-size: 0.85rem;
        }
        
        .layer-actions button:hover {
            background-color: rgba(32, 196, 202, 0.2);
            border-color: #20c4ca;
        }
        
        .layer-actions .primary-btn {
            background-color: #20c4ca;
            border-color: #20c4ca;
            color: #111;
            font-weight: 600;
        }
        
        .layer-actions .primary-btn:hover {
            background-color: #23d8de;
            border-color: #23d8de;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 1200px) {
            .main-content.with-pattern-sidebar {
                grid-template-columns: 1fr;
            }
            
            .pattern-sidebar {
                display: none;
                position: fixed;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 100;
                height: 100vh;
            }
            
            .show-pattern-sidebar .pattern-sidebar {
                display: block;
            }
            
            .pattern-sidebar-toggle {
                display: block;
                position: fixed;
                right: 10px;
                bottom: 10px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #20c4ca;
                color: #111;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                z-index: 101;
                cursor: pointer;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

/**
 * Populate the pattern grid with items from the database
 */
function populatePatternGrid(category = 'all', searchTerm = '') {
    const patternGrid = document.getElementById('pattern-grid');
    if (!patternGrid) return;
    
    // Clear the grid
    patternGrid.innerHTML = '';
    
    // Get patterns from the database
    const database = window.patternSystem.patternDatabase;
    if (!database || !database.patterns) {
        console.error('Pattern database not loaded properly');
        return;
    }
    
    // Filter patterns based on category and search term
    let filteredPatterns = database.patterns;
    
    if (category !== 'all') {
        filteredPatterns = filteredPatterns.filter(pattern => pattern.category === category);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredPatterns = filteredPatterns.filter(pattern => 
            pattern.name.toLowerCase().includes(term) ||
            pattern.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }
    
    // Create pattern items
    filteredPatterns.forEach(pattern => {
        const patternItem = document.createElement('div');
        patternItem.className = 'pattern-item';
        patternItem.dataset.id = pattern.id;
        
        // Create the image element with a placeholder
        const img = document.createElement('img');
        img.src = `patterns/${pattern.src}`;
        img.alt = pattern.name;
        img.onerror = () => {
            img.src = 'placeholder.png';
            console.warn(`Failed to load pattern image: ${pattern.src}`);
        };
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'pattern-item-tooltip';
        tooltip.textContent = pattern.name;
        
        patternItem.appendChild(img);
        patternItem.appendChild(tooltip);
        patternGrid.appendChild(patternItem);
    });
    
    // Update layer list
    updateLayerList();
}

/**
 * Update the layer list for the currently selected face
 */
function updateLayerList() {
    const layerList = document.getElementById('layer-list');
    if (!layerList) return;
    
    // Clear the list
    layerList.innerHTML = '';
    
    // Get layers for the selected face
    const face = window.patternSystem.selectedFace;
    const layers = window.patternSystem.activeLayers[face];
    
    if (layers.length === 0) {
        layerList.innerHTML = '<div class="empty-layer-message">No layers added. Click patterns to add them.</div>';
        return;
    }
    
    // Create layer items
    layers.forEach((layer, index) => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        layerItem.dataset.index = index;
        
        // Get pattern details
        const pattern = window.patternSystem.patternDatabase.patterns.find(p => p.id === layer.patternId);
        if (!pattern) return;
        
        layerItem.innerHTML = `
            <div class="layer-item-preview">
                <img src="patterns/${pattern.src}" alt="${pattern.name}">
            </div>
            <div class="layer-item-info">
                <div class="layer-item-name">${pattern.name}</div>
                <div class="layer-item-controls">
                    <input type="range" class="layer-item-opacity" value="${layer.opacity * 100}" min="0" max="100" title="Opacity">
                    <input type="color" class="layer-item-color" value="${layer.color}" title="Color">
                    <select class="layer-item-blend" title="Blend Mode">
                        <option value="normal" ${layer.blendMode === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="multiply" ${layer.blendMode === 'multiply' ? 'selected' : ''}>Multiply</option>
                        <option value="screen" ${layer.blendMode === 'screen' ? 'selected' : ''}>Screen</option>
                        <option value="overlay" ${layer.blendMode === 'overlay' ? 'selected' : ''}>Overlay</option>
                    </select>
                </div>
            </div>
            <div class="layer-item-move" title="Drag to reorder">⋮</div>
            <div class="layer-item-delete" title="Remove layer">×</div>
        `;
        
        layerList.appendChild(layerItem);
    });
    
    // Add event listeners to layer controls
    addLayerControlEventListeners();
}

/**
 * Add event listeners to layer control elements
 */
function addLayerControlEventListeners() {
    // Opacity sliders
    document.querySelectorAll('.layer-item-opacity').forEach(slider => {
        slider.addEventListener('input', function() {
            const layerItem = this.closest('.layer-item');
            const index = parseInt(layerItem.dataset.index);
            const face = window.patternSystem.selectedFace;
            
            window.patternSystem.activeLayers[face][index].opacity = this.value / 100;
        });
    });
    
    // Color pickers
    document.querySelectorAll('.layer-item-color').forEach(colorPicker => {
        colorPicker.addEventListener('input', function() {
            const layerItem = this.closest('.layer-item');
            const index = parseInt(layerItem.dataset.index);
            const face = window.patternSystem.selectedFace;
            
            window.patternSystem.activeLayers[face][index].color = this.value;
        });
    });
    
    // Blend mode selectors
    document.querySelectorAll('.layer-item-blend').forEach(select => {
        select.addEventListener('change', function() {
            const layerItem = this.closest('.layer-item');
            const index = parseInt(layerItem.dataset.index);
            const face = window.patternSystem.selectedFace;
            
            window.patternSystem.activeLayers[face][index].blendMode = this.value;
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.layer-item-delete').forEach(button => {
        button.addEventListener('click', function() {
            const layerItem = this.closest('.layer-item');
            const index = parseInt(layerItem.dataset.index);
            const face = window.patternSystem.selectedFace;
            
            window.patternSystem.activeLayers[face].splice(index, 1);
            updateLayerList();
        });
    });
    
    // Implement drag-and-drop reordering
    // This is a simple implementation - you might want to use a library for more complex needs
    let draggedItem = null;
    
    document.querySelectorAll('.layer-item-move').forEach(handle => {
        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            draggedItem = this.closest('.layer-item');
            draggedItem.classList.add('dragging');
            
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
        });
    });
    
    function handleDragMove(e) {
        if (!draggedItem) return;
        
        const layerList = document.getElementById('layer-list');
        const layerItems = layerList.querySelectorAll('.layer-item:not(.dragging)');
        
        // Find the item we're dragging over
        let nextItem = null;
        for (const item of layerItems) {
            const rect = item.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            
            if (e.clientY < midY) {
                nextItem = item;
                break;
            }
        }
        
        // Reposition the dragged item
        if (nextItem) {
            layerList.insertBefore(draggedItem, nextItem);
        } else {
            layerList.appendChild(draggedItem);
        }
    }
    
    function handleDragEnd() {
        if (!draggedItem) return;
        
        // Update the layers array
        const face = window.patternSystem.selectedFace;
        const newLayers = [];
        
        document.querySelectorAll('.layer-item').forEach(item => {
            const oldIndex = parseInt(item.dataset.index);
            newLayers.push(window.patternSystem.activeLayers[face][oldIndex]);
        });
        
        window.patternSystem.activeLayers[face] = newLayers;
        
        // Clean up
        draggedItem.classList.remove('dragging');
        draggedItem = null;
        
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        
        // Update the layer list
        updateLayerList();
    }
}

/**
 * Add pattern to the active layers
 * @param {string} patternId - ID of the pattern to add
 */
function addPatternLayer(patternId) {
    const face = window.patternSystem.selectedFace;
    const pattern = window.patternSystem.patternDatabase.patterns.find(p => p.id === patternId);
    
    if (!pattern) {
        console.error(`Pattern not found: ${patternId}`);
        return;
    }
    
    // Create a new layer with default settings
    const newLayer = {
        patternId: patternId,
        opacity: 1,
        color: pattern.defaultColor,
        blendMode: pattern.recommendedBlendModes[0] || 'normal'
    };
    
    // Add the layer to the top of the stack
    window.patternSystem.activeLayers[face].unshift(newLayer);
    
    // Update the UI
    updateLayerList();
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
        const pattern = window.patternSystem.patternDatabase.patterns.find(p => p.id === layer.patternId);
        
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
