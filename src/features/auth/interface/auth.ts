export interface IAuthState {
    isLogin: boolean;
    userData: IUserData;
}

export interface ILoginResponse {
    data: IUserData;
    token: string;
}

export interface IUserData {
    accessToken: string;
    expiresIn: number;
    refreshTokenIn: number;
    refreshToken: string;
    tokenType: string;
    scope: string;
}
