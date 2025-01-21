import React, { useState } from 'react'
import "./Shipping.css"
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country,State} from "country-state-city" 
import CheckoutSteps from "../Cart/CheckoutSteps.js"
import { saveShippingInfo } from '../../actions/cartAction.js';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const dispatch = useDispatch();
    const {shippingInfo} = useSelector((state)=> state.cart)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pincode, setPincode] = useState(shippingInfo.pincode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const navigate = useNavigate()

    const shippingSubmit = (e)=>{
        e.preventDefault()
        
        dispatch(
            saveShippingInfo({address, city, state, country, pincode, phoneNo})
        )
        navigate("/order/confirm")
        
    }



  return (
    <>
        <MetaData title={"Shipping Details -- DeadStock"}/>
        <CheckoutSteps activeStep={0}/>
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>

                <form encType='multipart/form-data' className="shippingForm">
                    <div>
                        <HomeIcon/>
                        <input type="text" 
                        placeholder='Address'
                        required
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <LocationCityIcon/>
                        <input type="text" 
                        placeholder='City'
                        required
                        value={city}
                        onChange={(e)=> setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <PinDropIcon/>
                        <input type="text" 
                        placeholder='Pin Code'
                        required
                        value={pincode}
                        onChange={(e)=> setPincode(e.target.value)}
                        />
                    </div>

                    <div>
                        <PhoneIcon/>
                        <input type="text" 
                        placeholder='Phone Number'
                        required
                        value={phoneNo}
                        onChange={(e)=> setPhoneNo(e.target.value)}
                        />
                    </div>

                    <div>
                        <PublicIcon/>
                        <select 
                        required
                        value={country}
                        onChange={(e)=> setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {Country && Country.getAllCountries().map((item)=>(
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    {country && (
                        <div>
                            <TransferWithinAStationIcon/>
                            <select 
                            required
                            value={state}
                            onChange={(e)=> setState(e.target.value)}>
                                <option value="">State</option>
                                {State && 
                                State.getStatesOfCountry(country).map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <input type="submit"
                    onClick={shippingSubmit}
                     value="Continue"
                     className='shippingBtn'
                     disabled={state ? false : true} 
                    />


                </form> 
            </div>
        </div>
    </>
  )
}

export default Shipping
