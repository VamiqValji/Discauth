interface user {
    id: string,
    name: string,
    avatar: string,
    email: string,
    verified: boolean,
    timeOfVerification: string,
}

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

export interface pastPayments{
    membership: string,
    customerId: string,
    paymentDate: string,
    subscriptionId: string,
    cancelledDate: string,
}

export interface stripeData {
    membership: string,
    customerId: string,
    paymentDate: string,
    subscriptionId: string,
    pastPayments: pastPayments[],
}

export interface ownersDocument {
    servers: ownersDocumentServers[],
    verificationCodes: ownersDocumentVerificationCodes[],
    discordId: string,
    discordName: string,
    email: string,
    googleId: string,
    stripeData: stripeData,
}