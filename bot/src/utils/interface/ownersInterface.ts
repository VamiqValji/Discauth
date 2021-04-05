import { user } from "./interface";

interface ownersDocumentServers {
    serverId: string,
    serverName: string,
    icon: string,
    verificationCodes: string,
    ownerVerified: boolean,
    users: user[]
}

interface ownersDocumentVerificationCodes {
    googleId: string,
    serverName: string,
    code: string,
    discordId: string,
    discordName: string,
    avatar: string,
}

export default interface ownersDocument {
    servers: ownersDocumentServers[],
    verificationCodes: ownersDocumentVerificationCodes[],
    discordId: string,
    discordName: string,
    email: string,
    googleId: string,
    membership: string,
}