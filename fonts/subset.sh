#!/bin/sh
# Re-subset the fonts (needs fonttools + brotli and the source TTFs: Fredoka[wdth,wght].ttf, Nunito[wght].ttf from google/fonts, OFL)
# usage: sh fonts/subset.sh /path/Fredoka.ttf /path/Nunito.ttf
cd "$(dirname "$0")/.."
U="U+0020-007E,U+00A0-00FF,U+0152-0153,U+2010-2027,U+2032-2033,U+20AC,U+2122,U+2190-2193,U+2605-2606,U+2665"
pyftsubset "$1" --unicodes="$U" --layout-features='*' --flavor=woff2 --output-file=fonts/fredoka-sub.woff2
pyftsubset "$2" --unicodes="$U" --layout-features='*' --flavor=woff2 --output-file=fonts/nunito-sub.woff2
