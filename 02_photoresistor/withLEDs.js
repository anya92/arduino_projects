const { EtherPortClient } = require('etherport-client')
const { Board, Sensor, Leds } = require('johnny-five')
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

  const leds = new Leds([9, 11, 13])

  const [red, yellow, green] = leds

  photoresistor.on('data', function() {
    const value = this.value

    if (value > 660) {
      leds.off()
      red.on()
    } else if (value > 330) {
      leds.off()
      yellow.on()
    } else {
      leds.off()
      green.on()
    }
  })

  this.on('exit', function() {
    console.log('Board exiting')

    leds.off()
  })
})
