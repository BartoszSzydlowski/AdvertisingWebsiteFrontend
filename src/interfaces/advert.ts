import Category from "./category";
import Picture from "./picture";

export default interface Advert {
    name: string,
    description: string,
    price: number,
    categoryId: number,
    category: Category,
    isPromoted: boolean,
    isAccepted: boolean,
    isExpired: boolean,
    userId: string,
    pictures: Array<Picture>
}