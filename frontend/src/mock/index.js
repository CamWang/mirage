import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import news from './data/news';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/news').reply(200, {
  news: news.slice(0,5),
  total: 2
});