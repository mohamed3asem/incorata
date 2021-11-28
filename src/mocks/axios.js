const mockAxios = jest.genMockFromModule('axios');
export default {
  create: jest.fn(() => mockAxios),
  // get: jest.fn(() =>
  //   Promise.resolve({ data: [{ name: 'ss', function: 'sss' }] })
  // ),
};
