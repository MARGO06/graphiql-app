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
