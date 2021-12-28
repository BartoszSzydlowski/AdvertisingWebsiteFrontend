import { Category } from '../category/category';
import { Picture } from '../picture/picture';

export interface IAdvert {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category: Category;
  isPromoted: boolean;
  isAccepted: boolean;
  isExpired: boolean;
  userId: string;
  pictures: Array<Picture>;
}

export interface ICreateAdvert {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}
