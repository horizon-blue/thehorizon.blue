import React from 'react';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-coffeescript';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-jade';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-yaml';

/* eslint react/prop-types: 0 */ const prismPlugin = {
  decorators: [
    new PrismDecorator({
      prism: Prism,
      getSyntax(block) {
        const language = block.getData().get('language');
        if (typeof Prism.languages[language] === 'object') {
          return language;
        }
        return null;
      },
      render({ type, children }) {
        return <span className={`prism-token token ${type}`}>{children}</span>;
      },
    }),
  ],
};

export default prismPlugin;
