import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/news').reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});