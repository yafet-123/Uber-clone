import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import "mapbox-gl/dist/mapbox-gl.css"
// importing the css since we are using the next.js
import {SelectorContextProvider} from '../context/SelectorContext'
function MyApp({ Component, pageProps }) {
  return(
      <SelectorContextProvider>
        <Component {...pageProps} />
      </SelectorContextProvider>
    )
}

export default MyApp
