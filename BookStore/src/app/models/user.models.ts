export interface User {
    userName: string,
    id: string,
    email?:string
    isAdmin: boolean,
    password?: string; 
}