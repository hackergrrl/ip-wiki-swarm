var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var EventEmitter = require('events').EventEmitter
var util = require('util')

util.inherit(WikiSwarm, EventEmitter)

function WikiSwarm (wiki, opts) {
  if (!(this instanceof WikiSwarm)) { return new WikiSwarm(wiki, opts) }
  if (!wiki) { throw new Error('must specify a wiki swarm to connect to') }

  EventEmitter.call(this)

  opts = opts || {}

  // poor mafintosh :'(
  opts.hubs = opts.hubs || ['https://signalhub.mafintosh.com']

  var sw = swarm(signalhub(wiki, opts.hubs))

  sw.on('pre-peer', function () {
    page.log('Connecting to peer..')
  })

  sw.on('peer', function (peer, id) {
    page.log('Connected!')

    peer.on('data', function (msg) {
      var root = msg.toString()
      page.log('IP Wiki current root: ' + root)
      page.log('Redirecting...')
      setTimeout(function () {
        window.location = 'http://v04x.ipfs.io' + root
      }, 1000)
    })
  })
}

module.exports = WikiSwarm
