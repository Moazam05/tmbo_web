// import React, { Component } from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
// import './GoogleMap.scss';

// export class MapContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: '',

//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {},

//       mapCenter: {
//         lat: 31.5331,
//         lng: 74.3162,
//       },
//     };
//   }

//   handleChange = (address) => {
//     this.setState({ address });
//   };

//   handleSelect = async (address) => {
//     this.setState({ address });
//     // console.log(address);
//     await geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => {
//         // console.log('Success', latLng);

//         // update center state
//         this.setState({ mapCenter: latLng });
//       })
//       .catch((error) => console.error('Error', error));
//   };

//   render(props) {
//     console.log('maghirb', this.props);
//     const { address, handleChange, handleSelect, mapCenter } = this.props;
//     // console.log(this.state);
//     // const mapStyles = {
//     //   width: '99%',
//     //   height: '35%',
//     // };
//     return (
//       <div id='googleMaps'>
//         <PlacesAutocomplete
//           // value={this.state.address}
//           // onChange={this.handleChange}
//           // onSelect={this.handleSelect}
//           value={address}
//           onChange={handleChange}
//           onSelect={handleSelect}
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: 'Enter a Location ...',
//                   className: 'location-search-input',
//                 })}
//               />
//               <div className='autocomplete-dropdown-container'>
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? 'suggestion-item--active'
//                     : 'suggestion-item';
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                     : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//         <div className='salman'>
//           <Map
//             className='map-div'
//             google={this.props.google}
//             // initialCenter={{
//             //   lat: this.state.mapCenter.lat,
//             //   lng: this.state.mapCenter.lng,
//             // }}
//             // center={{
//             //   lat: this.state.mapCenter.lat,
//             //   lng: this.state.mapCenter.lng,
//             // }}
//             initialCenter={{
//               lat: mapCenter.lat,
//               lng: mapCenter.lng,
//             }}
//             center={{
//               lat: mapCenter.lat,
//               lng: mapCenter.lng,
//             }}
//             // style={mapStyles}
//           >
//             <Marker
//               // position={{
//               //   lat: this.state.mapCenter.lat,
//               //   lng: this.state.mapCenter.lng,
//               // }}
//               position={{
//                 lat: mapCenter.lat,
//                 lng: mapCenter.lng,
//               }}
//             />
//           </Map>
//         </div>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBE6nTreJV31cGdPT4EzE5v_iZAVdqh7ek',
// })(MapContainer);

import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './GoogleMap.scss';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field.name,
      address: props.value || '',
    };
  }

  handleError = (error) => {
    this.props.form.setFieldError(this.state.name, error);
  };

  handleChange = (address) => {
    this.setState(() => {
      this.props.form.setFieldTouched(`${this.state.name}.value`);
      this.props.form.setFieldTouched(`${this.state.name}.address`);
      this.props.form.setFieldValue(this.state.name, { value: address });
      return { address };
    });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState(() => {
          this.props.form.setFieldValue(this.state.name, {
            value: address,
            address,
            coordinates: latLng,
          });
          return { address };
        });
      })
      .catch((error) => this.props.form.setFieldError(this.state.name, error));
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      label,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];
    console.log('ss', this.state.name);
    return (
      <PlacesAutocomplete
        name={name}
        id={name}
        {...props}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control',
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBE6nTreJV31cGdPT4EzE5v_iZAVdqh7ek',
})(MapContainer);
