// pattern-database.js
// Updated to use simple file naming (tile_000 to tile_199)

const patternDatabase = {
  // Configuration and metadata
  config: {
    version: "1.1.0",
    patternSize: 32, // 32x32 pixels
    pathPrefix: "patterns/",
    thumbnailPathPrefix: "patterns/thumbnails/"
  },
  
  // All patterns organized by categories
  patterns: [
    // ============ GEOMETRIC PATTERNS (40 patterns) ============
    {
      id: "geo-stripes-vertical-01",
      name: "Vertical Stripes",
      category: "geometric",
      tags: ["stripes", "vertical", "lines", "basic"],
      src: "geometric/tile_000.png",
      thumbnailSrc: "geometric/tile_000.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply"]
    },
    {
      id: "geo-stripes-horizontal-01",
      name: "Horizontal Stripes",
      category: "geometric",
      tags: ["stripes", "horizontal", "lines", "basic"],
      src: "geometric/tile_001.png",
      thumbnailSrc: "geometric/tile_001.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply"]
    },
    {
      id: "geo-grid-squares-01",
      name: "Square Grid",
      category: "geometric",
      tags: ["grid", "squares", "checkered", "regular"],
      src: "geometric/tile_002.png",
      thumbnailSrc: "geometric/tile_002.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-grid-dots-01",
      name: "Dot Grid",
      category: "geometric",
      tags: ["grid", "dots", "points", "regular"],
      src: "geometric/tile_003.png",
      thumbnailSrc: "geometric/tile_003.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-diagonal-lines-01",
      name: "Diagonal Lines",
      category: "geometric",
      tags: ["diagonal", "lines", "slanted", "stripes"],
      src: "geometric/tile_004.png",
      thumbnailSrc: "geometric/tile_004.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-diagonal-lines-02",
      name: "Diagonal Lines Reverse",
      category: "geometric",
      tags: ["diagonal", "lines", "slanted", "stripes", "reverse"],
      src: "geometric/tile_005.png",
      thumbnailSrc: "geometric/tile_005.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-cross-diagonal-01",
      name: "Diagonal Crosses",
      category: "geometric",
      tags: ["cross", "diagonal", "x", "intersecting"],
      src: "geometric/tile_006.png",
      thumbnailSrc: "geometric/tile_006.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-checkerboard-01",
      name: "Checkerboard",
      category: "geometric",
      tags: ["checker", "squares", "alternating", "chess"],
      src: "geometric/tile_007.png",
      thumbnailSrc: "geometric/tile_007.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply"]
    },
    {
      id: "geo-zigzag-01",
      name: "Zigzag Pattern",
      category: "geometric",
      tags: ["zigzag", "angular", "waves", "lightning"],
      src: "geometric/tile_008.png",
      thumbnailSrc: "geometric/tile_008.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-waves-horizontal-01",
      name: "Horizontal Waves",
      category: "geometric",
      tags: ["waves", "horizontal", "undulating", "curved"],
      src: "geometric/tile_009.png",
      thumbnailSrc: "geometric/tile_009.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "overlay", "soft-light"]
    },
    {
      id: "geo-waves-vertical-01",
      name: "Vertical Waves",
      category: "geometric",
      tags: ["waves", "vertical", "undulating", "curved"],
      src: "geometric/tile_010.png",
      thumbnailSrc: "geometric/tile_010.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "overlay", "soft-light"]
    },
    {
      id: "geo-circular-radial-01",
      name: "Circular Radiation",
      category: "geometric",
      tags: ["circular", "radial", "spokes", "center", "wheel"],
      src: "geometric/tile_011.png",
      thumbnailSrc: "geometric/tile_011.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "screen", "overlay"]
    },
    {
      id: "geo-circular-concentric-01",
      name: "Concentric Circles",
      category: "geometric",
      tags: ["circular", "concentric", "rings", "target", "circle"],
      src: "geometric/tile_012.png",
      thumbnailSrc: "geometric/tile_012.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "screen", "overlay"]
    },
    {
      id: "geo-diamonds-01",
      name: "Diamond Pattern",
      category: "geometric",
      tags: ["diamonds", "rhombus", "grid", "geometric"],
      src: "geometric/tile_013.png",
      thumbnailSrc: "geometric/tile_013.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-triangles-01",
      name: "Triangle Pattern",
      category: "geometric",
      tags: ["triangles", "geometric", "angular", "shapes"],
      src: "geometric/tile_014.png",
      thumbnailSrc: "geometric/tile_014.png",
      tileable: true,
      defaultColor: "#000000", 
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-hexagons-01",
      name: "Hexagon Pattern",
      category: "geometric",
      tags: ["hexagon", "honeycomb", "geometric", "shapes"],
      src: "geometric/tile_015.png",
      thumbnailSrc: "geometric/tile_015.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-grid-isometric-01",
      name: "Isometric Grid",
      category: "geometric",
      tags: ["isometric", "grid", "3d", "cubes", "geometric"],
      src: "geometric/tile_016.png",
      thumbnailSrc: "geometric/tile_016.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-halftone-01",
      name: "Halftone Pattern",
      category: "geometric",
      tags: ["halftone", "dots", "gradient", "comic", "print"],
      src: "geometric/tile_017.png",
      thumbnailSrc: "geometric/tile_017.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-stripes-diagonal-thick",
      name: "Thick Diagonal Stripes",
      category: "geometric",
      tags: ["stripes", "diagonal", "thick", "lines"],
      src: "geometric/tile_018.png",
      thumbnailSrc: "geometric/tile_018.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply"]
    },
    {
      id: "geo-dots-scattered",
      name: "Scattered Dots",
      category: "geometric",
      tags: ["dots", "scattered", "points", "random"],
      src: "geometric/tile_019.png",
      thumbnailSrc: "geometric/tile_019.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    // Additional geometric patterns
    {
      id: "geo-gradient-horizontal-01",
      name: "Horizontal Gradient",
      category: "geometric",
      tags: ["gradient", "horizontal", "fade", "transition"],
      src: "geometric/tile_020.png",
      thumbnailSrc: "geometric/tile_020.png",
      tileable: false,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-gradient-vertical-01",
      name: "Vertical Gradient",
      category: "geometric",
      tags: ["gradient", "vertical", "fade", "transition"],
      src: "geometric/tile_021.png",
      thumbnailSrc: "geometric/tile_021.png",
      tileable: false,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-gradient-radial-01",
      name: "Radial Gradient",
      category: "geometric",
      tags: ["gradient", "radial", "circular", "fade"],
      src: "geometric/tile_022.png",
      thumbnailSrc: "geometric/tile_022.png",
      tileable: false,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-cross-simple-01",
      name: "Simple Crosses",
      category: "geometric",
      tags: ["cross", "plus", "intersecting", "regular"],
      src: "geometric/tile_023.png",
      thumbnailSrc: "geometric/tile_023.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-checkerboard-small",
      name: "Small Checkerboard",
      category: "geometric",
      tags: ["checker", "squares", "alternating", "chess", "small"],
      src: "geometric/tile_024.png",
      thumbnailSrc: "geometric/tile_024.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply"]
    },
    {
      id: "geo-diamonds-small",
      name: "Small Diamonds",
      category: "geometric",
      tags: ["diamonds", "rhombus", "small", "geometric"],
      src: "geometric/tile_025.png",
      thumbnailSrc: "geometric/tile_025.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-dots-grid",
      name: "Grid Dots",
      category: "geometric",
      tags: ["dots", "grid", "regular", "points"],
      src: "geometric/tile_026.png",
      thumbnailSrc: "geometric/tile_026.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-zigzag-horizontal",
      name: "Horizontal Zigzag",
      category: "geometric",
      tags: ["zigzag", "horizontal", "angular", "waves"],
      src: "geometric/tile_027.png",
      thumbnailSrc: "geometric/tile_027.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-zigzag-vertical",
      name: "Vertical Zigzag",
      category: "geometric",
      tags: ["zigzag", "vertical", "angular", "waves"],
      src: "geometric/tile_028.png",
      thumbnailSrc: "geometric/tile_028.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-weave-pattern",
      name: "Weave Pattern",
      category: "geometric",
      tags: ["weave", "interlacing", "basket", "crosshatch"],
      src: "geometric/tile_029.png",
      thumbnailSrc: "geometric/tile_029.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-triangles-grid",
      name: "Triangle Grid",
      category: "geometric",
      tags: ["triangles", "grid", "geometric", "tessellation"],
      src: "geometric/tile_030.png",
      thumbnailSrc: "geometric/tile_030.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-herringbone",
      name: "Herringbone Pattern",
      category: "geometric",
      tags: ["herringbone", "zigzag", "angular", "pattern"],
      src: "geometric/tile_031.png",
      thumbnailSrc: "geometric/tile_031.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-stars-pattern",
      name: "Stars Pattern",
      category: "geometric",
      tags: ["stars", "geometric", "shapes", "repeating"],
      src: "geometric/tile_032.png",
      thumbnailSrc: "geometric/tile_032.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-houndstooth",
      name: "Houndstooth Pattern",
      category: "geometric",
      tags: ["houndstooth", "checkered", "fashion", "textile"],
      src: "geometric/tile_033.png",
      thumbnailSrc: "geometric/tile_033.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-circles-grid",
      name: "Circle Grid",
      category: "geometric",
      tags: ["circles", "grid", "round", "regular"],
      src: "geometric/tile_034.png",
      thumbnailSrc: "geometric/tile_034.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-squares-concentric",
      name: "Concentric Squares",
      category: "geometric",
      tags: ["squares", "concentric", "nested", "geometric"],
      src: "geometric/tile_035.png",
      thumbnailSrc: "geometric/tile_035.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-plus-signs",
      name: "Plus Signs Pattern",
      category: "geometric",
      tags: ["plus", "cross", "signs", "repeating"],
      src: "geometric/tile_036.png",
      thumbnailSrc: "geometric/tile_036.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-grid-dashed",
      name: "Dashed Grid",
      category: "geometric",
      tags: ["grid", "dashed", "lines", "dotted"],
      src: "geometric/tile_037.png",
      thumbnailSrc: "geometric/tile_037.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-irregular-dots",
      name: "Irregular Dots",
      category: "geometric",
      tags: ["dots", "irregular", "random", "scattered"],
      src: "geometric/tile_038.png",
      thumbnailSrc: "geometric/tile_038.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "geo-crosshatch",
      name: "Crosshatch Pattern",
      category: "geometric",
      tags: ["crosshatch", "cross", "hatch", "lines"],
      src: "geometric/tile_039.png",
      thumbnailSrc: "geometric/tile_039.png",
      tileable: true,
      defaultColor: "#000000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    
    // ============ ARCHITECTURAL PATTERNS (40 patterns) ============
    {
      id: "arch-brick-wall-01",
      name: "Brick Wall",
      category: "architectural",
      tags: ["brick", "wall", "masonry", "construction"],
      src: "architectural/tile_040.png",
      thumbnailSrc: "architectural/tile_040.png",
      tileable: true,
      defaultColor: "#800000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-brick-wall-02",
      name: "Brick Wall Alternate",
      category: "architectural",
      tags: ["brick", "wall", "masonry", "construction", "alternate"],
      src: "architectural/tile_041.png",
      thumbnailSrc: "architectural/tile_041.png",
      tileable: true,
      defaultColor: "#800000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-brick-wall-small",
      name: "Brick Wall Small",
      category: "architectural",
      tags: ["brick", "wall", "masonry", "construction", "small"],
      src: "architectural/tile_042.png",
      thumbnailSrc: "architectural/tile_042.png",
      tileable: true,
      defaultColor: "#800000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-brick-wall-herringbone",
      name: "Brick Wall Herringbone",
      category: "architectural",
      tags: ["brick", "wall", "masonry", "herringbone", "pattern"],
      src: "architectural/tile_043.png",
      thumbnailSrc: "architectural/tile_043.png",
      tileable: true,
      defaultColor: "#800000",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-stone-blocks-01",
      name: "Stone Blocks",
      category: "architectural",
      tags: ["stone", "blocks", "wall", "castle", "masonry"],
      src: "architectural/tile_044.png",
      thumbnailSrc: "architectural/tile_044.png",
      tileable: true,
      defaultColor: "#808080",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-stone-blocks-small",
      name: "Stone Blocks Small",
      category: "architectural",
      tags: ["stone", "blocks", "small", "wall", "castle"],
      src: "architectural/tile_045.png",
      thumbnailSrc: "architectural/tile_045.png",
      tileable: true,
      defaultColor: "#808080",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-stone-blocks-large",
      name: "Stone Blocks Large",
      category: "architectural",
      tags: ["stone", "blocks", "large", "wall", "castle"],
      src: "architectural/tile_046.png",
      thumbnailSrc: "architectural/tile_046.png",
      tileable: true,
      defaultColor: "#808080",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-cobblestone-01",
      name: "Cobblestone",
      category: "architectural",
      tags: ["cobblestone", "stone", "road", "path", "irregular"],
      src: "architectural/tile_047.png",
      thumbnailSrc: "architectural/tile_047.png",
      tileable: true,
      defaultColor: "#808080",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-cobblestone-dense",
      name: "Cobblestone Dense",
      category: "architectural",
      tags: ["cobblestone", "stone", "road", "path", "dense"],
      src: "architectural/tile_048.png",
      thumbnailSrc: "architectural/tile_048.png",
      tileable: true,
      defaultColor: "#808080",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-wood-planks-01",
      name: "Wood Planks",
      category: "architectural",
      tags: ["wood", "planks", "boards", "wooden", "floor"],
      src: "architectural/tile_049.png",
      thumbnailSrc: "architectural/tile_049.png",
      tileable: true,
      defaultColor: "#8B4513",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-wood-planks-vertical",
      name: "Wood Planks Vertical",
      category: "architectural",
      tags: ["wood", "planks", "vertical", "boards", "wooden"],
      src: "architectural/tile_050.png",
      thumbnailSrc: "architectural/tile_050.png",
      tileable: true,
      defaultColor: "#8B4513",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-wood-planks-herringbone",
      name: "Wood Planks Herringbone",
      category: "architectural",
      tags: ["wood", "planks", "herringbone", "floor", "pattern"],
      src: "architectural/tile_051.png",
      thumbnailSrc: "architectural/tile_051.png",
      tileable: true,
      defaultColor: "#8B4513",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-wood-logs",
      name: "Wood Logs",
      category: "architectural",
      tags: ["wood", "logs", "timber", "round", "natural"],
      src: "architectural/tile_052.png",
      thumbnailSrc: "architectural/tile_052.png",
      tileable: true,
      defaultColor: "#8B4513",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-tiles-square",
      name: "Square Tiles",
      category: "architectural",
      tags: ["tiles", "square", "floor", "bathroom", "kitchen"],
      src: "architectural/tile_053.png",
      thumbnailSrc: "architectural/tile_053.png",
      tileable: true,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-tiles-small",
      name: "Square Tiles Small",
      category: "architectural",
      tags: ["tiles", "square", "small", "floor", "bathroom"],
      src: "architectural/tile_054.png",
      thumbnailSrc: "architectural/tile_054.png",
      tileable: true,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-tiles-hexagon",
      name: "Hexagon Tiles",
      category: "architectural",
      tags: ["tiles", "hexagon", "floor", "bathroom", "kitchen"],
      src: "architectural/tile_055.png",
      thumbnailSrc: "architectural/tile_055.png",
      tileable: true,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-window-grid",
      name: "Window Grid",
      category: "architectural",
      tags: ["window", "grid", "panes", "glass", "frame"],
      src: "architectural/tile_056.png",
      thumbnailSrc: "architectural/tile_056.png",
      tileable: false,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "screen"]
    },
    {
      id: "arch-window-grid-large",
      name: "Window Grid Large",
      category: "architectural",
      tags: ["window", "grid", "panes", "glass", "large"],
      src: "architectural/tile_057.png",
      thumbnailSrc: "architectural/tile_057.png",
      tileable: false,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "screen"]
    },
    {
      id: "arch-concrete",
      name: "Concrete Texture",
      category: "architectural",
      tags: ["concrete", "cement", "wall", "urban", "industrial"],
      src: "architectural/tile_058.png",
      thumbnailSrc: "architectural/tile_058.png",
      tileable: true,
      defaultColor: "#C0C0C0",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-metal-plate",
      name: "Metal Plate",
      category: "architectural",
      tags: ["metal", "plate", "industrial", "steel", "surface"],
      src: "architectural/tile_059.png",
      thumbnailSrc: "architectural/tile_059.png",
      tileable: true,
      defaultColor: "#A8A8A8",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-metal-plate-rivets",
      name: "Metal Plate Rivets",
      category: "architectural",
      tags: ["metal", "plate", "rivets", "industrial", "steel"],
      src: "architectural/tile_060.png",
      thumbnailSrc: "architectural/tile_060.png",
      tileable: true,
      defaultColor: "#A8A8A8",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-roof-tiles",
      name: "Roof Tiles",
      category: "architectural",
      tags: ["roof", "tiles", "shingles", "house", "building"],
      src: "architectural/tile_061.png",
      thumbnailSrc: "architectural/tile_061.png",
      tileable: true,
      defaultColor: "#8B4513",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-concrete-panels",
      name: "Concrete Panels",
      category: "architectural",
      tags: ["concrete", "panels", "wall", "brutalist", "urban"],
      src: "architectural/tile_062.png",
      thumbnailSrc: "architectural/tile_062.png",
      tileable: true,
      defaultColor: "#C0C0C0",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-marble-tile",
      name: "Marble Tile",
      category: "architectural",
      tags: ["marble", "tile", "floor", "luxury", "stone"],
      src: "architectural/tile_063.png",
      thumbnailSrc: "architectural/tile_063.png",
      tileable: true,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-granite-tile",
      name: "Granite Tile",
      category: "architectural",
      tags: ["granite", "stone", "tile", "floor", "speckled"],
      src: "architectural/tile_064.png",
      thumbnailSrc: "architectural/tile_064.png",
      tileable: true,
      defaultColor: "#808080",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-mosaic-tile",
      name: "Mosaic Tiles",
      category: "architectural",
      tags: ["mosaic", "tiles", "small", "colorful", "bathroom"],
      src: "architectural/tile_065.png",
      thumbnailSrc: "architectural/tile_065.png",
      tileable: true,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
    {
      id: "arch-diagonal-tile",
      name: "Diagonal Tiles",
      category: "architectural",
      tags: ["diagonal", "tiles", "floor", "pattern", "slanted"],
      src: "architectural/tile_066.png",
      thumbnailSrc: "architectural/tile_066.png",
      tileable: true,
      defaultColor: "#FFFFFF",
      recommendedBlendModes: ["normal", "multiply", "overlay"]
    },
{
  id: "arch-terra-cotta",
  name: "Terra Cotta Tiles",
  category: "architectural",
  tags: ["terra cotta", "clay", "tiles", "roof", "red"],
  src: "architectural/tile_067.png",
  thumbnailSrc: "architectural/tile_067.png",
  tileable: true,
  defaultColor: "#CD5C5C",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-corrugated-metal",
  name: "Corrugated Metal",
  category: "architectural",
  tags: ["corrugated", "metal", "sheet", "industrial", "roof"],
  src: "architectural/tile_068.png",
  thumbnailSrc: "architectural/tile_068.png",
  tileable: true,
  defaultColor: "#A8A8A8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-slate-tiles",
  name: "Slate Tiles",
  category: "architectural",
  tags: ["slate", "stone", "tiles", "roof", "natural"],
  src: "architectural/tile_069.png",
  thumbnailSrc: "architectural/tile_069.png",
  tileable: true,
  defaultColor: "#2F4F4F",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-concrete-scored",
  name: "Scored Concrete",
  category: "architectural",
  tags: ["concrete", "scored", "lines", "industrial", "paving"],
  src: "architectural/tile_070.png",
  thumbnailSrc: "architectural/tile_070.png",
  tileable: true,
  defaultColor: "#C0C0C0",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-woven-metal",
  name: "Woven Metal",
  category: "architectural",
  tags: ["woven", "metal", "mesh", "industrial", "screen"],
  src: "architectural/tile_071.png",
  thumbnailSrc: "architectural/tile_071.png",
  tileable: true,
  defaultColor: "#A8A8A8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-bamboo-weave",
  name: "Bamboo Weave",
  category: "architectural",
  tags: ["bamboo", "weave", "natural", "panel", "asian"],
  src: "architectural/tile_072.png",
  thumbnailSrc: "architectural/tile_072.png",
  tileable: true,
  defaultColor: "#DEB887",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-stucco",
  name: "Stucco Texture",
  category: "architectural",
  tags: ["stucco", "plaster", "wall", "rough", "finish"],
  src: "architectural/tile_073.png",
  thumbnailSrc: "architectural/tile_073.png",
  tileable: true,
  defaultColor: "#E8E8E8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-parquet-floor",
  name: "Parquet Floor",
  category: "architectural",
  tags: ["parquet", "wood", "floor", "geometric", "luxury"],
  src: "architectural/tile_074.png",
  thumbnailSrc: "architectural/tile_074.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-acoustic-tile",
  name: "Acoustic Ceiling Tile",
  category: "architectural",
  tags: ["acoustic", "ceiling", "tile", "office", "perforated"],
  src: "architectural/tile_075.png",
  thumbnailSrc: "architectural/tile_075.png",
  tileable: true,
  defaultColor: "#F0F0F0",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-ceramic-tile-pattern",
  name: "Ceramic Tile Pattern",
  category: "architectural",
  tags: ["ceramic", "tile", "pattern", "decorative", "floor"],
  src: "architectural/tile_076.png",
  thumbnailSrc: "architectural/tile_076.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-cobblestone-radial",
  name: "Radial Cobblestone",
  category: "architectural",
  tags: ["cobblestone", "radial", "pavement", "circular", "stone"],
  src: "architectural/tile_077.png",
  thumbnailSrc: "architectural/tile_077.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-shoji-screen",
  name: "Shoji Screen",
  category: "architectural",
  tags: ["shoji", "screen", "asian", "japanese", "paper"],
  src: "architectural/tile_078.png",
  thumbnailSrc: "architectural/tile_078.png",
  tileable: true,
  defaultColor: "#F5F5F5",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "arch-lattice",
  name: "Lattice Pattern",
  category: "architectural",
  tags: ["lattice", "garden", "fence", "wood", "screen"],
  src: "architectural/tile_079.png",
  thumbnailSrc: "architectural/tile_079.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},

// ============ NATURAL PATTERNS (40 patterns) ============
{
  id: "nat-grass-texture",
  name: "Grass Texture",
  category: "natural",
  tags: ["grass", "vegetation", "ground", "nature", "outdoor"],
  src: "natural/tile_080.png",
  thumbnailSrc: "natural/tile_080.png",
  tileable: true,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-grass-dense",
  name: "Dense Grass",
  category: "natural",
  tags: ["grass", "dense", "vegetation", "ground", "nature"],
  src: "natural/tile_081.png",
  thumbnailSrc: "natural/tile_081.png",
  tileable: true,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-dirt",
  name: "Dirt Texture",
  category: "natural",
  tags: ["dirt", "soil", "ground", "earth", "terrain"],
  src: "natural/tile_082.png",
  thumbnailSrc: "natural/tile_082.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-dirt-rough",
  name: "Rough Dirt",
  category: "natural",
  tags: ["dirt", "rough", "soil", "ground", "earth"],
  src: "natural/tile_083.png",
  thumbnailSrc: "natural/tile_083.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-dirt-pebbles",
  name: "Dirt with Pebbles",
  category: "natural",
  tags: ["dirt", "pebbles", "stones", "ground", "earth"],
  src: "natural/tile_084.png",
  thumbnailSrc: "natural/tile_084.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-water-surface",
  name: "Water Surface",
  category: "natural",
  tags: ["water", "waves", "surface", "ocean", "sea"],
  src: "natural/tile_085.png",
  thumbnailSrc: "natural/tile_085.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "nat-water-ripples",
  name: "Water Ripples",
  category: "natural",
  tags: ["water", "ripples", "surface", "pond", "lake"],
  src: "natural/tile_086.png",
  thumbnailSrc: "natural/tile_086.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "nat-stone",
  name: "Stone Texture",
  category: "natural",
  tags: ["stone", "rock", "ground", "natural", "rough"],
  src: "natural/tile_087.png",
  thumbnailSrc: "natural/tile_087.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-stone-rough",
  name: "Rough Stone",
  category: "natural",
  tags: ["stone", "rock", "rough", "ground", "natural"],
  src: "natural/tile_088.png",
  thumbnailSrc: "natural/tile_088.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-stone-cracked",
  name: "Cracked Stone",
  category: "natural",
  tags: ["stone", "cracked", "rock", "ground", "natural"],
  src: "natural/tile_089.png",
  thumbnailSrc: "natural/tile_089.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-leaves",
  name: "Leaves Pattern",
  category: "natural",
  tags: ["leaves", "foliage", "plant", "tree", "bush"],
  src: "natural/tile_090.png",
  thumbnailSrc: "natural/tile_090.png",
  tileable: true,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-leaves-dense",
  name: "Dense Leaves",
  category: "natural",
  tags: ["leaves", "dense", "foliage", "plant", "tree"],
  src: "natural/tile_091.png",
  thumbnailSrc: "natural/tile_091.png",
  tileable: true,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-sand",
  name: "Sand Texture",
  category: "natural",
  tags: ["sand", "beach", "desert", "ground", "grainy"],
  src: "natural/tile_092.png",
  thumbnailSrc: "natural/tile_092.png",
  tileable: true,
  defaultColor: "#F4A460",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-sand-ripples",
  name: "Sand Ripples",
  category: "natural",
  tags: ["sand", "ripples", "beach", "desert", "dunes"],
  src: "natural/tile_093.png",
  thumbnailSrc: "natural/tile_093.png",
  tileable: true,
  defaultColor: "#F4A460",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-snow",
  name: "Snow Texture",
  category: "natural",
  tags: ["snow", "winter", "cold", "ground", "white"],
  src: "natural/tile_094.png",
  thumbnailSrc: "natural/tile_094.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-ice",
  name: "Ice Texture",
  category: "natural",
  tags: ["ice", "frozen", "cold", "winter", "crystal"],
  src: "natural/tile_095.png",
  thumbnailSrc: "natural/tile_095.png",
  tileable: true,
  defaultColor: "#ADD8E6",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "nat-lava",
  name: "Lava Flow",
  category: "natural",
  tags: ["lava", "magma", "fire", "hot", "volcanic"],
  src: "natural/tile_096.png",
  thumbnailSrc: "natural/tile_096.png",
  tileable: true,
  defaultColor: "#FF4500",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "nat-clouds",
  name: "Cloud Pattern",
  category: "natural",
  tags: ["clouds", "sky", "weather", "fluffy", "air"],
  src: "natural/tile_097.png",
  thumbnailSrc: "natural/tile_097.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "screen", "soft-light"]
},
{
  id: "nat-tree-bark",
  name: "Tree Bark",
  category: "natural",
  tags: ["bark", "tree", "wood", "natural", "organic"],
  src: "natural/tile_098.png",
  thumbnailSrc: "natural/tile_098.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-moss",
  name: "Moss Texture",
  category: "natural",
  tags: ["moss", "vegetation", "green", "nature", "ground"],
  src: "natural/tile_099.png",
  thumbnailSrc: "natural/tile_099.png",
  tileable: true,
  defaultColor: "#006400",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-mud",
  name: "Mud Texture",
  category: "natural",
  tags: ["mud", "dirt", "wet", "ground", "messy"],
  src: "natural/tile_100.png",
  thumbnailSrc: "natural/tile_100.png",
  tileable: true,
  defaultColor: "#5D4037",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-pebbles",
  name: "Pebbles",
  category: "natural",
  tags: ["pebbles", "stones", "rocks", "small", "ground"],
  src: "natural/tile_101.png",
  thumbnailSrc: "natural/tile_101.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-water-deep",
  name: "Deep Water",
  category: "natural",
  tags: ["water", "deep", "ocean", "sea", "blue"],
  src: "natural/tile_102.png",
  thumbnailSrc: "natural/tile_102.png",
  tileable: true,
  defaultColor: "#000080",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "nat-gravel",
  name: "Gravel Texture",
  category: "natural",
  tags: ["gravel", "stones", "ground", "path", "construction"],
  src: "natural/tile_103.png",
  thumbnailSrc: "natural/tile_103.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-rock-face",
  name: "Rock Face",
  category: "natural",
  tags: ["rock", "cliff", "mountain", "stone", "natural"],
  src: "natural/tile_104.png",
  thumbnailSrc: "natural/tile_104.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-volcanic-rock",
  name: "Volcanic Rock",
  category: "natural",
  tags: ["volcanic", "rock", "basalt", "porous", "black"],
  src: "natural/tile_105.png",
  thumbnailSrc: "natural/tile_105.png",
  tileable: true,
  defaultColor: "#2F2F2F",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-sandstone",
  name: "Sandstone",
  category: "natural",
  tags: ["sandstone", "rock", "desert", "layered", "sedimentary"],
  src: "natural/tile_106.png",
  thumbnailSrc: "natural/tile_106.png",
  tileable: true,
  defaultColor: "#D2B48C",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-pine-needles",
  name: "Pine Needles",
  category: "natural",
  tags: ["pine", "needles", "evergreen", "forest", "ground"],
  src: "natural/tile_107.png",
  thumbnailSrc: "natural/tile_107.png",
  tileable: true,
  defaultColor: "#006400",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-ferns",
  name: "Fern Pattern",
  category: "natural",
  tags: ["ferns", "plants", "leaves", "forest", "undergrowth"],
  src: "natural/tile_108.png",
  thumbnailSrc: "natural/tile_108.png",
  tileable: true,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-coral",
  name: "Coral Texture",
  category: "natural",
  tags: ["coral", "ocean", "reef", "marine", "underwater"],
  src: "natural/tile_109.png",
  thumbnailSrc: "natural/tile_109.png",
  tileable: true,
  defaultColor: "#FF7F50",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-flower-bed",
  name: "Flower Bed",
  category: "natural",
  tags: ["flowers", "garden", "colorful", "plants", "floral"],
  src: "natural/tile_110.png",
  thumbnailSrc: "natural/tile_110.png",
  tileable: true,
  defaultColor: "#FF69B4",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-algae",
  name: "Algae Pattern",
  category: "natural",
  tags: ["algae", "water", "green", "pond", "slimy"],
  src: "natural/tile_111.png",
  thumbnailSrc: "natural/tile_111.png",
  tileable: true,
  defaultColor: "#006400",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-lichen",
  name: "Lichen Texture",
  category: "natural",
  tags: ["lichen", "fungus", "rock", "pattern", "organic"],
  src: "natural/tile_112.png",
  thumbnailSrc: "natural/tile_112.png",
  tileable: true,
  defaultColor: "#8FBC8F",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-reeds",
  name: "Reed Pattern",
  category: "natural",
  tags: ["reeds", "water", "plants", "marsh", "vertical"],
  src: "natural/tile_113.png",
  thumbnailSrc: "natural/tile_113.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-wheat-field",
  name: "Wheat Field",
  category: "natural",
  tags: ["wheat", "field", "grain", "farm", "gold"],
  src: "natural/tile_114.png",
  thumbnailSrc: "natural/tile_114.png",
  tileable: true,
  defaultColor: "#DAA520",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-desert-cracked",
  name: "Cracked Desert",
  category: "natural",
  tags: ["desert", "cracked", "dry", "earth", "arid"],
  src: "natural/tile_115.png",
  thumbnailSrc: "natural/tile_115.png",
  tileable: true,
  defaultColor: "#D2B48C",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-mushrooms",
  name: "Mushroom Pattern",
  category: "natural",
  tags: ["mushrooms", "fungi", "forest", "ground", "organic"],
  src: "natural/tile_116.png",
  thumbnailSrc: "natural/tile_116.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-starry-sky",
  name: "Starry Sky",
  category: "natural",
  tags: ["stars", "sky", "night", "space", "cosmic"],
  src: "natural/tile_117.png",
  thumbnailSrc: "natural/tile_117.png",
  tileable: true,
  defaultColor: "#000080",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "nat-autumn-leaves",
  name: "Autumn Leaves",
  category: "natural",
  tags: ["autumn", "leaves", "fall", "orange", "seasonal"],
  src: "natural/tile_118.png",
  thumbnailSrc: "natural/tile_118.png",
  tileable: true,
  defaultColor: "#FF8C00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-jungle-floor",
  name: "Jungle Floor",
  category: "natural",
  tags: ["jungle", "forest", "floor", "tropical", "vegetation"],
  src: "natural/tile_119.png",
  thumbnailSrc: "natural/tile_119.png",
  tileable: true,
  defaultColor: "#006400",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "nat-crystal-formation",
  name: "Crystal Formation",
  category: "natural",
  tags: ["crystal", "mineral", "gem", "geometric", "shiny"],
  src: "natural/tile_120.png",
  thumbnailSrc: "natural/tile_120.png",
  tileable: true,
  defaultColor: "#E0FFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
// ============ DECORATIVE PATTERNS (20 patterns) ============
{
  id: "dec-skull-pixel",
  name: "Pixel Skull",
  category: "decorative",
  tags: ["skull", "pixel", "outline", "character", "game"],
  src: "decorative/tile_121.png",
  thumbnailSrc: "decorative/tile_121.png",
  tileable: false,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "dec-heart-pixel",
  name: "Pixel Heart",
  category: "decorative",
  tags: ["heart", "pixel", "love", "game", "symbol"],
  src: "decorative/tile_122.png",
  thumbnailSrc: "decorative/tile_122.png",
  tileable: false,
  defaultColor: "#FF0000",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "dec-stars",
  name: "Star Pattern",
  category: "decorative",
  tags: ["stars", "night", "sky", "space", "celestial"],
  src: "decorative/tile_123.png",
  thumbnailSrc: "decorative/tile_123.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "dec-stars-dense",
  name: "Dense Star Pattern",
  category: "decorative",
  tags: ["stars", "dense", "night", "sky", "space"],
  src: "decorative/tile_124.png",
  thumbnailSrc: "decorative/tile_124.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "dec-floral",
  name: "Floral Pattern",
  category: "decorative",
  tags: ["floral", "flowers", "plant", "nature", "decorative"],
  src: "decorative/tile_125.png",
  thumbnailSrc: "decorative/tile_125.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-floral-dense",
  name: "Dense Floral Pattern",
  category: "decorative",
  tags: ["floral", "dense", "flowers", "plant", "decorative"],
  src: "decorative/tile_126.png",
  thumbnailSrc: "decorative/tile_126.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-celtic-knot",
  name: "Celtic Knot",
  category: "decorative",
  tags: ["celtic", "knot", "historical", "intricate", "pattern"],
  src: "decorative/tile_127.png",
  thumbnailSrc: "decorative/tile_127.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-swirl",
  name: "Swirl Pattern",
  category: "decorative",
  tags: ["swirl", "spiral", "decorative", "curved", "flowing"],
  src: "decorative/tile_128.png",
  thumbnailSrc: "decorative/tile_128.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-mandala",
  name: "Mandala Pattern",
  category: "decorative",
  tags: ["mandala", "geometric", "spiritual", "circular", "symmetrical"],
  src: "decorative/tile_129.png",
  thumbnailSrc: "decorative/tile_129.png",
  tileable: false,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-damask",
  name: "Damask Pattern",
  category: "decorative",
  tags: ["damask", "ornamental", "floral", "elegant", "vintage"],
  src: "decorative/tile_130.png",
  thumbnailSrc: "decorative/tile_130.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-polka-dot",
  name: "Polka Dot Pattern",
  category: "decorative",
  tags: ["polka", "dots", "spotted", "circular", "retro"],
  src: "decorative/tile_131.png",
  thumbnailSrc: "decorative/tile_131.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-chevron",
  name: "Chevron Pattern",
  category: "decorative",
  tags: ["chevron", "zigzag", "geometric", "angular", "decorative"],
  src: "decorative/tile_132.png",
  thumbnailSrc: "decorative/tile_132.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-paisley",
  name: "Paisley Pattern",
  category: "decorative",
  tags: ["paisley", "teardrop", "ornamental", "curved", "decorative"],
  src: "decorative/tile_133.png",
  thumbnailSrc: "decorative/tile_133.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-heraldic",
  name: "Heraldic Pattern",
  category: "decorative",
  tags: ["heraldic", "medieval", "coat of arms", "royal", "historic"],
  src: "decorative/tile_134.png",
  thumbnailSrc: "decorative/tile_134.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-arabesque",
  name: "Arabesque Pattern",
  category: "decorative",
  tags: ["arabesque", "islamic", "geometric", "intricate", "ornamental"],
  src: "decorative/tile_135.png",
  thumbnailSrc: "decorative/tile_135.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-art-deco",
  name: "Art Deco Pattern",
  category: "decorative",
  tags: ["art deco", "geometric", "1920s", "elegant", "stylized"],
  src: "decorative/tile_136.png",
  thumbnailSrc: "decorative/tile_136.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-victorian",
  name: "Victorian Pattern",
  category: "decorative",
  tags: ["victorian", "ornate", "vintage", "elegant", "floral"],
  src: "decorative/tile_137.png",
  thumbnailSrc: "decorative/tile_137.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-moroccan",
  name: "Moroccan Pattern",
  category: "decorative",
  tags: ["moroccan", "tiles", "geometric", "islamic", "colorful"],
  src: "decorative/tile_138.png",
  thumbnailSrc: "decorative/tile_138.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-geometric-ornament",
  name: "Geometric Ornament",
  category: "decorative",
  tags: ["geometric", "ornament", "decorative", "symmetrical", "repeating"],
  src: "decorative/tile_139.png",
  thumbnailSrc: "decorative/tile_139.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "dec-baroque",
  name: "Baroque Pattern",
  category: "decorative",
  tags: ["baroque", "ornate", "historical", "lavish", "scrolls"],
  src: "decorative/tile_140.png",
  thumbnailSrc: "decorative/tile_140.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},

// ============ TECHNICAL PATTERNS (20 patterns) ============
{
  id: "tech-circuit",
  name: "Circuit Pattern",
  category: "technical",
  tags: ["circuit", "electronic", "technology", "computer", "digital"],
  src: "technical/tile_141.png",
  thumbnailSrc: "technical/tile_141.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-circuit-dense",
  name: "Dense Circuit",
  category: "technical",
  tags: ["circuit", "dense", "electronic", "technology", "computer"],
  src: "technical/tile_142.png",
  thumbnailSrc: "technical/tile_142.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-grid",
  name: "Technical Grid",
  category: "technical",
  tags: ["grid", "technical", "blueprint", "schematic", "engineering"],
  src: "technical/tile_143.png",
  thumbnailSrc: "technical/tile_143.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-binary",
  name: "Binary Code",
  category: "technical",
  tags: ["binary", "code", "computer", "digital", "numbers"],
  src: "technical/tile_144.png",
  thumbnailSrc: "technical/tile_144.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-hexagon-grid",
  name: "Hexagon Grid",
  category: "technical",
  tags: ["hexagon", "grid", "technical", "science", "geometry"],
  src: "technical/tile_145.png",
  thumbnailSrc: "technical/tile_145.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-blueprint",
  name: "Blueprint Pattern",
  category: "technical",
  tags: ["blueprint", "architecture", "engineering", "technical", "drawing"],
  src: "technical/tile_146.png",
  thumbnailSrc: "technical/tile_146.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "multiply"]
},
{
  id: "tech-mechanical",
  name: "Mechanical Pattern",
  category: "technical",
  tags: ["mechanical", "gears", "cogs", "machinery", "industrial"],
  src: "technical/tile_147.png",
  thumbnailSrc: "technical/tile_147.png",
  tileable: true,
  defaultColor: "#A8A8A8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "tech-matrix",
  name: "Matrix Pattern",
  category: "technical",
  tags: ["matrix", "code", "digital", "computer", "tech"],
  src: "technical/tile_148.png",
  thumbnailSrc: "technical/tile_148.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-qr-code",
  name: "QR Code Style",
  category: "technical",
  tags: ["qr", "code", "scanning", "digital", "square"],
  src: "technical/tile_149.png",
  thumbnailSrc: "technical/tile_149.png",
  tileable: false,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply"]
},
{
  id: "tech-digital-noise",
  name: "Digital Noise",
  category: "technical",
  tags: ["digital", "noise", "static", "distortion", "interference"],
  src: "technical/tile_150.png",
  thumbnailSrc: "technical/tile_150.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "tech-radar",
  name: "Radar Pattern",
  category: "technical",
  tags: ["radar", "sonar", "scanning", "circular", "technical"],
  src: "technical/tile_151.png",
  thumbnailSrc: "technical/tile_151.png",
  tileable: false,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-microchip",
  name: "Microchip Pattern",
  category: "technical",
  tags: ["microchip", "cpu", "processor", "electronic", "computer"],
  src: "technical/tile_152.png",
  thumbnailSrc: "technical/tile_152.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-keyboard",
  name: "Keyboard Pattern",
  category: "technical",
  tags: ["keyboard", "keys", "computer", "input", "technology"],
  src: "technical/tile_153.png",
  thumbnailSrc: "technical/tile_153.png",
  tileable: true,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "tech-waveform",
  name: "Audio Waveform",
  category: "technical",
  tags: ["waveform", "audio", "sound", "wave", "music"],
  src: "technical/tile_154.png",
  thumbnailSrc: "technical/tile_154.png",
  tileable: true,
  defaultColor: "#00FFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-data-flow",
  name: "Data Flow",
  category: "technical",
  tags: ["data", "flow", "network", "digital", "stream"],
  src: "technical/tile_155.png",
  thumbnailSrc: "technical/tile_155.png",
  tileable: true,
  defaultColor: "#00FFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-barcode",
  name: "Barcode Pattern",
  category: "technical",
  tags: ["barcode", "scanning", "retail", "inventory", "lines"],
  src: "technical/tile_156.png",
  thumbnailSrc: "technical/tile_156.png",
  tileable: true,
  defaultColor: "#000000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "tech-hud",
  name: "HUD Interface",
  category: "technical",
  tags: ["hud", "interface", "digital", "futuristic", "display"],
  src: "technical/tile_157.png",
  thumbnailSrc: "technical/tile_157.png",
  tileable: false,
  defaultColor: "#00FFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-oscilloscope",
  name: "Oscilloscope Wave",
  category: "technical",
  tags: ["oscilloscope", "wave", "electronic", "signal", "measurement"],
  src: "technical/tile_158.png",
  thumbnailSrc: "technical/tile_158.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-isometric-cubes",
  name: "Isometric Cubes",
  category: "technical",
  tags: ["isometric", "cubes", "3d", "geometric", "tech"],
  src: "technical/tile_159.png",
  thumbnailSrc: "technical/tile_159.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "tech-motherboard",
  name: "Motherboard Trace",
  category: "technical",
  tags: ["motherboard", "pcb", "circuit", "computer", "traces"],
  src: "technical/tile_160.png",
  thumbnailSrc: "technical/tile_160.png",
  tileable: true,
  defaultColor: "#00FF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
// ============ GAMING PATTERNS (40 patterns) ============
{
  id: "game-retro-block",
  name: "Retro Game Block",
  category: "gaming",
  tags: ["retro", "game", "block", "pixel", "8-bit"],
  src: "gaming/tile_161.png",
  thumbnailSrc: "gaming/tile_161.png",
  tileable: true,
  defaultColor: "#FFA500",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-brick",
  name: "Game Brick",
  category: "gaming",
  tags: ["brick", "game", "platform", "pixel", "wall"],
  src: "gaming/tile_162.png",
  thumbnailSrc: "gaming/tile_162.png",
  tileable: true,
  defaultColor: "#800000",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-coin",
  name: "Game Coin",
  category: "gaming",
  tags: ["coin", "currency", "collectible", "game", "pixel"],
  src: "gaming/tile_163.png",
  thumbnailSrc: "gaming/tile_163.png",
  tileable: false,
  defaultColor: "#FFD700",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-enemy",
  name: "Game Enemy",
  category: "gaming",
  tags: ["enemy", "character", "creature", "monster", "pixel"],
  src: "gaming/tile_164.png",
  thumbnailSrc: "gaming/tile_164.png",
  tileable: false,
  defaultColor: "#FF0000",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-grass",
  name: "Game Grass",
  category: "gaming",
  tags: ["grass", "vegetation", "ground", "pixel", "game"],
  src: "gaming/tile_165.png",
  thumbnailSrc: "gaming/tile_165.png",
  tileable: true,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-water",
  name: "Game Water",
  category: "gaming",
  tags: ["water", "liquid", "ocean", "pixel", "game"],
  src: "gaming/tile_166.png",
  thumbnailSrc: "gaming/tile_166.png",
  tileable: true,
  defaultColor: "#0000FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-crate",
  name: "Game Crate",
  category: "gaming",
  tags: ["crate", "box", "container", "pixel", "game"],
  src: "gaming/tile_167.png",
  thumbnailSrc: "gaming/tile_167.png",
  tileable: false,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-health",
  name: "Game Health Icon",
  category: "gaming",
  tags: ["health", "heart", "life", "power-up", "pixel"],
  src: "gaming/tile_168.png",
  thumbnailSrc: "gaming/tile_168.png",
  tileable: false,
  defaultColor: "#FF0000",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-lava",
  name: "Game Lava",
  category: "gaming",
  tags: ["lava", "fire", "hazard", "hot", "pixel"],
  src: "gaming/tile_169.png",
  thumbnailSrc: "gaming/tile_169.png",
  tileable: true,
  defaultColor: "#FF4500",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-metal",
  name: "Game Metal Block",
  category: "gaming",
  tags: ["metal", "block", "industrial", "steel", "pixel"],
  src: "gaming/tile_170.png",
  thumbnailSrc: "gaming/tile_170.png",
  tileable: true,
  defaultColor: "#C0C0C0",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-stone",
  name: "Game Stone Block",
  category: "gaming",
  tags: ["stone", "rock", "block", "pixel", "game"],
  src: "gaming/tile_171.png",
  thumbnailSrc: "gaming/tile_171.png",
  tileable: true,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-wood",
  name: "Game Wood Block",
  category: "gaming",
  tags: ["wood", "block", "platform", "pixel", "game"],
  src: "gaming/tile_172.png",
  thumbnailSrc: "gaming/tile_172.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-sand",
  name: "Game Sand",
  category: "gaming",
  tags: ["sand", "desert", "ground", "pixel", "game"],
  src: "gaming/tile_173.png",
  thumbnailSrc: "gaming/tile_173.png",
  tileable: true,
  defaultColor: "#F4A460",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-ice",
  name: "Game Ice",
  category: "gaming",
  tags: ["ice", "frozen", "slippery", "cold", "pixel"],
  src: "gaming/tile_174.png",
  thumbnailSrc: "gaming/tile_174.png",
  tileable: true,
  defaultColor: "#ADD8E6",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-cloud",
  name: "Game Cloud",
  category: "gaming",
  tags: ["cloud", "sky", "platform", "pixel", "game"],
  src: "gaming/tile_175.png",
  thumbnailSrc: "gaming/tile_175.png",
  tileable: false,
  defaultColor: "#FFFFFF",
  recommendedBlendModes: ["normal", "screen", "soft-light"]
},
{
  id: "game-dirt",
  name: "Game Dirt",
  category: "gaming",
  tags: ["dirt", "soil", "ground", "pixel", "game"],
  src: "gaming/tile_176.png",
  thumbnailSrc: "gaming/tile_176.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-ladder",
  name: "Game Ladder",
  category: "gaming",
  tags: ["ladder", "climb", "vertical", "pixel", "game"],
  src: "gaming/tile_177.png",
  thumbnailSrc: "gaming/tile_177.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-spikes",
  name: "Game Spikes",
  category: "gaming",
  tags: ["spikes", "hazard", "trap", "danger", "pixel"],
  src: "gaming/tile_178.png",
  thumbnailSrc: "gaming/tile_178.png",
  tileable: true,
  defaultColor: "#A8A8A8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-door",
  name: "Game Door",
  category: "gaming",
  tags: ["door", "entrance", "exit", "pixel", "game"],
  src: "gaming/tile_179.png",
  thumbnailSrc: "gaming/tile_179.png",
  tileable: false,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-key",
  name: "Game Key",
  category: "gaming",
  tags: ["key", "unlock", "item", "collectible", "pixel"],
  src: "gaming/tile_180.png",
  thumbnailSrc: "gaming/tile_180.png",
  tileable: false,
  defaultColor: "#FFD700",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-checkpoint",
  name: "Game Checkpoint",
  category: "gaming",
  tags: ["checkpoint", "save", "flag", "progress", "pixel"],
  src: "gaming/tile_181.png",
  thumbnailSrc: "gaming/tile_181.png",
  tileable: false,
  defaultColor: "#FF0000",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-gem",
  name: "Game Gem",
  category: "gaming",
  tags: ["gem", "crystal", "treasure", "collectible", "pixel"],
  src: "gaming/tile_182.png",
  thumbnailSrc: "gaming/tile_182.png",
  tileable: false,
  defaultColor: "#00FFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-explosion",
  name: "Game Explosion",
  category: "gaming",
  tags: ["explosion", "boom", "effect", "fire", "pixel"],
  src: "gaming/tile_183.png",
  thumbnailSrc: "gaming/tile_183.png",
  tileable: false,
  defaultColor: "#FF4500",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-powerup",
  name: "Game Power-Up",
  category: "gaming",
  tags: ["power-up", "item", "collectible", "boost", "pixel"],
  src: "gaming/tile_184.png",
  thumbnailSrc: "gaming/tile_184.png",
  tileable: false,
  defaultColor: "#FFFF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-star",
  name: "Game Star",
  category: "gaming",
  tags: ["star", "bonus", "collectible", "score", "pixel"],
  src: "gaming/tile_185.png",
  thumbnailSrc: "gaming/tile_185.png",
  tileable: false,
  defaultColor: "#FFFF00",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-chest",
  name: "Game Chest",
  category: "gaming",
  tags: ["chest", "treasure", "storage", "reward", "pixel"],
  src: "gaming/tile_186.png",
  thumbnailSrc: "gaming/tile_186.png",
  tileable: false,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-bridge",
  name: "Game Bridge",
  category: "gaming",
  tags: ["bridge", "crossing", "platform", "horizontal", "pixel"],
  src: "gaming/tile_187.png",
  thumbnailSrc: "gaming/tile_187.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-fence",
  name: "Game Fence",
  category: "gaming",
  tags: ["fence", "barrier", "wood", "boundary", "pixel"],
  src: "gaming/tile_188.png",
  thumbnailSrc: "gaming/tile_188.png",
  tileable: true,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-sign",
  name: "Game Sign",
  category: "gaming",
  tags: ["sign", "information", "directions", "message", "pixel"],
  src: "gaming/tile_189.png",
  thumbnailSrc: "gaming/tile_189.png",
  tileable: false,
  defaultColor: "#8B4513",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-shield",
  name: "Game Shield",
  category: "gaming",
  tags: ["shield", "defense", "protection", "item", "pixel"],
  src: "gaming/tile_190.png",
  thumbnailSrc: "gaming/tile_190.png",
  tileable: false,
  defaultColor: "#A8A8A8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-sword",
  name: "Game Sword",
  category: "gaming",
  tags: ["sword", "weapon", "attack", "item", "pixel"],
  src: "gaming/tile_191.png",
  thumbnailSrc: "gaming/tile_191.png",
  tileable: false,
  defaultColor: "#A8A8A8",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-potion",
  name: "Game Potion",
  category: "gaming",
  tags: ["potion", "magic", "bottle", "item", "pixel"],
  src: "gaming/tile_192.png",
  thumbnailSrc: "gaming/tile_192.png",
  tileable: false,
  defaultColor: "#FF00FF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-mushroom",
  name: "Game Mushroom",
  category: "gaming",
  tags: ["mushroom", "power-up", "grow", "item", "pixel"],
  src: "gaming/tile_193.png",
  thumbnailSrc: "gaming/tile_193.png",
  tileable: false,
  defaultColor: "#FF0000",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-tree",
  name: "Game Tree",
  category: "gaming",
  tags: ["tree", "nature", "plant", "forest", "pixel"],
  src: "gaming/tile_194.png",
  thumbnailSrc: "gaming/tile_194.png",
  tileable: false,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-rock",
  name: "Game Rock",
  category: "gaming",
  tags: ["rock", "stone", "boulder", "obstacle", "pixel"],
  src: "gaming/tile_195.png",
  thumbnailSrc: "gaming/tile_195.png",
  tileable: false,
  defaultColor: "#808080",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-bush",
  name: "Game Bush",
  category: "gaming",
  tags: ["bush", "plant", "shrub", "vegetation", "pixel"],
  src: "gaming/tile_196.png",
  thumbnailSrc: "gaming/tile_196.png",
  tileable: false,
  defaultColor: "#00AA00",
  recommendedBlendModes: ["normal", "multiply", "overlay"]
},
{
  id: "game-crystal",
  name: "Game Crystal",
  category: "gaming",
  tags: ["crystal", "gem", "mineral", "shiny", "pixel"],
  src: "gaming/tile_197.png",
  thumbnailSrc: "gaming/tile_197.png",
  tileable: false,
  defaultColor: "#00FFFF",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-torch",
  name: "Game Torch",
  category: "gaming",
  tags: ["torch", "fire", "light", "medieval", "pixel"],
  src: "gaming/tile_198.png",
  thumbnailSrc: "gaming/tile_198.png",
  tileable: false,
  defaultColor: "#FF4500",
  recommendedBlendModes: ["normal", "screen", "overlay"]
},
{
  id: "game-portal",
  name: "Game Portal",
  category: "gaming",
  tags: ["portal", "teleport", "magic", "transport", "pixel"],
  src: "gaming/tile_199.png",
  thumbnailSrc: "gaming/tile_199.png",
  tileable: false,
  defaultColor: "#9932CC",
  recommendedBlendModes: ["normal", "screen", "overlay"]
}

// Add these helper functions to the end of your pattern-database.js file

  // Helper function to get patterns by category
  getPatternsByCategory: function(category) {
    return this.patterns.filter(pattern => pattern.category === category);
  },
  
  // Helper function to search patterns by tags
  searchPatternsByTags: function(tags) {
    return this.patterns.filter(pattern => 
      tags.some(tag => pattern.tags.includes(tag))
    );
  },
  
  // Helper function to get a pattern by ID
  getPatternById: function(id) {
    return this.patterns.find(pattern => pattern.id === id);
  },
  
  // Get all available categories
  getCategories: function() {
    const categories = new Set();
    this.patterns.forEach(pattern => categories.add(pattern.category));
    return Array.from(categories);
  },
  
  // Get all available tags
  getAllTags: function() {
    const tags = new Set();
    this.patterns.forEach(pattern => {
      pattern.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  },
  
  // Get random patterns
  getRandomPatterns: function(count = 5) {
    const shuffled = [...this.patterns].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};

// Export for use in browser
window.patternDatabase = patternDatabase;
