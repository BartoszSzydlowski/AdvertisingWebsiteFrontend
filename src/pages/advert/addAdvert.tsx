import React, { useState } from "react";
import Endpoints from "../../endpoints/endpoints";
import TokenContainer from "../../endpoints/token";

const Create = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();
  const [isPending, setIsPending] = useState<boolean>(false);

  const submit = (e: any) => {
    e.preventDefault();
    setCategoryId(1);
    const advert = { name, description, price, categoryId: 1 };

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
      <h1>Tu sie beda wrzucac ogloszenia</h1>
      <form onSubmit={submit}>
        <label>Name: </label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        <label>Description: </label>
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
        <label>Price: </label>
        <input type='text' value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>
        <label>Category: </label>
        <input type='text' value={categoryId} /* onChange={(e) => setCategoryId(parseInt(e.target.value))} *//>
        { !isPending && <button>Add advert</button>}
        { isPending && <button disabled>Adding advert</button>}
      </form>
    </div>
  );
}

export default Create;