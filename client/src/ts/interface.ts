export interface loggedInformation {
    loggedIn: boolean,
    id: string
}

export interface ownerServersInformation {
    serverId?: string,
    serverName?: string,
    verificationCode?: string,
    ownerVerified?: boolean,
    // users?: object[],
    users?: user,
    icon?: string,
}

export interface ownerVerificationCodesInformation {
    googleId?: string,
    serverName?: string,
    code?: string,
    discordId?: string,
    discordName?: string,
}

export interface user {
    id:string,
    name:string,
    avatar:string,
    email: string,
    verified: boolean,
    timeOfVerification: string | Date,
}