import Advert from "./adverts/advert";

export default interface Picture {
    id: string,
    uniqueName: string,
    path: string,
    extension: string,
    userId: string,
    advertId: number,
    advert: Advert
}