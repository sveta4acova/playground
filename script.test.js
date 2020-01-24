const googleSearch = require('./script');
const dbMock = [
  'cats.com',
  'souprecipes.com',
  'flowers.com',
  'animals.com',
  'catpictures.com',
  'myfavouritecats.com'
];

describe('googleSearch func', () => {
  it('google search', () => {
    expect(googleSearch('jgjjgs', dbMock)).toEqual([]);
    expect(googleSearch('flowers', dbMock)).toEqual(['flowers.com']);
  });

  it('work with undefined and null', () => {
    expect(googleSearch(undefined, dbMock)).toEqual([]);
    expect(googleSearch(null, dbMock)).toEqual([]);
  });

  it('does not return more than 3 matches', () => {
    expect(googleSearch('.com', dbMock).length).toEqual(3);
  });
});
