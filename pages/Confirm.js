import {useEffect, useState} from 'react'
import Link from 'next/link'
import tw from 'tailwind-styled-components'
import Map from '../components/Map'
import {useRouter} from 'next/router'
import CarRideSelector from '../components/CarRideSelector'
import BikeRideSelector from '../components/BikeRideSelector'
import {useSelectorContext} from '../context/SelectorContext'

const Confirm = ()=>{
	const {selectedRide} = useSelectorContext()
	const router = useRouter()
	const {pickup, dropoff} = router.query
	// to capture the user router query 

	const [pickupCoordinates, setpickupCoordinates] = useState()
	const [dropoffCoordinates, setdropoffCoordinates] = useState()
	const getPickupCoordinates = (pickup)=>{

		fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + 
			new URLSearchParams({
				access_token:process.env.MapBOXGL_ACCESSSTOKEN,
				limit:1,
				// after + sign we do is pass the query parameter if we do not pass this it will not work
				// query parameter start with ? we do is pass urlsearchparams used to pass the access_token
				// we get the access token from the Map.js when we do that it will give us alot of data
				// especially in features but we need the first one so  we use limit 1 to get the first 
			}))
		// fetch is function to fetch data in this case from api
		// we get this url from mapboxgl it is called geocoding the main purpose it will
		// change the the name of the place in to latitude and longitude
		.then(response => response.json()) // it will get that api fetch from the above line and get in json format
		.then(data=>{
			// console.log(data) //to get all the data but we need is the coordinate to do that we will do this
			// console.log(data.features[0].center)
			setpickupCoordinates(data.features[0].center) 
		})
		// then means run after the above line finish
	}

	const getDropoffCoordinates = (dropoff)=>{

		fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + 
			new URLSearchParams({
				access_token:process.env.MapBOXGL_ACCESSSTOKEN,
				limit:1, 
			}))
		.then(response => response.json())
		.then(data=>{
			// console.log(data.features[0].center) 
			setdropoffCoordinates(data.features[0].center)
		})
	}

	useEffect(()=>{
		getPickupCoordinates(pickup)
		getDropoffCoordinates(dropoff)
		// it will run when the component first run
	},[pickup,dropoff])
	return(
		<Wrapper>
			<ButtonContainer>
                <Link href="/Search" passHref>
                    <BackButton
                        src='https://img.icons8.com/ios-filled/50/000000/left.png'
                    />
                </Link>
            </ButtonContainer>
			<Map
				pickupCoordinates = {pickupCoordinates}
				dropoffCoordinates = {dropoffCoordinates}
			/>
			<RideContainer>
				{ selectedRide == 'car' ?
					<CarRideSelector 
						pickupCoordinates = {pickupCoordinates}
						dropoffCoordinates = {dropoffCoordinates}
					/> 
						:
					<BikeRideSelector 
						pickupCoordinates = {pickupCoordinates}
						dropoffCoordinates = {dropoffCoordinates}
					/>
				}

				<ConfirmButtonContainer>
					<Link href="/" passHref>
	                    <ConfirmButton>
	                        Confirm UberX
	                    </ConfirmButton>
	                </Link>
                </ConfirmButtonContainer>
			</RideContainer>
		</Wrapper>
	)
}

// to pass the pickup coordinate and dropoff coordinate Map.jsin the <Map/>
export default Confirm

const Wrapper = tw.div`
	flex flex-col h-screen
`

const ConfirmButtonContainer = tw.div`
	border-t-2
`


const RideContainer = tw.div`
	flex-1 flex flex-col h-1/2
`


const ConfirmButton = tw.div`
	bg-black text-white my-4 mx-4 py-4 text-center text-xl
`

const ButtonContainer = tw.div`
	rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`

const BackButton = tw.img`
	h-full object-contain 
`