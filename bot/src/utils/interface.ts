export interface verifCodesSchema {
    discordId: string,
    discordTag: string,
    avatar: string,
    email: string,
    serverId: string,
    serverName: string,
    verificationCode: string,
    time: string,
}

export interface user {
    id: string,
    name: string,
    avatar: string,
    email: string,
    verified: boolean,
    timeOfVerification: string,
}

export interface addServer {
    googleId: string,
    serverId: string,
    serverName: string,
    code: string,
    discordId: string,
    discordName: string,
    avatar: string,
    icon: string,
    verificationCode: string,
    ownerVerified: string,
    users: user,
}

// module.exports = {typeof verifCodesSchema};