export function formatJson(
  body: string | undefined,
  selectMethod: string | undefined,
  setBody: (body: string) => void,
  setError: (error: string | null) => void,
  t: (key: string) => string,
  contentType: string,
): boolean {
  if (contentType === 'application/json') {
    const methodsWithoutBody = ['GET', 'DELETE', 'HEAD', 'OPTIONS'];

    if (!selectMethod) {
      return false;
    }

    if (methodsWithoutBody.includes(selectMethod)) {
      setError(null);
      return true;
    }

    if (selectMethod === 'POST') {
      if (!body || body.trim() === '') {
        setError(t('empty field'));
        return false;
      }
    }

    try {
      if (body) {
        const correctedBody = body.replace(/'/g, '"');
        const parsed = JSON.parse(correctedBody);
        const formatted = JSON.stringify(parsed, null, 2);

        setBody(formatted);
        setError(null);
        return true;
      }
    } catch (error) {
      setError(t('syntax err'));
      return false;
    }
  }
  return false;
}
