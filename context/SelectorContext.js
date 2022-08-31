import React, {useState, useContext, useEffect} from 'react'

const SelectorContext = React.createContext()

export function useSelectorContext(){
    return useContext(SelectorContext)
}

export function SelectorContextProvider({children}){
	const [selectedRide, setselectedRide ] = useState("")
    const carSelector = () => setselectedRide("car")
  	const bikeSelector = () => setselectedRide("bike") 
    return(
        <SelectorContext.Provider 
        	value={{
        		selectedRide,
        		carSelector,
        		bikeSelector,
        	}}
        >
            {children}
        </SelectorContext.Provider>

        // if we are not loading render children
    )
}