import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import news from './data/news';
import problem from './data/problem';
import blog from './data/blog';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/news').reply(200, {
  news: news.slice(0,5),
  total: 2
});

mock.onGet("/problem").reply(200, {
  problem,
  total: 1
});

mock.onGet("/blog").reply(200, {
  blog,
  total: 1
});