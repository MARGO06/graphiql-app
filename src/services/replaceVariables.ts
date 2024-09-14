export const replaceVariables = (body: string, variables: { key: string; value: string }[]) => {
  return variables.reduce((updatedBody, variable) => {
    const placeholder = `{{${variable.key}}}`;
    return updatedBody.replace(new RegExp(placeholder, 'g'), variable.value);
  }, body);
};
