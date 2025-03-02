// vxb-converter.js - modified version without export statements
// Change all instances of "export function" to just "function"

/**
 * imageToVxb.js - Utility for converting images to a VXB file
 * 
 * This module provides functionality to convert up to 6 face images to the VXB format
 * used for cube textures, following the specific face arrangement.
 */

// Constants for the VXB format
if (typeof window.VXB_MAGIC === 'undefined') {
    window.VXB_MAGIC = new Uint8Array([0x56, 0x58, 0x42, 0x31]); // "VXB1"
    window.VXB_VERSION = 1.0;
    window.VXB_UNK1 = 0;
    window.VXB_BLOCK_SIZE = 32;
    window.VXB_FACE_COUNT = 6;
    window.VXB_MAX_PALETTE_COLORS = 255;

    // Unknown data blocks required by the format
    window.VXB_UNK8 = new Uint8Array([
        0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
        0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
        0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
        0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
        0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
        0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
    ]);

    window.VXB_UNK9 = new Uint8Array([0x2, 0x0, 0x0, 0x0]);

    window.VXB_MATERIAL_TYPE = new Uint8Array([
        0x44, 0x69, 0x66, 0x66, 0x75, 0x73, 0x65, 0x00,
        0x45, 0x6D, 0x69, 0x73, 0x73, 0x69, 0x76, 0x65, 0x00
    ]);
}

/**
 * Calculate the Euclidean distance between two colors in RGB space
 * 
 * @param {Object} color1 - First color with r, g, b, a properties
 * @param {Object} color2 - Second color with r, g, b, a properties
 * @returns {number} - The distance between the colors
 */
function colorDistance(color1, color2) {
  // Give more weight to alpha differences
  const alphaWeight = 2;
  
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
    Math.pow(color1.g - color2.g, 2) +
    Math.pow(color1.b - color2.b, 2) +
    Math.pow((color1.a - color2.a) * alphaWeight, 2)
  );
}

/**
 * Find the nearest color in a palette to a given color
 * 
 * @param {Object} color - Color to match with r, g, b, a properties
 * @param {Array<Object>} palette - Array of colors to search in
 * @returns {Object} - The nearest color in the palette
 */
function findNearestColor(color, palette) {
  let nearestColor = palette[0];
  let nearestDistance = colorDistance(color, nearestColor);
  
  for (let i = 1; i < palette.length; i++) {
    const distance = colorDistance(color, palette[i]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestColor = palette[i];
    }
  }
  
  return nearestColor;
}

/**
 * Quantize colors to reduce the number of unique colors in the palette
 * 
 * @param {Array<Object>} colors - Array of colors with r, g, b, a properties
 * @param {number} maxColors - Maximum number of colors to keep
 * @returns {Array<Object>} - Reduced color palette
 */
function quantizeColors(colors, maxColors) {
  if (colors.length <= maxColors) {
    return colors;
  }
  
  console.log(`Quantizing ${colors.length} colors to ${maxColors} colors...`);
  
  // Simple median cut algorithm
  // This is a basic implementation - more sophisticated algorithms like
  // k-means clustering would give better results but are more complex
  
  // Step 1: Sort colors by perceived brightness
  const sortedColors = [...colors].sort((a, b) => {
    // Perceived brightness formula: 0.299R + 0.587G + 0.114B
    const brightnessA = 0.299 * a.r + 0.587 * a.g + 0.114 * a.b;
    const brightnessB = 0.299 * b.r + 0.587 * b.g + 0.114 * b.b;
    return brightnessA - brightnessB;
  });
  
  // Step 2: Divide colors into buckets
  const bucketSize = Math.ceil(sortedColors.length / maxColors);
  const quantizedPalette = [];
  
  for (let i = 0; i < maxColors; i++) {
    const startIdx = i * bucketSize;
    let endIdx = Math.min(startIdx + bucketSize, sortedColors.length);
    
    if (startIdx >= sortedColors.length) break;
    
    // Calculate the average color for this bucket
    let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
    let count = 0;
    
    for (let j = startIdx; j < endIdx; j++) {
      sumR += sortedColors[j].r;
      sumG += sortedColors[j].g;
      sumB += sortedColors[j].b;
      sumA += sortedColors[j].a;
      count++;
    }
    
    quantizedPalette.push({
      r: Math.round(sumR / count),
      g: Math.round(sumG / count),
      b: Math.round(sumB / count),
      a: Math.round(sumA / count)
    });
  }
  
  return quantizedPalette;
}

/**
 * Extracts unique colors from an array of ImageData objects for the palette
 * 
 * @param {Array<ImageData>} imagesData - Array of ImageData objects 
 * @returns {Array<Object>} - Array of unique colors {r, g, b, a}
 */
function extractUniqueColors(imagesData) {
  const uniqueColors = new Map();
  
  imagesData.forEach(imageData => {
    const pixelData = imageData.data;
    for (let i = 0; i < pixelData.length; i += 4) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
      const a = pixelData[i + 3];
      const colorKey = `${r},${g},${b},${a}`;
      
      if (!uniqueColors.has(colorKey)) {
        uniqueColors.set(colorKey, { r, g, b, a });
      }
    }
  });
  
  let paletteColors = Array.from(uniqueColors.values());
  
  // If we have more than the maximum allowed colors, we need to quantize
  if (paletteColors.length > VXB_MAX_PALETTE_COLORS) {
    console.warn(`Total unique colors (${paletteColors.length}) exceeds maximum of ${VXB_MAX_PALETTE_COLORS}. Colors will be quantized.`);
    paletteColors = quantizeColors(paletteColors, VXB_MAX_PALETTE_COLORS);
  }
  
  return paletteColors;
}

/**
 * Remaps image pixels to the nearest color in the palette
 * 
 * @param {ImageData} imageData - Image data to remap
 * @param {Array<Object>} palette - The color palette to use
 * @returns {ImageData} - New image data with remapped colors
 */
function remapImageToPalette(imageData, palette) {
  // Create a new ImageData object to avoid modifying the original
  const newImageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  );
  
  const pixelData = newImageData.data;
  
  // For each pixel, find the closest color in the palette
  for (let i = 0; i < pixelData.length; i += 4) {
    const color = {
      r: pixelData[i],
      g: pixelData[i + 1],
      b: pixelData[i + 2],
      a: pixelData[i + 3]
    };
    
    const nearest = findNearestColor(color, palette);
    
    pixelData[i] = nearest.r;
    pixelData[i + 1] = nearest.g;
    pixelData[i + 2] = nearest.b;
    pixelData[i + 3] = nearest.a;
  }
  
  return newImageData;
}

/**
 * Converts an array of ImageData objects to a VXB file buffer
 * 
 * @param {Array<ImageData>} imagesData - Array of 6 ImageData objects for faces in order: right, back, bottom, top, front, left
 * @returns {ArrayBuffer} - The VXB file as an ArrayBuffer
 */
function convertImagesToVxb(imagesData) {
  // Verify we have exactly 6 images
  if (imagesData.length !== 6) {
    throw new Error('Must provide exactly 6 images for cube faces');
  }
  
  // Verify all images are 32x32
  for (let i = 0; i < imagesData.length; i++) {
    if (imagesData[i].width !== 32 || imagesData[i].height !== 32) {
      throw new Error(`Face image ${i} must be 32x32 pixels`);
    }
  }
  
  // Extract unique colors for palette
  const paletteColors = extractUniqueColors(imagesData);
  console.log(`Using palette with ${paletteColors.length} colors`);
  
  // If quantization was performed, we need to remap all image pixels to the new palette
  if (paletteColors.length <= VXB_MAX_PALETTE_COLORS) {
    // Remap all images to use the reduced palette
    const remappedImagesData = imagesData.map(imgData => 
      remapImageToPalette(imgData, paletteColors)
    );
    
    // Use the remapped images for the rest of the process
    imagesData = remappedImagesData;
  }
  
  // Calculate the total size for the VXB file
  const textureSize = 32 * 32 * 4; // 32x32 pixels, 4 bytes per pixel (RGBA)
  const headerSize = 4 + 4 + 4 + 4 + 4 + (6 * 4) + 48 + 4 + 17; // Magic + Version + Unk1 + BlockSize + FaceCount + 6 face indices + Unk8 + Unk9 + MaterialType
  const paletteSize = 1 + (paletteColors.length * 5); // Palette count (1 byte) + colors (5 bytes each: BGRA + padding)
  const totalSize = headerSize + (textureSize * VXB_FACE_COUNT * 2) + paletteSize; // Header + diffuse + emission + palette
  
  // Create an output buffer
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  let offset = 0;
  
  // Write header
  VXB_MAGIC.forEach(byte => {
    view.setUint8(offset++, byte);
  });
  
  view.setFloat32(offset, VXB_VERSION, true); // true for little-endian
  offset += 4;
  
  view.setInt32(offset, VXB_UNK1, true);
  offset += 4;
  
  view.setInt32(offset, VXB_BLOCK_SIZE, true);
  offset += 4;
  
  view.setInt32(offset, VXB_FACE_COUNT, true);
  offset += 4;
  
  // Write face indices - using the index in the array
  // Order: right, back, bottom, top, front, left
  for (let i = 0; i < 6; i++) {
    view.setInt32(offset, i, true); // Each face gets its own index
    offset += 4;
  }
  
  // Write unknown data blocks
  VXB_UNK8.forEach(byte => {
    view.setUint8(offset++, byte);
  });
  
  VXB_UNK9.forEach(byte => {
    view.setUint8(offset++, byte);
  });
  
  VXB_MATERIAL_TYPE.forEach(byte => {
    view.setUint8(offset++, byte);
  });

  // Write texture data for all faces (color textures first)
  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
    const pixelData = imagesData[faceIndex].data;

    
    for (let i = 0; i < pixelData.length; i += 4) {
      // Convert RGBA to BGRA (VXB format uses BGR ordering)
      view.setUint8(offset++, pixelData[i]);     // R
      view.setUint8(offset++, pixelData[i + 1]); // G
      view.setUint8(offset++, pixelData[i + 2]); // B
      view.setUint8(offset++, pixelData[i + 3]); // A

    }

  }
  

  // Write emission texture for all faces (all transparent black)
  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
    for (let i = 0; i < 32 * 32; i++) {
      view.setUint8(offset++, 0); // B
      view.setUint8(offset++, 0); // G
      view.setUint8(offset++, 0); // R
      view.setUint8(offset++, 255); // A (transparent)
    }
  }
  
  // Write the color palette count
  view.setUint8(offset++, paletteColors.length);
  
  // Write each unique color in the palette in BGRA order
  paletteColors.forEach(color => {
    view.setUint8(offset++, color.b); // B
    view.setUint8(offset++, color.g); // G
    view.setUint8(offset++, color.r); // R
    view.setUint8(offset++, color.a); // A
    view.setUint8(offset++, 0);       // Padding
  });
  
  return buffer;
}

/**
 * Converts an array of image files to a VXB file
 * 
 * @param {Array<File|Blob>} imageFiles - Array of 6 image files in order: right, back, bottom, top, front, left
 * @returns {Promise<ArrayBuffer>} - The VXB file as an ArrayBuffer
 */
function imageFilesToVxb(imageFiles) {
  if (imageFiles.length !== 6) {
    throw new Error('Must provide exactly 6 image files for the cube faces');
  }
  
  // Load all images and get their pixel data
  const imagesDataPromises = imageFiles.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to get the pixel data
          const canvas = document.createElement('canvas');
          canvas.width = 32;
          canvas.height = 32;
          const ctx = canvas.getContext('2d');
          
          // Draw the image (this will resize it to 32x32 if it's not already)
          ctx.drawImage(img, 0, 0, 32, 32);
          
          // Get the image data
          const imageData = ctx.getImageData(0, 0, 32, 32);
          resolve(imageData);
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(file);
    });
  });
  
  return Promise.all(imagesDataPromises)
    .then(imagesData => {
      return convertImagesToVxb(imagesData);
    });
}

/**
 * Converts an array of image URLs to a VXB file
 * 
 * @param {Array<string>} imageUrls - Array of 6 image URLs in order: right, back, bottom, top, front, left
 * @returns {Promise<ArrayBuffer>} - The VXB file as an ArrayBuffer
 */
function imageUrlsToVxb(imageUrls) {
  if (imageUrls.length !== 6) {
    throw new Error('Must provide exactly 6 image URLs for the cube faces');
  }
  
  // Load all images and get their pixel data
  const imagesDataPromises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Handle CORS if needed
      
      img.onload = () => {
        // Create a canvas to get the pixel data
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        // Draw the image (this will resize it to 32x32 if it's not already)
        ctx.drawImage(img, 0, 0, 32, 32);
        
        // Get the image data
        const imageData = ctx.getImageData(0, 0, 32, 32);
        resolve(imageData);
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image from URL: ${url}`));
      };
      
      img.src = url;
    });
  });
  
  return Promise.all(imagesDataPromises)
    .then(imagesData => {
      return convertImagesToVxb(imagesData);
    });
}

/**
 * Saves the VXB buffer as a file
 * 
 * @param {ArrayBuffer} vxbBuffer - The VXB file as an ArrayBuffer
 * @param {string} fileName - The name to use for the downloaded file (without extension)
 */
function saveVxbFile(vxbBuffer, fileName) {
  const blob = new Blob([vxbBuffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName || 'block'}.vxb`;
  a.style.display = 'none';
  
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Converts a single image file to VXB where all 6 faces use the same image
 * 
 * @param {File|Blob} imageFile - The image file to convert
 * @returns {Promise<ArrayBuffer>} - The VXB file as an ArrayBuffer
 */
function singleImageToVxb(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas to get the pixel data
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        // Draw the image (this will resize it to 32x32 if it's not already)
        ctx.drawImage(img, 0, 0, 32, 32);
        
        // Get the image data
        const imageData = ctx.getImageData(0, 0, 32, 32);
        
        // Convert to VXB by duplicating the image data 6 times
        try {
          const imagesData = Array(6).fill(imageData);
          const vxbBuffer = convertImagesToVxb(imagesData);
          resolve(vxbBuffer);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(imageFile);
  });
}

/**
 * Complete function to convert multiple image files to VXB and save it
 * 
 * @param {Array<File|Blob>} imageFiles - Array of 6 image files for the cube faces
 * @param {string} fileName - The name to use for the downloaded file (without extension)
 * @returns {Promise<ArrayBuffer>} - The VXB file buffer that was created
 */
function convertAndSaveMultipleVxb(imageFiles, fileName) {
  return imageFilesToVxb(imageFiles)
    .then(vxbBuffer => {
      saveVxbFile(vxbBuffer, fileName);
      return vxbBuffer;
    });
}

/**
 * Complete function to convert a single image file to VXB (duplicated for all faces) and save it
 * 
 * @param {File|Blob} imageFile - The image file to convert
 * @param {string} fileName - The name to use for the downloaded file (without extension)
 * @returns {Promise<ArrayBuffer>} - The VXB file buffer that was created
 */
function convertAndSaveSingleVxb(imageFile, fileName) {
  return singleImageToVxb(imageFile)
    .then(vxbBuffer => {
      saveVxbFile(vxbBuffer, fileName);
      return vxbBuffer;
    });
}

// Add to window object so functions are globally accessible
window.VxbConverter = {
  convertImagesToVxb: convertImagesToVxb,
  imageFilesToVxb: imageFilesToVxb,
  imageUrlsToVxb: imageUrlsToVxb,
  saveVxbFile: saveVxbFile,
  singleImageToVxb: singleImageToVxb,
  convertAndSaveMultipleVxb: convertAndSaveMultipleVxb,
  convertAndSaveSingleVxb: convertAndSaveSingleVxb
};
