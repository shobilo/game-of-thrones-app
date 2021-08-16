import moment from 'moment'

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

  isSet = (data) => {
    if (Array.isArray(data)) {
      return (data.length !== 0 && data[0] !== '') ? data : `no data`
    }
    return data ? data : `no data`
  }

  _extractId = (item) => {
    const idRegEx = /\/([0-9]*)$/
    return item.url.match(idRegEx)[1]
  }
  
  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
    }
  }

  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons)
    }
  }

  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      released: moment(this.isSet(book.released)).format('DD-MM-YYYY'),
    }
  }

}
