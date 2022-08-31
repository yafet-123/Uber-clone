import {useEffect, useState} from 'react'
import tw from 'tailwind-styled-components'
import {BikeList} from '../data/BikeList.js'

const RideSelector = ({pickupCoordinates,dropoffCoordinates})=>{
	const [duration, setduration] = useState(0)

	useEffect(()=>{
		const getDireaction = ()=>{
			fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?`+
					new URLSearchParams({
	                	access_token:process.env.MapBOXGL_ACCESSSTOKEN,
	            	})
			)
			//it is the same thing that we do in the confirm page it take the api from map box by puting
			//pickupcoordinate and dropoff coordinate then it give us the duration then we use that to calculate
			//the price  by multiplying with mulitipilier and then we use toFixed() to minimize the decimal place
			//we use pickup 2 and dropoff coordinate 2 because lat and long
			.then((response) => {
				return response.json()
			})
			.then(data => {
				setduration(data.routes[0].duration)
			})
		}
		if(pickupCoordinates && dropoffCoordinates){
			getDireaction(pickupCoordinates,dropoffCoordinates)
		}
	},[pickupCoordinates,dropoffCoordinates])
	return(
		<Wrapper>
			<Title>Choose a ride, or swipe up for more</Title>

			<CarList>
				{BikeList.map((bike,index)=>(
					<Bike key={index}>
						<BikeImage src={bike.imgUrl} />
                        <BikeDetails>
                            <Service>{bike.service}</Service>
                            <Time>{(duration / 60).toFixed(0)} min</Time>
                        </BikeDetails>
                        <Price>${(duration/100* bike.multiplier).toFixed(2)}</Price>
					</Bike>

				))}

			</CarList>
		</Wrapper>
	)
}

export default RideSelector

const Wrapper = tw.div`
	flex-1 overflow-y-scroll flex flex-col
`

const Title = tw.div`
	text-gray-500 text-center text-xs py-2 border-b
`

const CarList = tw.div`
	overflow-y-scroll
`

const BikeDetails = tw.div`
	flex-1
`
const Service = tw.div`
	font-medium
`
const Time = tw.div`
	text-xs text-blue-500
`
const Price = tw.div`
	text-sm
`

const BikeImage = tw.img`
	h-14 mr-4
`

const Bike = tw.div`
	flex p-4 items-center
`