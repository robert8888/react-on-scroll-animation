
## about
This library was inspired by great [AOS library](https://michalsnik.github.io/aos/). It using its style files and core architecture concepts. The main difference is that this library using intersection observer (with polyfills) instead handling events on scroll, and thanks to react architecture don't have to use mutation observer which one have big involvements on performance during dynamic remounting elements by react.  
## installation
```
npm install react-on-scroll-animation --save
```
```
yarn add react-on-scroll-animation
```
  
## prop definitions  
```javascript  
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
 ```  
## default prop values  
   ```javascript  
  Rosa.defaultProps = { 
	 offset: 0,    
	 delay: 0,    
	 easing: 'ease',    
	 duration: 400,    
	 disable: false,    
	 once: false,    
	 anchorPlacement: 'top-center',    
	 animatedClassName: 'rosa-animate',    
	 initClassName: 'rosa-init',    
	 useClassNames: false,    
	 debounceDelay: 100, 
 }  
 ```
 ## usage  
```javascript  
import "react-on-scroll-animation/build/index.css";
/*Animations are based on css files you can easily 
  overwriting it by you own rules, but you have to import 
  css files from build pack separately. 
  You can import or copy this file directly to your sass file as well.*/
import Rosa from "react-on-scroll-animation"  

<Rosa animation="zoom-in"   
      duration={300}   
      delay={500}>  
 {content} </Rosa>  
```  
```javascript  
<Rosa animation="slide-right"   
      anchor="#someId"   
      anchorPlacement="bottom-top"   
      offset={500}   
      initClassName="custom-init-class">  
 {content} </Rosa>  
```  


## animations  
####  Fades  
* fade-up    
* fade-down    
* fade-right  
* fade-left  
* fade-up-right  
* fade-up-left  
* fade-down-right  
* fade-down-left  
#### Slides  
* slide-up  
* slide-down  
* slide-right  
* slide-left  
#### Zooms  
* zoom-in  
* zoom-in-up  
* zoom-in-down  
* zoom-in-left  
* zoom-in-right  
* zoom-out  
* zoom-out-up  
* zoom-out-down  
* zoom-out-right  
* zoom-out-left  
#### Flips  
* flip-left  
* flip-right  
* fade-up  
* fade-down  
  
## easing  
* linear  
* ease  
* ease-in  
* ease-out  
* ease-in-out  
* ease-in-back  
* ease-out-back  
* ease-in-out-back  
* ease-in-sine  
* ease-out-sine  
* ease-in-out-sine  
* ease-in-quad  
* ease-out-quad  
* ease-in-out-quad  
* ease-in-cubic  
* ease-out-cubic  
* ease-in-out-cubic  
* ease-in-quart  
* ease-out-quart  
* ease-in-out-quart  

### custom animation  
```css
/*style file*/
[data-rosa][data-rosa="custom-animation"]{
  transition-property: transform, opacity;
  transform:  rotate(-100deg) scale(0);
}
[data-rosa="custom-animation"].rosa-animate{
  opacity: 1;
  transform:  rotate(0) scale(1);
}
```

```javascript
//import to local component or globally
import "./style.css";
<Rosa animation="custom-animation"  
      duration={2000}>
        {content} 
</Rosa>
```
----
```css  
/*to have more specific selector enable init class
this allows you overwrite easing duration and delay */  
.rosa[data-rosa][data-rosa="custom-rotating-zoom"]{  
     transition-duration: 690ms; 
     transition-delay: 310ms; 
     transition-property: transform, opacity; 
     transition-timing-function: ease; transform:  rotate(180deg) scale(0);
 }  

.rosa[data-rosa][data-rosa="custom-rotating-zoom"].rosa-animate{  
    opacity: 1; transform:  rotate(0) scale(1);
 }  
```  
```javascript  
<Rosa animation="custom-rotating-zoom"   
      initClassName="rosa" // possibility to write more specific selectors  
      duration={2000}> // this is overwritten by style
        {content} 
</Rosa>  
```  

## custom duration, delays and easing  
Duration and delays based on value quantization to 50ms. If you need be more accurate you can specify your own value in css.  

#### for duration  
```css  
[data-rosa][data-rosa-duration = 999]{ transition-delay: 0s}  
[data-rosa][data-rosa-duration = 999].rosa-animate{  
     transition-delay: 999ms
 }  
```  

#### for delay  
```css  
[data-rosa][data-rosa-delay = 666]{ transition-delay: 0s}  
[data-rosa][data-rosa-delay = 666].rosa-animate{  
    transition-delay: 666ms
 }  
```  
#### for easing 

```css  
[data-rosa][data-rosa=easing="bounce"]{  
    transition-timing-function: cubic-bezier(.61,-1.06,.5,1.83)
}  
```  
## callback  
callback function get two params  
```javasctipt  
callback(animated: boolean, target: HtmlElement){}  
```  
```javascript  
<Rosa animation="side-left"    
      duration={800}  
      callback={(animated, taregt) => {
          if(animated){
              setTimeout(()=> 
                target.closest(".section__code")
                .style.borderColor = "DarkCyan"
              , 1000)
          }
      }}>
        {content} 
</Rosa>
```
  
@param - animated   
* true - if element is animating - thas mean gets .rosa-animate classs  
* false- if class is removed  
  
@param - target  
* HtmlElement which is animated (from IntersectionObserverEntry.target)  

## disabling  
  
```javascript  
<Rosa animation="side-up"   
      disable="mobile">   
	      {content}
</Rosa>  
```  
@param disable  
* string : "mobile" or "phone" or "tablet"  
* boolean  
* function - it will be called on resize and popstate events  
----  
This project was bootstrapped with [Create React Library](https://github.com/dimimikadze/create-react-library).    
    
All library files are located inside **src/lib** folder.    
    
Inside **src/demo** folder, you can test your library while developing.