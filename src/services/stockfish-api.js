import axios from 'axios'

export default class {
  constructor (url = 'https://stockfish.patricktriest.com') {
    console.log('CONSTRUCT STOCKFISH', 1) // TODO: REMOVE
    this.baseurl = url
  }

  getBestMove (fen, difficulty = 3) {
    return axios.get(`${this.baseurl}/bestmove`, { params: { fen, difficulty } })
  }
}
