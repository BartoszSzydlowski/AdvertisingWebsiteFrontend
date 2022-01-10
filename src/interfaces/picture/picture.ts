import { IAdvert } from '../advert/advert';

export interface IPicture {
  id: string;
  uniqueName: string;
  path: string;
  extension: string;
  userId: string;
  advertId: number;
  advert: IAdvert;
}
