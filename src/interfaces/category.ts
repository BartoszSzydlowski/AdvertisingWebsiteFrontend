import Advert from "./advert";

export default interface Category {
    name: string,
    description: string,
    userId: string,
    adverts: Array<Advert>
}