import React from "react";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);

const Code = ({jsx, css}) => {

    return (
        <>
        {css &&
            <SyntaxHighlighter language="css" style={atomDark}>
                {css}
            </SyntaxHighlighter>
        }
        {jsx &&
            <SyntaxHighlighter language="jsx" style={atomDark}>
                {jsx}
            </SyntaxHighlighter>
        }
        </>
    )
}

export default Code;