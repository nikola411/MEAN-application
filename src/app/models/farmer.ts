import { User } from './user';

export class Farmer extends User {
    type : string = "farmer";
    firstName: string;
    lastName: string;
    number : string;
    garden : JSON[];
    warehouse : Object[];

}