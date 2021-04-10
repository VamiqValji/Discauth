import ownersDocument from "./interface/ownersInterface";
import { Message } from "discord.js";
import owners from "../models/ownersModel";

const isMembershipUpgradeNeeded = async (message: Message, serverId:string): Promise<boolean> => {
    const foundServer:ownersDocument = await owners.findOne({
        discordId: message.guild?.ownerID
    });
    if (!foundServer) return false;

    let needsToUpgrade:boolean = false;

    const onFreeTier = foundServer.stripeData.membership === "Free";

    if (onFreeTier) {

        foundServer.servers.forEach((server) => {
            const serverIdMatches = serverId === message.guild?.id;
            if (serverIdMatches) {
                const mustUpgradeServerTierOnWebsite = server.users.length >= 50;
                if (mustUpgradeServerTierOnWebsite) {
                    needsToUpgrade = true;
                } else {
                    needsToUpgrade = false;
                }
            }
        });
    }
    return needsToUpgrade;
};

export default isMembershipUpgradeNeeded;