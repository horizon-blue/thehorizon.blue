import React from 'react';
import { CompositeDecorator } from 'draft-js';
import katex from 'katex';
import PropTypes from 'prop-types';

const compositeDecorator = new CompositeDecorator([
    {
        strategy: handleTeX,
        component: TeXSpan,
    },
    {
        strategy: hashtagStrategy,
        component: HashtagSpan,
    },
]);

const TEX_REGEX = /\$([^$]*)\$/g;

function handleTeX(contentBlock, callback, contentState) {
    findWithRegex(TEX_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();

    let matchArr, start;
    matchArr = regex.exec(text);
    while (matchArr !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
        matchArr = regex.exec(text);
    }
}

const TeXSpan = props => {
    console.log(katex.renderToString(props.children));
    return <span {...props}>{katex.renderToString(props.children)}</span>;
};

TeXSpan.propTypes = {
    children: PropTypes.object,
};

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function hashtagStrategy(contentBlock, callback, contentState) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

const HashtagSpan = props => {
    return <span {...props} style={styles.hashtag}>{props.children}</span>;
};

export default compositeDecorator;
