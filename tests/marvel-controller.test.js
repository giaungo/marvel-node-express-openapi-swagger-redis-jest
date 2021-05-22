require('dotenv').config();

const marvelController = require('../marvel/marvel-controller');
const redis = require('redis-mock');
const cacheClient = redis.createClient();
marvelController.setCacheClient(cacheClient);

const axios = require('axios');
jest.mock('axios');

test('cache success', async () => {
  const mReq = {url: '/'};
  const mRes = {status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis()};
  cacheClient.get = jest.fn().mockImplementation((k, cb) => cb(null, '1,2'));
  const mNext = jest.fn();

  marvelController.cache(mReq, mRes, mNext);
  expect(mRes.status).toBeCalledWith(200);
});

test('cache error', async () => {
  const mReq = {url: '/'};
  const mRes = {};
  cacheClient.get = jest.fn().mockImplementation((k, cb) => cb('Some Error', null));
  const mNext = jest.fn();
  jest.spyOn(global.console, 'error');

  marvelController.cache(mReq, mRes, mNext);
  expect(console.error).toBeCalled();
});

test('getCharacters success', async () => {
  axios.get.mockImplementation(() => Promise.resolve({status: 200, data: {
    data: { 
      total: 101,
      results: [{
        id: 1,
        name: 'Stark',
        description: ''
      }]}}}));
  const mReq = { };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis() }

  await marvelController.getCharacters(mReq, mRes, () => {});
  expect(mRes.status).toBeCalledWith(200);
});

test('getCharacters error', async () => {
  axios.get.mockImplementation(() => {});
  const mReq = {};
  const mRes = {}
  const mNext = jest.fn();

  await marvelController.getCharacters(mReq, mRes, mNext);
  expect(mNext).toBeCalled();
});

test('getCharactersById success', async () => {
  axios.get.mockImplementation(() => Promise.resolve({status: 200, data: { data: { results: [{
    id: 1,
    name: 'Stark',
    description: ''
  }]}}}));
  const mReq = { params: {characterId: 1}};
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis() }

  await marvelController.getCharactersById(mReq, mRes, () => {});
  expect(mRes.status).toBeCalledWith(200);
});

test('getCharactersById error', async () => {
  axios.get.mockImplementation(() => {});
  const mReq = {};
  const mRes = {}
  const mNext = jest.fn();

  await marvelController.getCharactersById(mReq, mRes, mNext);
  expect(mNext).toBeCalled();
});