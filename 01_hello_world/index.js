const { EtherPortClient } = require('etherport-client')
const { Board, Led } = require('johnny-five')

const board = new Board({
  port: new EtherPortClient({
    host: '192.168.0.103',
    port: 3030
  }),
  repl: false,
  timeout: 1e5
})

board.on('ready', function() {
  console.log('Board ready')

  const led = new Led(13)

  led.blink(500)

  this.on('exit', function() {
    console.log('Board exiting')

    led.off()
  })
})
