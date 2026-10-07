# Documentation fonts

The browser uses the WOFF2 versions of the existing Montserrat variable fonts.
The original TTF files remain available for image generation and future font updates.
WOFF2 preserves the full character map, weight axis, and font metadata; these files
are compressed, not subsetted.

Regenerate both WOFF2 files from this directory with FontTools and Brotli installed
in a temporary Python environment:

```sh
python -m fontTools.ttLib.woff2 compress montserrat-variable-font-wght.ttf
python -m fontTools.ttLib.woff2 compress montserrat-italic-variable-font-wght.ttf
```

Keep the regular font preload in `src/components/Head.astro` and both font declarations
in `src/styles/starlight.css` aligned with these filenames. The italic face loads only
when needed.
