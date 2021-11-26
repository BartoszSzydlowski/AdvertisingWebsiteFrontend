import React from "react";

// import React, { Component } from 'react';
// import Endpoints from '../endpoints/endpoints';
// import Picture from '../interfaces/picture';

// interface State {
//   error: any,
//   isLoaded: boolean,
//   items: Array<Picture>
// }

// class FetchPhotoClass extends Component<Picture, State> {
//   constructor(props: Picture) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: []
//     };  
//   }

//   componentDidMount() {
//     fetch(Endpoints.getAll)
//     .then(res => res.json())
//     .then((result) => {
//       this.setState({
//         isLoaded: true,
//         items: result,
//       });
//     },
//     (error) => {
//       this.setState({
//         isLoaded: false,
//         error
//       });
//     })
//   }

//   render() { 
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return (
//        <div>Error: {error}</div>
//       );
//     } else if (!isLoaded) {
//       return (
//         <div>Loading...</div>
//       );
//     } else {
//       return (
//         <div>
//           {items.map((item) => (
//             <>
//               <div key={`${item.id}`}>
//                 <img src={`data:image/png;base64,${item.image}`} alt={`${item.name}`} />
//                 <p id={`${item.id}`}>{item.name}</p>
//               </div>
//             </>
//           ))}
//         </div>
//       );
//     }
//   }
// }
 
// export default FetchPhotoClass;