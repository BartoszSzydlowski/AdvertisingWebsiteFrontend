import { IAdvert } from '../advert/advert';

export interface Category {
  id: number;
  name: string;
  description: string;
  adverts: Array<IAdvert>;
}
