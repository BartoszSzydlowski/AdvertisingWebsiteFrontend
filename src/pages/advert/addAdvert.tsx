import React, { useState } from "react";
import Endpoints from "../../endpoints/endpoints";
import TokenContainer from "../../endpoints/token";
import CreateAdvert from "../../interfaces/adverts/createAdvert"

const Create = () => {
  // const [name, setName] = useState<string>('');
  // const [description, setDescription] = useState<string>('');
  // const [price, setPrice] = useState<number>();
  // const [categoryId, setCategoryId] = useState<number>();
  const [advert, setAdvert] = useState<CreateAdvert>({ name: '', description: '', price: 0, categoryId: 1 });
  const [isPending, setIsPending] = useState<boolean>(false);

  //setAdvert(prev => ({...prev, categoryId: 1}));
  
  const submit = (e: any) => {
    e.preventDefault();
    //setAdvert(prev => ({...prev, categoryId: 1}));
    //const advert = { name, description, price, categoryId: 1 };

    setIsPending(true);

    fetch(`${Endpoints.defaultEndpoint}/api/adverts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenContainer.Token}`
      },
      body: JSON.stringify(advert),
    })
    .then(res => res.json())
    .then(data => {
      setIsPending(false)
      console.log(data)
    })
    .catch(error => console.log(error));
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>Name: </label>
        {/* <input type='text' value={advert} onChange={(e) => setName(e.target.value)}/> */}
        <input type='text' value={advert.name} onChange={(e) => setAdvert(prev => ({...prev, name: e.target.value}))}/>
        <label>Description: </label>
        {/* <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/> */}
        <input type='text' value={advert.description} onChange={(e) => setAdvert(prev => ({...prev, description: e.target.value}))}/>
        <label>Price: </label>
        {/* <input type='text' value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/> */}
        <input type='text' value={advert.price} onChange={(e) => setAdvert((prev => ({...prev, price: parseInt(e.target.value)})))}/>
        {/* <label>Category: </label>
        <input type='text' value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} />
        <input type='text' value={advert.categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} /> */}
        { !isPending && <button>Add advert</button>}
        { isPending && <button disabled>Adding advert</button>}
      </form>
    </div>
  );
}

export default Create;