/** User routes test input */
export const userInput = {
  testSignup1: {
    email: 'testemail@gmail.com',
    password: 'password',
    password2: 'password'
  },
  testSignup2: {
    email: 'newemail@gmail.com',
    password: 'password',
    password2: 'password'
  },
  testLogin1: {
    email: 'testemail@gmail.com',
    password: 'password'
  },
  testLogin2: {
    email: 'newemail@gmail.com',
    password: 'password'
  },
  wrongLoginEmail: {
    email: 'testemai@gmail.com',
    password: 'password'
  },
  wrongLoginPassword: {
    email: 'testemail@gmail.com',
    password: 'passwords'
  },
  invalidLoginEmail: {
    email: 'test@gmail.com',
    password: 'password'
  },
  emptyLoginInput: {
    email: '',
    password: ''
  },
  invalidSignupEmail: {
    email: '@gmail.com',
    password: 'password',
    password2: 'password'
  },
  unconfirmedSignupPassword: {
    email: 'testemail@gmail.com',
    password: 'password',
    password2: 'password2'
  },
  emptySignupInput: {
    email: '',
    password: '',
    password2: ''
  }
};
/** Data routes test input */
export const dataInput = {
  testAddData1: {
    uniqueData: 'testing123'
  },
  moreData1: {
    uniqueData: 'testing456'
  },
  testDeleteData1: {
    uniqueDataList: ['testing123']
  },
  testDeleteData2: {
    uniqueDataList: ['testing456']
  },
  testDeleteData12: {
    uniqueDataList: ['testing123', 'testing456']
  }
};
