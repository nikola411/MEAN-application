import { User } from './user';

export class Farmer extends User {
    
    firstName: string;
    lastName: string;
    number : string;
    garden : JSON[];
    warehouse : Object[];

}