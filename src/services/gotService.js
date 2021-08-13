export default class GotService {

  _apiBase = 'https://www.anapioficeandfire.com/api'

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , recieved ${res.status}`)
    }

    return await res.json()
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`)
    return res.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}/`)
    return this._transformCharacter(character)
  }

  getAllHouses = async () => {
    const houses = await this.getResource(`/houses/`)
    return houses.map(this._transformHouse)
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}/`)
    return this._transformHouse(house)
  }

  getAllBooks = async () => {
    const books = await this.getResource(`/books/`)
    return books.map(this._transformBook)
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}/`)
    return this._transformBook(book)
  }

  isSet = (data, dataName) => {
    return data ? data : `no ${dataName} found`
  }

  _extractId = (item) => {
    const idRegEx = /\/([0-9]*)$/
    return item.url.match(idRegEx)[1]
  }
  
  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name, 'name'),
      gender: this.isSet(char.gender, 'gender'),
      born: this.isSet(char.born, 'born'),
      died: this.isSet(char.died, 'died'),
      culture: this.isSet(char.culture, 'culture'),
    }
  }

  _transformHouse = (house) => {
    return {
      name: this.isSet(house.name, 'name'),
      region: this.isSet(house.region, 'region'),
      words: this.isSet(house.words, 'words'),
      titles: this.isSet(house.titles, 'titles'),
      overlord: this.isSet(house.overlord, 'overlord'),
      ancestralWeapons: this.isSet(house.ancestralWeapons, 'ancestralWeapons'),

    }
  }

  _transformBook = (book) => {
    return {
      name: this.isSet(book.name, 'name'),
      numberOfPages: this.isSet(book.numberOfPages, 'numberOfPages'),
      publisher: this.isSet(book.publisher, 'publisher'),
      released: this.isSet(book.released, 'released'),
    }
  }

}
