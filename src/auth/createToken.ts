
import jwt from 'jsonwebtoken';

const secretToken = process.env.SECRET_TOKEN || 'mradQ18Pl2';

type responseCreateToken = {
    ok:boolean;
    msg:string;
    token?:string;
}

export const createToken = (idUser: number, email: string, typeUser: number): Promise<responseCreateToken> => {

    return new Promise ((resolve, reject)=>{
        jwt.sign({ user: idUser, email, typeUser }, secretToken, { expiresIn: '2h' }, (err, token)=>{
            if(err){
                reject({
                    ok:false,
                    msg:'Error al generar token'
                });
            }

            resolve({
                ok:true,
                msg:'Token generado correctamente',
                token
            });
        });
    });
}