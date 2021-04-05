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

interface pastPayments{
    membership: string,
    paymentDate: string,
    subscriptionId: string,
    cancelledDate: string,
}

interface stripeData {
    membership: string,
    customerId: string,
    paymentDate: string,
    subscriptionId: string,
    pastPayments: pastPayments[],
}

export default interface ownersDocument {
    servers: ownersDocumentServers[],
    verificationCodes: ownersDocumentVerificationCodes[],
    discordId: string,
    discordName: string,
    email: string,
    googleId: string,
    stripeData: stripeData,
}