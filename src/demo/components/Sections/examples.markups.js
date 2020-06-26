
export default [
    {
        css:
`/*style file*/
[data-rosa][data-rosa="custom-animation"]{
  transition-property: transform, opacity;
  transform:  rotate(-100deg) scale(0);
}
[data-rosa="custom-animation"].rosa-animate{
  opacity: 1;
  transform:  rotate(0) scale(1);
}`,
        jsx:`
//import to local component or globally
import "./style.css";
<Rosa animation="custom-animation"  \n\t  duration={2000}>\n\t\t{content} \n</Rosa>
`},
    {
        jsx:`
<Rosa animation="side-left"  
      duration={800}
      useClassNames
      initClassName="example"
      callback={(animated) => {
          if(animated){
              setTimeout(()=> 
                   document.querySelector(".example")
                  .closest(".section__code")
                  .style.borderColor = "DarkCyan"
              , 1000)
          }
      }}>
        {content} 
</Rosa>`
    },{
        css:`
/*to have more specific selector enable init class on 
rosa element this allows you overwrite 
easing duration and delay */
.rosa-init[data-rosa]
[data-rosa="custom-rotating-zoom"]{
  transition-duration: 690ms;
  transition-delay: 310ms;
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transform:  rotate(180deg) scale(0);
}
.rosa-init[data-rosa]
[data-rosa="custom-rotating-zoom"].rosa-animate{
  opacity: 1;
  transform:  rotate(0) scale(1);
}
        `,
        jsx: `<Rosa animation="custom-rotating-zoom" initClassName \n\t  duration={2000}> //this is overwriting by style\n\t\t{content} \n</Rosa>`
    }
]
