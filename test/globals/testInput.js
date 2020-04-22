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
/** Profile routes test input */
export const profileInput = {
  testCreateProfile1: {
    username: 'thetester',
    status: 'Actively Looking',
    website: 'https://test.com',
    github: 'https://github.com/test-dev/'
  },
  testCreateProfile2: {
    username: 'newacct',
    status: 'Not Looking',
    website: 'https://test.com',
    github: 'https://github.com/new-dev/'
  },
  invalidProfileWebsite: {
    username: 'thetester',
    status: 'Actively Looking',
    website: 'https://test',
    github: 'https://github.com/test-dev/'
  },
  invalidProfileLinkedIn: {
    username: 'thetester',
    status: 'Actively Looking',
    linkedin: 'https://test',
    github: 'https://github.com/test-dev/'
  },
  invalidProfileGitHub: {
    username: 'thetester',
    status: 'Actively Looking',
    github: 'https://test'
  },
  invalidProfileStackOverFlow: {
    username: 'thetester',
    status: 'Actively Looking',
    stackoverflow: 'https://test'
  },
  invalidProfileDribbble: {
    username: 'thetester',
    status: 'Actively Looking',
    dribbble: 'https://test'
  },
  invalidProfileTwitter: {
    username: 'thetester',
    status: 'Actively Looking',
    twitter: 'https://test'
  },
  testUpdateProfile1: {
    username: 'thetester2',
    status: 'Actively Looking',
    website: 'https://test.com',
    github: 'https://github.com/tester-dev/'
  }
};
/** Job routes test input */
export const jobInput = {
  testAddJob1: {
    role: 'Software Engineer',
    company: 'Facebook',
    link: 'https://job1.com',
    location: 'Mountain View, CA',
    seniority: 'New Grad',
    salaryRange: '120-150k'
  },
  testAddJob2: {
    role: 'iOS Engineer',
    company: 'Apple',
    link: 'https://job2.com',
    location: 'Cupertino, CA',
    seniority: 'Mid',
    salaryRange: '150-200k'
  },
  testAddJob3: {
    role: 'Machine Learning Engineer',
    company: 'Stripe',
    link: 'https://job3.com',
    location: 'San Francisco, CA',
    seniority: 'Senior',
    salaryRange: '200-300k'
  },
  invalidJobLink: {
    role: 'Software Engineer',
    url: 'Facebook',
    link: 'https://facebook'
  },
  testDeleteJob1: {
    links: ['https://job1.com']
  },
  testDeleteJob2: {
    links: ['https://job2.com']
  },
  testDeleteJob3: {
    links: ['https://job3.com']
  },
  testDeleteJob12: {
    links: ['https://job1.com', 'https://job2.com']
  }
};
