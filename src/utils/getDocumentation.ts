import { Schema } from '@/types/graphQLSchema';
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

    if (!response.ok || !documentation.success) {
      const errorMessage = documentation.error || 'Failed to fetch documentation';
      throw new Error(errorMessage);
    }

    const types = getTypes(documentation);
    return types;
  } catch (error) {
    const err = error as { status: number; message: string };
    throw new Error(err.message || 'Failed to fetch documentation');
  }
};
