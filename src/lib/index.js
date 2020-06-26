import "intersection-observer";
import React, {useCallback, useRef, useEffect, useState, useMemo} from 'react'
import PropTypes from 'prop-types';
import detect from "./utils/detector";
import isBrowserSupported from "./utils/support";
import debounce from "lodash/debounce";
import "./sass/rosa.scss";

export {default as style} from "./sass/rosa.scss";

export const Rosa = ({
     children,
     anchor,
     animation,
     offset,
     delay,
     easing,
     duration,
     disable: optionDisable,
     once,
 //  mirror  //TODO
     anchorPlacement,
     animatedClassName,
     initClassName,
     useClassNames,
     debounceDelay,
     callback,
     ...rest
 }) => {
    /**
     * reference to intersection observer
     * @type {React.MutableRefObject<IntersectionObserver>}
     */
    const observer = useRef();
    /**
     * reference to animating html element
     * @type {React.MutableRefObject<HTMLElement>}
     */
    const element = useRef(); // html reference element
    /**
     * changing size of  window force re render component
     * @type{object}
     * @property {number} - height
     * @property {number} - width
     */
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    /** guess what :P
     *  @type boolean
     */
    const [isDisabled, setIsDisabled] = useState(false);
    /**
     *  if "once" is true then after animating done receive value true
     *  @type boolean
     */
    const [done, setDone] = useState(false);
    /** time in milliseconds -  time of last state change - to prevent bouncing
     * @type number
     */
    const lastChange = useRef(); // time of last state change - to prevent bouncing

    /**
     * @type {function(string || bool || function): boolean}
     */
    const checkIsDisabled = useCallback(function (optionDisable) {
        return (
            optionDisable === true ||
            (optionDisable === 'mobile' && detect.mobile()) ||
            (optionDisable === 'phone' && detect.phone()) ||
            (optionDisable === 'tablet' && detect.tablet()) ||
            (typeof optionDisable === 'function' && optionDisable() === true)
        );
    }, []);

    /**,
     * updating isDisabled state
     */
    const updateDisabledState = useCallback(()=>{
        setIsDisabled(checkIsDisabled(optionDisable));
    }, [optionDisable, checkIsDisabled, setIsDisabled])

    /**
     * initial after first mounting updating state
     */
    useEffect(function initialDisabledState(){
        updateDisabledState();
    }, [updateDisabledState])

    /**
     * Hook up updating disable state to resize and popstate events
     */
    useEffect(function updateState(){
        const update = debounce(() => updateDisabledState(), debounceDelay);
        window.addEventListener("resize", update);
        window.addEventListener("popstate", update);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("popstate", update);
        }
    }, [updateDisabledState, debounceDelay])

    /**
     * updating window size in response of resize event with debounce
     */
    useEffect(function updateWidowSize() {
        const updateSize = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }, debounceDelay)
        window.addEventListener("resize", updateSize);
        return () => {
            window.removeEventListener("resize", updateSize);
        }
    }, [debounceDelay])

    /**
     * if is set anchor it will be used as observe element fo intersection observer
     */
    const anchorElement = useMemo(function getAnchorElement(){
        let element = null;
        if(typeof anchor === "string"){
            element = document.querySelector(anchor);
        } else if(anchor instanceof HTMLElement){
            element = anchor;
        }
        return element;
    }, [anchor])

    /**
     * creating animation data attributes based on
     * @param isDisabled : boolean
     * @param animation : string
     * @param duration : number
     * @param delay : number
     * @param easing: string
     */
    const animationAttributes = useMemo(function creatingAnimAttr() {
        if(isDisabled) return {};
        return {
            "data-rosa": animation,
            "data-rosa-duration": duration,
            "data-rosa-delay": delay,
            "data-rosa-easing": easing
        }
    }, [isDisabled, animation, duration, delay, easing])

    /**
     *  calculating intersection observer threshold
     *  in respective to witch will be called intersecting callback
     *  @type {function() : string}
     *  @param anchorPlacement: string
     */
    const anchorThreshold = useMemo(function observerThreshold(){
        const [placement] = anchorPlacement.split("-")
        switch (placement) {
            case "top" :
                return 0;
            case "center":
                return .5;
            case "bottom":
                return 1;
            default :
                return 0;
        }
    }, [anchorPlacement])

    /**
     * calculating rootMargin string in format html margin string
     * based on windows size. changing window size involve updating
     * rootMargin string what force building new intersection observer
     * @type {function(): string} return html margin string
     */
    const relativeToRoot = useMemo(function rootMargin(){
        if (!windowSize) return "";
        const height = windowSize.height;
        const [ , placement] = anchorPlacement.split("-")
        switch (placement) {
            case "top" :
                return `0px 0px ${-height + offset}px 0px`;
            case "center":
                return `0px 0px ${(-.5 * height) + offset}px 0px`;
            case "bottom":
                return `0px 0px ${offset}px 0px`;
            default :
                return 0;
        }
    }, [windowSize, offset, anchorPlacement]);

    /**
     * intersection observer option object
     * @type {{rootMargin: (function(): string), threshold: (function(): string), trackVisibility: boolean}}
     */
    const observeOptions = useMemo(function observerConfiguration(){
        return {
            rootMargin: relativeToRoot,
            threshold: anchorThreshold,
            trackVisibility: false,
        }
    }, [anchorThreshold, relativeToRoot])

    /**
     * Creating intersection observer
     * @type {function(IntersectionObserverCallback, IntersectionObserverOptions): IntersectionObserver|null}
     */
    const createObserver = useCallback((callback, options) => {
        observer.current = new IntersectionObserver(callback, options);
        return observer.current;
    }, [observer]);

    /**
     * Destroying IntersectionObserver - disconnecting and realising memory
     */
    const destroyObserver = useCallback(() => {
        observer.current && observer.current.disconnect();
        observer.current = null;
    }, [observer]);

    /**
     * Intersection Observer Callback
     * is called on intersecting event
     * @type {function IntersectionObserverCallback(changes : <IntersectionObserverEntry> )}
     */
    const observerCallback = useCallback((changes) => {
        for (let change of changes) {
            if(lastChange.current && change.time - lastChange.current < Math.min(duration, 200)) return;
            const target = change.target;
            if (change.isIntersecting) {
                target.classList.add(animatedClassName);
                if (useClassNames) {
                    target.classList.add(animation)
                }
                callback && callback(true, target);

                if (once) {
                    destroyObserver();
                    setDone(true);
                }
            } else if(change.boundingClientRect.top > 0 ){
                target.classList.remove(animatedClassName);
                target.classList.remove(animation)
                callback && callback(false, target);
            }
            lastChange.current = change.time;
        }
    }, [animatedClassName, useClassNames, callback, animation, once, duration, setDone, destroyObserver])

    /**
     * if option initClassName is present
     * default or specified class name is added
     * after initialization component
     */
    useEffect(function addInitClass(){
        if(!element.current) return;

        let className = "rosa-init";
        if(typeof initClassName === "string"){
            className = initClassName;
        }

        if(!initClassName || isDisabled || !isBrowserSupported()){
            element.current.classList.remove(className)
            return;
        }

        element.current.classList.add(className);
    }, [element, initClassName, isDisabled])

    /**
     * after component initialization and
     * in reference to changing any of dependencies is
     * created new Intersection Observer object
     */
    useEffect(function init() {
        if (!element.current || !isBrowserSupported() || done) return;
        destroyObserver();
        if (isDisabled) {
            return;
        }
        let op = createObserver(observerCallback, observeOptions);
        op.observe(anchorElement || element.current);
    }, [element, anchorElement, isDisabled, done, createObserver,
             destroyObserver, observerCallback, observeOptions])

    /**
     * Wrapping children component
     */
    return (
        <div ref={element} {...animationAttributes} {...rest}>
            {children}
        </div>
    )
}

Rosa.defaultProps = {
    offset: 0,
    delay: 0,
    easing: 'ease',
    duration: 400,
    disable: false,
    once: false,
   // mirror: false,
    anchorPlacement: 'top-center',
    animatedClassName: 'rosa-animate',
    initClassName: 'rosa-init',
    useClassNames: false,
    debounceDelay: 100,
}

Rosa.propTypes = {
    children: PropTypes.element, // react build in
    anchor: PropTypes.oneOfType([
        PropTypes.element, // react element
        PropTypes.string, // css query selector
    ]),
    animation: PropTypes.string.isRequired, // animation name string - check below available animations
    offset: PropTypes.number, // shifting animation init place in px in respect to anchorPlacement
    delay: PropTypes.number, // animation delay in milliseconds
    easing: PropTypes.string, // easing - check bellow available easing
    duration: PropTypes.number, // - in milliseconds
    disable: PropTypes.oneOfType([
        PropTypes.oneOf(["tablet", "mobile", "phone"]),
        PropTypes.bool, // by passing computed value
        PropTypes.func, // called in response on resize and popstate
    ]),
    once: PropTypes.bool, // if true only animation will be called only once
   // mirror: PropTypes.bool,
    anchorPlacement: PropTypes.oneOf([
        "top-bottom", // top of element in relative to bottom of window
        "top-center", // --""-- in relative to center of window
        "top-top",
        "center-bottom",
        "center-center",
        "center-top", // center of element relative of top of window
        "bottom-bottom",
        "bottom-center",
        "bottom-top",
    ]),
    animatedClassName: PropTypes.string, // custom animation class name - can be use full with custom animations
    initClassName: PropTypes.oneOfType([
        PropTypes.string, // custom init class name - added after component initialization
        PropTypes.bool, // rosa-init class name added after component initialization
    ]),
    useClassNames: PropTypes.bool, // if true add animation name as calls to element
    callback: PropTypes.func, // callback function fired on animation start end rollback
    debounceDelay: PropTypes.number, // window resize debounce time
}

export default Rosa;


