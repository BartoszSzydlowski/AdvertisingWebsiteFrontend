import { Advert } from "./adverts/advert";

export interface Category {
    id: number;
    name: string;
    description: string;
    adverts: Array<Advert>;
}