const { EtherPortClient } = require('etherport-client')
const { Board, Sensor } = require('johnny-five')

const board = new Board({
  port: new EtherPortClient({
    host: '192.168.0.104',
    port: 3030
  }),
  timeout: 1e5
})

board.on('ready', function() {
  console.log('Board ready')

  const photoresistor = new Sensor({
    pin: 'A0',
    freq: 200
  })

  board.repl.inject({
    pot: photoresistor
  })

  photoresistor.on('data', function() {
    console.log(this.value)
  })
})
