import React, { ChangeEvent, useEffect, useRef } from 'react'

interface AddressInputProps {
    address:string,
    handleFormChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function AddressInput({address, handleFormChange}: AddressInputProps) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (window.google && window.google.maps && window.google.maps.places && inputRef.current) {
          // Now TypeScript knows inputRef.current is not null
          new window.google.maps.places.Autocomplete(inputRef.current);
        } else {
          console.error('Google Maps JavaScript API not loaded or inputRef is not attached.');
        }
      }, []);
  
    return (
      <input
        ref={inputRef}
        type="text"
        placeholder="Adress"
        className="form-control"
        value={address}
      />
    );
}

export default AddressInput