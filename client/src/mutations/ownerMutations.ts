import { gql } from '@apollo/client';

export const addOwnerMutation = gql`
mutation addOwner($discordId: String!, $discordName: String!, $email: String!, $googleId: String!){
    addOwner(discordId: $discordId, discordName: $discordName, email: $email, googleId: $googleId) {
      googleId
    }
  }
`;

export const addServerMutation = gql`
mutation addServer($googleId: ID!, $serverName: String!, $code: String!) {
  addServer(googleId: $googleId, serverName: $serverName, code: $code) {
    email
    discordName
  }
}
`;

export const deleteServerMutation = gql`
mutation deleteServer($googleId: String!, $serverName: String!) {
  deleteServer(googleId: $googleId, serverName: $serverName) {
		googleId
  }
}
`;