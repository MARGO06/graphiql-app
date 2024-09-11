import { getTypes } from '@/utils/getTypesSchema';
import { Schema } from '@/types/graphQLSchema';

export const handleGetDocumentation = async (
  url: string,
  schema: string,
): Promise<Schema | undefined> => {
  try {
    const response = await fetch('/api/fetchDocumentation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, schema }),
    });
    const documentation = await response.json();
    if (documentation.success === true) {
      const types = getTypes(documentation);
      return types;
    }
  } catch (error) {
    //TODO
  }
};
