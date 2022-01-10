import { ICategory } from '../category/category';
import { IPicture } from '../picture/picture';

export interface IAdvert {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category: ICategory;
  isPromoted: boolean;
  isAccepted: boolean;
  isExpired: boolean;
  userId: string;
  pictures: Array<IPicture>;
}

export interface ICreateAdvert {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}
