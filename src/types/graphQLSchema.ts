type GraphQLField = {
  name: string;
  type: {
    name: string | null;
  };
};

export type Schema = {
  name: string;
  fields: GraphQLField[];
}[];

type GraphQLType = {
  kind: string;
  name: string;
  fields: GraphQLField[];
};

export type GraphQLSchema = {
  types: GraphQLType[];
};

export type Documentation = {
  data: {
    data: {
      __schema: GraphQLSchema;
    };
  };
};
