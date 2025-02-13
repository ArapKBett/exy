// New Design - always loaded
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
// dynamically load Roboto fonts when not on homepage or newly designed pages
const loadRobotoFonts = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap" ;
  link.dataset.fontsource = 'roboto'
  document.head.appendChild(link)
}

let robotoLoaded = false

export const onRouteUpdate = ({ location }) => {
  if (!robotoLoaded && location.pathname !== '/') {
    loadRobotoFonts()
    robotoLoaded = true
  }
}
