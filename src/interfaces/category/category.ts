import { IAdvert } from '../advert/advert';

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ICreateCategory {
  name: string;
  description: string;
}