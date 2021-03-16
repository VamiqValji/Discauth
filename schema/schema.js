const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent, args);
        return _.find(authors, { id: parent.authorID });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      },
    },
  }),
});

const books = [
  { name: "book1", genre: "fantasy", id: "1", authorID: "1" },
  { name: "book2", genre: "comedy", id: "2", authorID: "2" },
  { name: "book3", genre: "mystery", id: "3", authorID: "3" },
  { name: "book4", genre: "fantasy", id: "4", authorID: "1" },
  { name: "book5", genre: "comedy", id: "5", authorID: "2" },
  { name: "book6", genre: "mystery", id: "6", authorID: "3" },
];

const authors = [
  { name: "author1", age: `44`, id: "1" },
  { name: "author2", age: `23`, id: "2" },
  { name: "author3", age: `63`, id: "3" },
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // code to get data from db
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
