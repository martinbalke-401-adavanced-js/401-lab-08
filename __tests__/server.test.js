'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');

const mockRequest = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('people routes', () => {
  it('should respond properly on a get request to /people', async () => {
    let results = await mockRequest.get('/people');
    expect(results.status).toBe(200);
  });
  let dummyData = {
    _id: '5db8f9c5f2918c289647aa58',
    firstName: 'Sally',
    lastName: 'Smalls',
    birthday: '1991-06-12T07:00:00.000Z',
    likes: 'cats',
    _team: '5daf30df08c7e13598301ec2',
  };


  it('Get a proper response status from post request ', async () => {
    let results = await mockRequest.post('/people').send(dummyData);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from put request ', async () => {
    let results = await mockRequest.put(`/people/${dummyData._id}`).send(dummyData);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from delete request ', async () => {
    let results = await mockRequest.delete(`/people/${dummyData._id}`);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from count and the count is correct ', async () => {
    let results = await mockRequest.get(`/people/count`);
    expect(results.status).toBe(200);
  });
});

describe('Teams routes', () => {
  it('should respond properly on a get request to /teams', async () => {
    let results = await mockRequest.get('/teams');
    expect(results.status).toBe(200);
  });

  let dummyData = {
    _id: '5daf30df08c7e13598301ec3',
    name: 'Blue Otter',
    color: 'blue',
  };
  it('should respond properly on a get request to /teams/:id', async () => {
    let results = await mockRequest.get(`/teams/${dummyData._id}`);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from post request ', async () => {
    let results = await mockRequest.post('/teams').send(dummyData);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from put request ', async () => {
    let results = await mockRequest.put(`/teams/${dummyData._id}`).send(dummyData);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from delete request ', async () => {
    let results = await mockRequest.delete(`/teams/${dummyData._id}`);
    expect(results.status).toBe(200);
  });

  it('Get a proper response status from count and the count is correct ', async () => {
    let results = await mockRequest.get(`/teams/count`);
    expect(results.status).toBe(200);
  });
});

describe('middleware tests', () => {
  it('Get a 404 response status from incorrect path ', async () => {
    let results = await mockRequest.get(`/tea`);
    expect(results.status).toBe(404);
  });
});