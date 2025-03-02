// Create a global namespace for the VXB Converter functions
window.VxbConverter = (function() {
    // Copy all the functions from vxb-converter.js here, but remove the export keywords
    
    // Return the public API
    return {
        imageFilesToVxb: imageFilesToVxb,
        saveVxbFile: saveVxbFile,
        convertAndSaveMultipleVxb: convertAndSaveMultipleVxb
    };
})();
