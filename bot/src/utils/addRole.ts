import { Message } from "discord.js";

const addRole = async (message:Message, inServer:boolean, roleName="Verified" /*args:string[]*/) => {

    if (!inServer) return message.author.send(
        "Not in a server."
    );
    
    /*
    let roleName:string;
    try {
        roleName = args[0].replace("_", " ");
    } catch {
        return;
    }
    */
   
    // const isOwner = message.guild?.ownerID === message.author.id;
    // if (isOwner) {

        const role = message.guild?.roles.cache.find((role) => {
            return role.name === roleName;
        });
        
        if (!role) return message.author.send(
            "Role not found. Ask the owner to add a role called 'Verified'."
        );

        console.log(`${role.name} found.`);

        const member = message.guild?.members.cache.get(message.author.id);
        await member?.roles.add(role);
    // }
}

export default addRole;