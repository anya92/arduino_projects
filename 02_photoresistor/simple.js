const { EtherPortClient } = require('etherport-client')
const { Board, Sensor } = require('johnny-five')
const { host, port } = require('../config')

const board = new Board({
  port: new EtherPortClient({
    host,
    port
  }),
  timeout: 1e5
})

board.on('ready', function() {
  console.log('Board ready')

  const photoresistor = new Sensor({
    pin: 'A0',
    freq: 500
  })

  board.repl.inject({
    pot: photoresistor
  })

  photoresistor.on('data', function() {
    console.log(this.value)
  })
})
