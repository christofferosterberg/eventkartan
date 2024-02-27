import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function AddressInput({ label, name, value, setPlace, setZip }) {

  const [addressValue, setAddressValue] = useState(value)
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "SE" },
    fields: ["geometry", "address_components"],
    types: ["address"]
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener('place_changed', onPLaceChanged)
  }, []);

  function onPLaceChanged() {
    const place = autoCompleteRef.current.getPlace()
    if (!place.geometry) {
      console.log("inget valt")
    } else {
      console.log(place)
      let address = ''
      let city = ''
      let country = ''
      let zip = ''
      // console.log(place.geometry.location.lat())
      // console.log(place.geometry.location.lng())
      let latitude = place.geometry.location.lat()
      let longitude = place.geometry.location.lng()
      if (place.address_components.length == 4) {
        address = place.address_components[0].short_name
        city = place.address_components[1].short_name
        country = place.address_components[3].long_name
        zip = place.address_components[4].short_name
      } else if (place.address_components.length == 5) {
        address = place.address_components[0].short_name
        city = place.address_components[1].short_name
        country = place.address_components[3].long_name
        zip = place.address_components[4].short_name
      } else if (place.address_components.length == 6) {
        address = place.address_components[1].short_name + ' ' + place.address_components[0].short_name
        city = place.address_components[2].short_name
        country = place.address_components[4].long_name
        zip = place.address_components[5].short_name
      } else if (place.address_components.length == 7) {
        address = place.address_components[1].short_name + ' ' + place.address_components[0].short_name
        city = place.address_components[3].short_name
        country = place.address_components[5].long_name
        zip = place.address_components[6].short_name
      }

      // console.log(place.address_components)
      setAddressValue(formatAddressField(address, city, country))
      console.log(latitude)
      setPlace({
        address,
        city,
        country,
        zip,
        latitude,
        longitude
      })
      if (setZip) {
        setZip(zip)
      }
      
    }
  }

  function handleChange(e) {
    setAddressValue(e.target.value)
  }
  return (
    <div className='form-floating'>
      <input
        type="text"
        className='form-control'
        placeholder=''
        name={name}
        value={addressValue}
        onChange={handleChange}
        ref={inputRef}
        required />
      <label className='col-form-label'>{label}</label>
    </div>
  );
};


export default AddressInput

export function formatAddressField(address, city, country) {
  return address + ', ' + city + ', ' + country
}