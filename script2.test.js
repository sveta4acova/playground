const fetch = require('node-fetch');
const swapi = require('./script2');

//при тестировании асинхронного кода надо юзать done или return
it('calls swapi to get people', done => {
  swapi.getPeople(fetch).then(data => {
    expect(data.count).toEqual(87);
    done();
  })
});

it('calls swapi to get people with promise', () => {
  return swapi.getPeoplePromise(fetch).then(data => {
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  })
});

it('get people returns count and results', () => {
  const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({
      count: 87,
      results: [0, 1, 2, 3, 4, 5],
    })
  }));

  expect.assertions(4);
  return swapi.getPeoplePromise(mockFetch).then(data => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  })
});
