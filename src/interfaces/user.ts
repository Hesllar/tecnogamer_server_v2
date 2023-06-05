export interface UserInterface {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    typeUserId: number
    userId?: number,
    password?: string,
}


export type Login =  Pick<UserInterface, 'email' | 'password'>;
export type UpdateUser = Pick<UserInterface, 'userId' | 'firstName' | 'lastName' | 'userName'>;
export type RegisterUser =  Omit<UserInterface, 'userId'>
