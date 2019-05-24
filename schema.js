export const typeDefs = `
type Channel {
  name: String
}
type Query {
  channels: [Channel]
}
`;
