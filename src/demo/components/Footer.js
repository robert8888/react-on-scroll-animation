import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('bash', bash);

const Footer = () =>{


    return (
        <footer className="footer">
            <div className="footer__content content">
                <section className="footer__section">
                    <h3 className="section__title">ABOUT</h3>
                    <p className="footer__about">
                        This library was inspired by great <a href={"https://michalsnik.github.io/aos/"}>AOS library</a>. It using its style
                        files and core architecture concepts. The main difference is that
                        this library using intersection observer (with polyfills) instead
                        handling events on scroll, and thanks to react architecture don't
                        have to use mutation observer which one have big involvements on
                        performance during dynamic remounting elements by react.
                    </p>
                </section>
                <section className="footer__section">
                    <h3 className="section__title"> CHECK IT </h3>
                    <a className="footer__button" href="https://github.com/robert8888/react-on-scroll-animation">Check on github </a>
                    <a className="footer__button" href="">Smell on npm</a>
                </section>
                <section className="footer__section">
                    <h3 className="section__title"> INSTALLATION NPM YARN</h3>
                    <SyntaxHighlighter language="bash" style={atomDark}>
                        npm install react-on-scroll-animation --save
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="bash" style={atomDark}>
                        yarn add react-on-scroll-animation
                    </SyntaxHighlighter>
                </section>
            </div>
        </footer>
    )
}

export default Footer;