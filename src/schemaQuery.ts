export const SCHEMA_QUERY = `
  query {
    __schema {
    types {
      name
      kind
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
 }
`;
