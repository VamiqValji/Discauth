const graphql = require("graphql");
const _ = require("lodash");
// const Book = require("../models/book");
// const Author = require("../models/author");
const owners = require("../models/ownersModel");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull, // cannot be null
  GraphQLBoolean,
} = graphql;

const UsersType = new GraphQLObjectType({
  name: "Users",
  description: "Users Information",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLID },
    verified: { type: GraphQLBoolean },
  }),
});

const ServerType = new GraphQLObjectType({
  name: "Server",
  description: "Server Information",
  fields: () => ({
    serverId: { type: GraphQLID },
    verificationCode: { type: GraphQLString },
    ownerVerified: { type: GraphQLBoolean },
    users: { type: new GraphQLList(UsersType) },
  }),
});

const verificationCodeType = new GraphQLObjectType({
  name: "Verification Code",
  description: "Verification Code Schema",
  fields: () => ({
    serverId: { type: GraphQLID },
    code: { type: GraphQLString },
  }),
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  description: "Owner Information",
  fields: () => ({
    googleId: {
      type: GraphQLID,
      // resolve(parent, args) {
      //   console.log(parent, args);
      //   return owners.findOne({ googleId: args.googleId });
      // },
    },
    servers: { type: new GraphQLList(ServerType) },
    discordID: { type: GraphQLString },
    discordName: { type: GraphQLString },
    email: { type: GraphQLString },
    verificationCodes: { type: new GraphQLList(verificationCodeType) },
    // verified: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    ownerData: {
      type: OwnerType,
      args: {
        googleId: { type: GraphQLID },
      },
      resolve(parent, args) {
        console.log("root", parent, args);
        return owners.findOne({ googleId: args.googleId });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      description: "Add Owner On Website Login",
      args: {
        discordID: { type: new GraphQLNonNull(GraphQLString) },
        discordName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        googleId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // console.log(parent, args);
        // let isDuplicate =
        owners.findOne({ googleId: args.googleId }).then((res) => {
          const isFound = res !== null;
          if (!isFound) {
            let owner = new owners({
              discordID: args.discordID,
              discordName: args.discordName,
              email: args.email,
              googleId: args.googleId,
              verificationCodes: [],
              // verificationCode:
              //   Math.random().toString(36).substring(7) +
              //   Math.random().toString(36).substring(7),
              // verified: false,
            });
            return owner.save();
          }
        });
      },
    },
  },
});

/* 
  discordID: String,
  discordName: String,
  servers: Array,
  email: String,
  googleId: String,
  verificationCode: String,
  verified: Boolean,
*/

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
