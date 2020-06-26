import React, {useMemo} from "react";
import Section from "./Section";
import examples from "./examples.markups";

const Sections = () => {

    const fades = useMemo(()=>[
        "fade-up",
        "fade-down",
        "fade-right",
        "fade-left",
        "fade-up-right",
        "fade-up-left",
        "fade-down-right",
        "fade-down-left",
    ], [])

    const flips = useMemo(()=>[
        "flip-left",
        "flip-right",
        "flip-up",
        "flip-down",
    ], [])

    const zooms = useMemo(()=>[
        "zoom-in",
        "zoom-in-up",
        "zoom-in-down",
        "zoom-in-left",
        "zoom-in-right",
        "zoom-out",
        "zoom-out-up",
        "zoom-out-down",
        "zoom-out-right",
        "zoom-out-left"
    ], [])

    const various = useMemo(()=>[
        {
            rosa: {
                animation: "zoom-in",
                duration : 300,
                delay: 500,
            },
            jsx:`<Rosa animation="zoom-in" \n\t  duration={300} \n\t  delay={500}>\n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-down",
                duration : 1500,
                easing: "linear",
            },
            jsx:`<Rosa animation="fade-down" \n\t  duration={1500} \n\t  easing="linear">\n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-right",
                offset: -300,
                easing: "ease-in-sine",
            },
            jsx:`<Rosa animation="fade-right" \n\t  offset={-300} \n\t  easing="ease-in-sine">\n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-left",
                duration: 800,
                once: true,
            },
            jsx:`<Rosa animation="fade-left" \n\t  offset={100} \n\t  duration={800} once>\n\t\t{content} \n</Rosa>`
        },
        {
            rosa:{
                animation: "custom-animation",
                duration: 2000,
                offset: 200,
            },
            jsx: examples[0].jsx,
            css: examples[0].css,
        },
        {
            rosa: {
                animation: "slide-right",
                initClassName: "custom-init-class",
                anchor: "#someId",
                anchorPlacement: "bottom-top",
                offset: 500,
            },
            jsx:`<Rosa animation="slide-right" \n\t  anchor="#someId" \n\t  anchorPlacement="bottom-top" \n\t  offset={500} \n\t  initClassName="custom-init-class">\n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "slide-left",
                duration: 800,
                useClassNames: true,
                initClassName: "example",
                callback: (animated) => {
                    if(animated){
                        setTimeout(() => document.querySelector(".example")
                        .closest(".section__code")
                        .style.borderColor = "DarkCyan", 1000)
                    }
                }
            },
            jsx:examples[1].jsx
        },
        {
            rosa:{
                animation: "custom-rotating-zoom",
                initClassName: true,
                duration: 2000,
            },
            jsx: examples[2].jsx,
            css: examples[2].css,
        }
        ,
        {
            rosa: {
                animation: "slide-up",
                disable: "mobile",
            },
            jsx:`<Rosa animation="side-up" \n\t  disable="mobile"> // or tablet | bool | func\n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "slide-down",
                disable: () => Math.random() > .5
                ,
            },
            jsx:`<Rosa animation="side-up" \n\t  disable={//called on resize and popstate \n\t\t\t()=> Math.random() > .5 \n\t\t} >\n\t\t{content} \n</Rosa>`
        }

    ], [])

    const anchors = useMemo(()=>[
        {
            rosa: {
                animation: "fade-left",
                anchorPlacement: "top-center",
            },
            jsx:`<Rosa animation="fade-left" \n\t  anchorPlacement="top-center"> //default\n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-right",
                anchorPlacement: "top-bottom",
                delay: 800,
            },
            jsx:`<Rosa animation="fade-left" \n\t  anchorPlacement="top-bottom" \n\t  delay={800}> {content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-left",
                anchorPlacement: "top-top",
                offset: 100,
            },
            jsx:`<Rosa animation="fade-left" \n\t  anchorPlacement="top-top" \n\t  offset={100}> \n\t\t{content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-right",
                anchorPlacement: "center-bottom",
            },
            jsx:`<Rosa animation="fade-left" \n\t  anchorPlacement="center-bottom" > {content} \n</Rosa>`
        },
        {
            rosa: {
                animation: "fade-left",
                anchorPlacement: "bottom-center",
            },
            jsx:`<Rosa animation="fade-left" \n\t  anchorPlacement="bottom-center"> \n\t\t{content} \n</Rosa>`
        },
    ], [])

    return (
        <main className={"content"}>
            <Section title={"Fade"} content={fades}/>
            <Section title={"Flip"} content={flips}/>
            <Section title={"Zoom"} content={zooms}/>
            <Section title={"Mix of configuration examples"} content={various}/>
            <Section title={"Anchor placement"} content={anchors}/>
        </main>
    )
}

export default Sections;