export interface UserInterface {
    first_name: string,
    last_name: string,
    user_name: string,
    email: string,
    type_user: number
    user_id: number,
    password: string,
}



export type UpdateUser = Pick<UserInterface, 'user_id' | 'first_name' | 'last_name' | 'user_name'>;
export type RegisterUser =  Omit<UserInterface, 'user_id'>
export type OutPutLogin =  Pick<UserInterface, 'user_id' | 'email' | 'password' | 'type_user'>;
export type OutPutRegisterUser = Pick<UserInterface, 'user_id' | 'email' | 'type_user'>
export type OutPutGetUsersAll =  Omit<UserInterface, 'password'>
