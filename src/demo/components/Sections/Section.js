import React, {useMemo} from "react";
import Rosa from "../../../lib";
import Code from "./Code";
import {toTwoCounter} from './helpers/Counter'

const Section = ({title, content}) => {
    const counter = useMemo(() => new toTwoCounter(), []);
    return (
        <section className="section section--examples">
            <h2 className="section__title">{title}</h2>
            {content && content.map((config, index)=>{
                let animation = config;
                if(typeof config === "object"){
                    animation = config.rosa.animation;
                    delete config.rosa.animation;
                }
                return (
                    <Rosa key={animation + index}
                          animation={animation}
                          {...((config?.rosa) ? config.rosa : {})}
                          className={"section__code section__code--" + counter.next()} >
                        <Code css={config.css} jsx={config?.jsx || `<Rosa animation={'${animation}'}>{content}</Rosa>`}/>
                    </Rosa>)
            })}
        </section>
    )
}

export default  Section;