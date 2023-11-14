import { Item } from "./item.model";
import { JwtPayload } from "./jwt-payload.model";


export interface User {
    sub: string // this is the sub field from the JwtPayload, which is the Unique Google Account ID
    googleUserInfo: JwtPayload;
    offers: Item[];
    orders: Item[];
}