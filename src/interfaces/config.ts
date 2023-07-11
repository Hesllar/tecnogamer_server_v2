type OpcionDB = {
    host:string,
    port:number,
    dialect:string
}

export interface configDB {
    dataBase: string,
    userDB:string,
    userPass:string,
    opcionDB:OpcionDB
}