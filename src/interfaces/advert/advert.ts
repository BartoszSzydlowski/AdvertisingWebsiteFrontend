import { Category } from "../category/category";
import { Picture } from "../picture/picture";

export interface Advert {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    category: Category;
    isPromoted: boolean;
    isAccepted: boolean;
    isExpired: boolean;
    userId: string;
    pictures: Array<Picture>
}

export interface CreateAdvert {
    name: string;
    description: string;
    price: number;
    categoryId: number;
}