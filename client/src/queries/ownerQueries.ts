import { gql } from '@apollo/client';

export const getAddedServersQuery = gql`

  query ($googleId: ID!){
    ownerData(googleId: $googleId) {
          
      verificationCodes {
        serverName
        code
        discordName
      }
    }
  }

`;

export const getMyServersQuery = gql`
query ($googleId: ID!){
    ownerData(googleId: $googleId) {
      servers {
        serverId
        serverName
        icon
        verificationCode
        ownerVerified
      }
    }
  }
`;