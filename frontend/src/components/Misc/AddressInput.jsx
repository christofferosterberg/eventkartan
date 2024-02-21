import React, { ChangeEvent, useEffect, useRef } from 'react'
import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


// interface AddressInputProps {
//   address: string,
//   handleFormChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
// }

function AddressInput({ address, handleFormChange }) {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
   componentRestrictions: { country: "SE" },
   fields: ["address_components", "geometry", "icon", "name"],
   types: ["establishment"]
  };
  useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    inputRef.current,
    options
   );
  }, []);
  return (
   <div>
    <label>enter address :</label>
    <input className='form-control' ref={inputRef} />
   </div>
  );
 };


export default AddressInput