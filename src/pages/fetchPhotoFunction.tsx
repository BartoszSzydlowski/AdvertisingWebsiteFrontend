import React from "react";
// import Endpoints from '../endpoints/endpoints';
// import { useState, useEffect } from 'react';
// import Picture from '../interfaces/picture';

// const FetchPhotoFunction = () => {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState<Array<Picture>>([]);

//   useEffect(() => {
//     fetch(`${Endpoints.defaultEndpoint}api/Pictures`)
//       .then(res => res.json())
//       .then((result: Picture[]) => {
//         setIsLoaded(true);
//         setItems(result);
//       },
//       (error) => {
//         setIsLoaded(false);
//         setError(error);
//         //console.log(error);
//       });
//   }, [])

//   if (error) {
//     return (
//       <div key={Math.random()}>Error: {error}</div>
//     );
//   } else if (!isLoaded) {
//     return (
//       <div key={Math.random()}>Loading...</div>
//     );
//   } else {
//     return (
//       <div key={Math.random()}>
//         {items.map(item => (
//           <>
//           <div key={`${item.id}`}>
//             <img src={`${Endpoints.defaultEndpoint}${item.path}`} alt={`${item.uniqueName.substring(0, item.uniqueName.length - 4)}`} />
//             {/* <p id={`${item.id}`}>{item.uniqueName}</p> */}
//           </div>
//           </>
//         ))}
//       </div>
//     );
//   }
// }

// export default FetchPhotoFunction;