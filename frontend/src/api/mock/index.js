import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import news from './data/news';
import { problems as problem, details as detail } from './data/problem';
import blog from './data/blog';
import contest from './data/contest';
import user from './data/user';
import message from './data/message';

const mock = new MockAdapter(axios, { delayResponse: 300 });

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

mock.onGet("/contest").reply(200, {
  contest,
  total: 1
});

mock.onGet("/problem/detail").reply(function(config) {
  const id = Number.parseInt(config.params.id);
  return [200, {
    problem: detail.filter(elem => {
      return elem.id === id; 
    })[0],
  }];
});

mock.onPost("/login").reply(function(config) {
  const params = JSON.parse(config.data);
  const { username, password } = params.params;
  return [200, {
    user: user.filter(elem => {
      return elem.username === username && elem.password === password;
    })[0],
  }];
});

mock.onPost("/register").reply(200);