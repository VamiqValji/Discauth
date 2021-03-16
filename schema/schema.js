const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const bookData = [
  { name: "book1", genre: "fantasy", id: "1" },
  { name: "book2", genre: "comedy", id: "2" },
  { name: "book3", genre: "mystery", id: "3" },
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // code to get data from db
        return _.find(bookData, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
