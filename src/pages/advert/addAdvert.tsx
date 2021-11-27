import React, { useState } from "react";
import Endpoints from "../../endpoints/endpoints";
import TokenContainer from "../../endpoints/token";
import { CreateAdvert } from "../../interfaces/adverts/advert"
import GetCategory from "../../components/Category/category";

const Create = () => {
  const [advert, setAdvert] = useState<CreateAdvert>({ name: '', description: '', price: 0, categoryId: 0 });
  const [isPending, setIsPending] = useState<boolean>(false);

  console.log(advert);

  const submit = (e: any) => {
    e.preventDefault();

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
      <form onSubmit={submit} >

        <div>
          <label>Name: </label>
            <input type='text' value={advert.name}
              onChange={e => setAdvert(prev => ({...prev, name: e.target.value}))}
            />
        </div>

        <div>
          <label>Description: </label>
          <input type='text' value={advert.description}
            onChange={e => setAdvert(prev => ({...prev, description: e.target.value}))}
          />
        </div>

        <div>
          <label>Price: </label>
          <input type='text' value={advert.price}
            onChange={e => setAdvert(prev => ({...prev, price: parseInt(e.target.value)}))}
          />
        </div>

        <div>
          <label>Category: </label>
          <GetCategory event={(e: any) => {
            setAdvert(prev => ({...prev, categoryId: parseInt(e.target.value)}))}}
          />
        </div>

        {!isPending && <button>Add advert</button>}
        {isPending && <button disabled>Adding advert</button>}
      </form>
    </div>
  );
}

export default Create;