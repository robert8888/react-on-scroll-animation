export default function isBrowserSupported(){
  return (('IntersectionObserver' in window) ||
          ('IntersectionObserverEntry' in window) ||
          ('intersectionRatio' in window.IntersectionObserverEntry.prototype))
}
