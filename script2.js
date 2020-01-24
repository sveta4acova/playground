const fetch = require('node-fetch');

const getPeoplePromise = fetch => {
  return fetch('https://swapi.co/api/people')
    .then(response => response.json())
    .then(data => {
      return {
        count: data.count,
        results: data.results,
      }
    })
};

const getPeople = async fetch => {
  const res = await fetch('https://swapi.co/api/people');
  const data = await res.json();
  return {
    count: data.count,
    results: data.results,
  }
};

module.exports = {
  getPeoplePromise,
  getPeople,
};
