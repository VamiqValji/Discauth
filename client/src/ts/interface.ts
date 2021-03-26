export interface loggedInformation {
    loggedIn: boolean,
    id: string
}

export interface ownerServersInformation {
    serverId?: string,
    serverName?: string,
    verificationCode?: string,
    ownerVerified?: boolean,
    users?: object[],
    icon?: string,
}

export interface ownerVerificationCodesInformation {
    googleId?: string,
    serverName?: string,
    code?: string,
    discordId?: string,
    discordName?: string,
}