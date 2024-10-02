import { dateToUnixEpoch } from './ConvertStringsDates';

it('convert date to number', () => {
  const newDate = new Date('2024-09-15T23:50:21.817Z');
  const result = dateToUnixEpoch(newDate);
  expect(result).toEqual(1726444221);
});
