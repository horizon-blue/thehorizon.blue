#!/bin/bash
echo -e '\033[0;36mStart applying the patch...\033[0m'
echo -e '\033[0;34mdraft-js-markdown-shortcut-plugin...\033[0m'
cp ./draft-js-markdown-shortcut-plugin.js ../node_modules/draft-js-markdown-shortcuts-plugin/lib/components/Image/index.js
echo -e '\033[0;32mDone.\033[0m'