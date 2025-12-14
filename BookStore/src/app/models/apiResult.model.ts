export interface ApiResult{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: number,
    localId: string,
    registered?:boolean
}