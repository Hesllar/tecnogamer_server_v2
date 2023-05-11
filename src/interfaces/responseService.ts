
export interface ResponseService {
    ok: boolean
    result: {
        responseGet?:any,
        responsePost?:any,
        responsePut?:any,
        responseDelete?:any,
        responsePatch?:any,
        responseError?:any
        
    }
}