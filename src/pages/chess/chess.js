// inputs -> fen string
// outputs -> onmove, ongameover, oncapture, onstatechange

import Chessboard from '../../components/chessboard/chessboard.vue'
// import Socket from '../../services/chess-socket'
// import StockfishApi from '../../services/stockfish-api'
import Chess from 'chess.js'

export default {
  name: 'chess',
  components: {
    Chessboard
  },
  data () {
    return {
      pgn: undefined,
      userid: Math.floor(Math.random() * 1000),
      side: 'w',
      twoplayer: false,
      iconDir: 'static/icons/',
      startnew: false,
      blackplayer: '',
      whiteplayer: '',
      historyshow: false,
      gamehistory: null
    }
  },
  computed: {
    game () {
      const chess = Chess()
      chess.load_pgn(this.pgn)
      return chess
    }
  },
  created () {
    this.newGame();
    this.$socket.on('log', (msg) => {
      console.log('LOG>', msg)
    })
    // this.stockfishApi = new StockfishApi()
    // this.ai = new Ai()
    // this.socket = new Socket(this.userid)
    // console.log('NEW SOCKET', this.socket) // TODO: REMOVE

    // this.socket.onNewMove((newMove) => {
    //   console.log(newMove)
    //   this.move(newMove.move)
    // })
  },
  methods: {
    getHistory () {
      this.$http.get('http://localhost:3000/history').then(res => {
        this.$set(this, 'historyshow', true)
        // this.historyshow = false
        this.$set(this, 'gamehistory', res.body)
      })
    },
    newGame () {
      const chess = Chess()
      this.pgn = chess.pgn()
    },
    boardChange (pgn) {
      console.log('BOARD CHANGED', pgn) // TODO: REMOVE
      this.pgn = pgn
      this.$socket.emit('newpgn', pgn)
    },
    swapSides () {
      if (this.side === 'w') {
        this.side = 'b'
      } else {
        this.side = 'w'
      }
    },
    randomMove () {
      const moves = this.game.moves()
      const move = moves[Math.floor(Math.random() * (moves.length - 1))]
      this.move(move)
    },
    move (move) {
      console.log('MOVE cmd', move) // TODO: REMOVE
      const result = this.game.move(move, {sloppy: true})
      console.log('MOVE RES', result) // TODO: REMOVE
      this.pgn = this.game.pgn()
    },
    reset () {
      this.startnew = false
      this.$socket.emit('newgame', {player1: this.whiteplayer, player2: this.blackplayer});
      const chess = this.newGame()
      this.pgn = chess.pgn()
    }
  }
}
