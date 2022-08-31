import {useEffect, useState} from 'react'
import tw from 'tailwind-styled-components'
import {carList} from '../data/carList.js'

const CarRideSelector = ({pickupCoordinates,dropoffCoordinates})=>{
	const [duration, setduration] = useState(0)
	const [isActive, setisActive] = useState(false)

	const handleClick = () =>{
		setisActive(!isActive)
	}
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
				{carList.map((car,index)=>(
					<Car 
						key={index}
					>
						<CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>{(duration / 60).toFixed(0)} min</Time>
                        </CarDetails>
                        <Price>${(duration/100* car.multiplier).toFixed(2)}</Price>
					</Car>

				))}

			</CarList>
		</Wrapper>
	)
}

export default CarRideSelector

const Wrapper = tw.div`
	flex-1 overflow-y-scroll flex flex-col
`

const Title = tw.div`
	text-gray-500 text-center text-xs py-2 border-b
`

const CarList = tw.div`
	overflow-y-scroll
`

const CarDetails = tw.div`
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

const CarImage = tw.img`
	h-14 mr-4
`

const Car = tw.div`
	flex p-4 items-center
`