import socketio from 'socket.io-client'

export default class {
  constructor (userid, url = 'ws://localhost:3003') {
    console.log('CONSTRUNCTING CHESS SOCKET', userid) // TODO: REMOVE
    this.userid = userid
    this.socket = socketio(url)
  }

  emitMove (move) {
    console.log('EMIT MOVE', move)  // TODO: REMOVE
    this.socket.emit('newmove', {
      move: move,
      sender: this.userid
    })
  }

  onNewConnection (cb) {
    this.socket.on('new connection', cb)
  }

  onConnected (cb) {
    this.socket.on('connect', cb)
  }

  onDisconnect (cb) {
    this.socket.on('disconnect', cb)
  }

  onNewMove (cb) {
    console.log('WE HAVE A MOVE')
    this.socket.on('newmove', cb)
  }

  getUserId () {
    return this.userid
  }
}
