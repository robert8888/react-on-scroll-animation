import React from "react";
import  Rosa from '../../lib';

const Header = props =>{

    return (
        <header className="header">
            <main className="header__main">
                <Rosa animation={"zoom-in"}>
                    <h1 className="header__title">ROSA</h1>
                </Rosa>
                <Rosa animation={"fade-up"} delay={300}>
                    <h2 className="header__subtitle">React On Scroll Animations</h2>
                </Rosa>
            </main>
                <div className="header__scroll">
                    <Rosa animation={"fade-in"} anchorPlacement="top-bottom" delay={800}>
                        <>
                        <span className="header__scroll__text">scroll down</span>
                        <br/>
                        <i className="header__scroll__icon"/>
                        </>
                    </Rosa>
                </div>
        </header>
    )
}

export default Header;