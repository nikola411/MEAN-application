export class User{
    static ident = 0;
    username : string;  
    password : string;
    repeat : string;
    email : string;
    date : string;
    id : number = User.ident++;

}