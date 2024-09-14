import { handleGetDocumentation } from './getDocumentation';
import { getTypes } from '@/utils/getTypesSchema';

global.fetch = jest.fn();

jest.mock('./getTypesSchema', () => ({
  getTypes: jest.fn(),
}));

describe('handleGetDocumentation', () => {
  const mockUrl = 'https://example.com';
  const mockSchema = 'mockSchema';

  it('should fetch documentation and return types on success', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        data: { types: ['Type1', 'Type2'] },
      }),
    });

    const mockTypes = ['Type1', 'Type2'];
    (getTypes as jest.Mock).mockReturnValue(mockTypes);

    const result = await handleGetDocumentation(mockUrl, mockSchema);

    expect(fetch).toHaveBeenCalledWith('/api/fetchDocumentation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: mockUrl, schema: mockSchema }),
    });

    expect(getTypes).toHaveBeenCalledWith({
      success: true,
      data: { types: ['Type1', 'Type2'] },
    });
    expect(result).toBe(mockTypes);
  });

  it('should return undefined if fetch is unsuccessful', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: false,
        error: 'Fetch error',
      }),
      ok: false,
    });

    await expect(handleGetDocumentation(mockUrl, mockSchema)).rejects.toThrow('Fetch error');
  });

  it('should handle fetch errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(handleGetDocumentation(mockUrl, mockSchema)).rejects.toThrow('Network error');
  });
});
