import { Advert } from "../advert/advert";

export interface Picture {
  id: string;
  uniqueName: string;
  path: string;
  extension: string;
  userId: string;
  advertId: number;
  advert: Advert;
}
