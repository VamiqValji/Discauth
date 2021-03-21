import { gql } from '@apollo/client';


export const addOwnerMutation = gql`
mutation addOwner($discordID: String!, $discordName: String!, $email: String!, $googleId: String!){
    addOwner(discordID: $discordID, discordName: $discordName, email: $email, googleId: $googleId) {
      googleId
    }
  }
`