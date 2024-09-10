import { Documentation } from '@/types/graphQLSchema';

export const getTypes = (documentation: Documentation) => {
  const types = documentation.data.data.__schema.types
    .filter((type) => type.kind === 'OBJECT')
    .map((type) => ({
      name: type.name,
      fields: type.fields,
    }));
  return types;
};
