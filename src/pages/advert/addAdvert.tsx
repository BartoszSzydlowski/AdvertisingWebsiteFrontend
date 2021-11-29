import React, { useState } from "react";
import Endpoints from "../../endpoints/endpoints";
import TokenContainer from "../../endpoints/token";
import { CreateAdvert } from "../../interfaces/advert/advert"
import GetCategory from "../../components/Category/category";
//import { Picture } from "../../interfaces/picture/picture";
import axios from "axios";

const Create = (props: any) => {
  const [advert, setAdvert] = useState<CreateAdvert>({ name: '', description: '', price: 0, categoryId: 0 });
  const [isPending, setIsPending] = useState<boolean>(false);

  //console.log(advert);

  const addPicture = async (advertId: number) => {

  }

  const submit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);

    await axios.post(`${Endpoints.defaultEndpoint}/api/adverts`,
      JSON.stringify(advert), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenContainer.Token}`
      }
    })
    .then(data => {
      setIsPending(false);
      console.log(data.data)
    })
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
        <input type="button" value="+" id="addNew"/>
    </div>
  );
}

export default Create;