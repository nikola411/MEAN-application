import { User } from './user';

export class Company extends User{
    type : string = "company";
    firmName: string;
    number : string;
    place : string;
    shop : JSON[];
    orders : JSON[];

}