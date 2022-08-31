import {useEffect} from 'react'
import mapboxgl from "!mapbox-gl"
import tw from 'tailwind-styled-components'

mapboxgl.accessToken = process.env.MapBOXGL_ACCESSSTOKEN;


function Map({pickupCoordinates,dropoffCoordinates}){
	useEffect(() => {
    	const map = new mapboxgl.Map({
      		container: 'map',
      		style: 'mapbox://styles/mapbox/streets-v11',
      		center: [40.4897,9.1450],
      		zoom: 5
    	});
    	if(pickupCoordinates){
    		addtoMap(map,pickupCoordinates)
    	}

    	if(dropoffCoordinates){
    		addtoMap(map,dropoffCoordinates)
    	}

    	// we want auto zoom to the coordinates of pickup and dropoff coordinates to do that we use 
    	// fitBounds 

    	if(pickupCoordinates && dropoffCoordinates){
    		map.fitBounds([
    			pickupCoordinates,
    			dropoffCoordinates
    		],{
    			padding:60
    		})
    	}

  	},[pickupCoordinates,dropoffCoordinates]);

  	// if we put [] empty run only at the first time but if we put something there run this when the
  	// code satisfy or run the useEffect in this code when it get the pickup and dropoff coodrdinate run
  	// we put this because when we fetch the api for pick up and drop off coordinates it take some time
  	// so the code tell it after it get it run the code again

	  // container is where to put the map by giving the wrapper id then put the name of id in the container
	  // style the style of mapbox.gl
	  // to center we gave latitude and longitude
	  // zoom is to zoom the image in and out
	const addtoMap = (map,coordinates)=>{
		const Merkel = new mapboxgl.Marker()
		.setLngLat(coordinates) // the latitude and the longitude
		.addTo(map)
		
	}
	return(
		<Wrapper id="map">

		</Wrapper>
	)
}

export default Map

const Wrapper = tw.div`
	flex-1
`