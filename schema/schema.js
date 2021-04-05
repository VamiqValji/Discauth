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
    avatar: { type: GraphQLString },
    email: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    timeOfVerification: { type: GraphQLString },
  }),
});

const ServerType = new GraphQLObjectType({
  name: "Server",
  description: "Server Information",
  fields: () => ({
    serverId: { type: GraphQLID },
    serverName: { type: GraphQLString },
    icon: { type: GraphQLString },
    verificationCode: { type: GraphQLString },
    ownerVerified: { type: GraphQLBoolean },
    users: { type: new GraphQLList(UsersType) },
  }),
});

const verificationCodeType = new GraphQLObjectType({
  name: "verificationCode",
  description: "Verification Code Schema",
  fields: () => ({
    serverId: { type: GraphQLID },
    serverName: { type: GraphQLString },
    avatar: { type: GraphQLString },
    code: { type: GraphQLString },
    discordId: { type: GraphQLString },
    discordName: { type: GraphQLString },
  }),
});

const pastPaymentsType = new GraphQLObjectType({
  name: "pastPayments",
  description: "Past Stripe data payments",
  fields: () => ({
    membership: { type: GraphQLString },
    paymentDate: { type: GraphQLString },
    subscriptionId: { type: GraphQLString },
    cancelledDate: { type: GraphQLString },
  }),
});

const stripeDataType = new GraphQLObjectType({
  name: "stripeData",
  description: "Owner data for Stripe",
  fields: () => ({
    membership: { type: GraphQLString },
    customerId: { type: GraphQLString },
    paymentDate: { type: GraphQLString },
    subscriptionId: { type: GraphQLString },
    pastPayments: { type: new GraphQLList(pastPaymentsType) },
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
    discordId: { type: GraphQLString },
    discordName: { type: GraphQLString },
    email: { type: GraphQLString },
    verificationCodes: { type: new GraphQLList(verificationCodeType) },
    stripeData: { type: /*GraphQLObjectType*/ stripeDataType },
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
        // console.log("root", parent, args);
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
        discordId: { type: new GraphQLNonNull(GraphQLString) },
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
              discordId: args.discordId,
              discordName: args.discordName,
              servers: [],
              email: args.email,
              googleId: args.googleId,
              verificationCodes: [],
              stripeData: {
                membership: "Free",
                customerId: "",
                paymentDate: "",
                subscriptionId: "",
                pastPayments: [],
              },
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
    addServer: {
      type: OwnerType,
      description: "Add Server",
      args: {
        googleId: { type: GraphQLID },
        serverName: { type: GraphQLString },
        code: { type: GraphQLString },
      },
      resolve(parent, args) {
        return owners.findOne({ googleId: args.googleId }).then((res) => {
          const foundServer = _.find(res.verificationCodes, {
            serverName: args.serverName,
          });
          if (foundServer) return res;
          res.verificationCodes.push({
            googleId: args.googleId,
            serverName: args.serverName,
            code: args.code,
          });
          res.markModified("res.verificationCodes");
          res.save();
        });
        // return owners.findOneAndUpdate(
        //   { googleId: args.googleId },
        //   {
        //     $pullAll: {
        //       verificationCodes: [{ serverName: args.serverName }],
        //     },
        //     $addToSet: {
        //       verificationCodes: {
        //         serverId: "",
        //         serverName: args.serverName,
        //         code: args.code,
        //       },
        //     },
        //   }
        // );
      },
    },
    deleteServer: {
      type: OwnerType,
      description: "Deletes server from added servers",
      args: {
        googleId: { type: new GraphQLNonNull(GraphQLString) },
        serverName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        owners.findOne({ googleId: args.googleId }).then((res) => {
          res.verificationCodes.map((server) => {
            const foundServer = server.serverName === args.serverName;
            if (foundServer) {
              res.verificationCodes = res.verificationCodes.filter(
                (s) => s !== server
              );
              res.markModified("verificationCodes");
              return res.save();
            }
          });
        });
      },
    },
  },
});

/* 
  discordId: String,
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
