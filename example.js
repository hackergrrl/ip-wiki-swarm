var WikiSwarm = require('./index')
var fs = require('fs')

var swarm = new WikiSwarm('ipfs', {
  fullNode: true,  // <--- test both ways!
  hubs: ['https://signalhub.mafintosh.com']
})

// publish an article edit
var edit = {
  'author': 'noffle',
  'article': 'StoryOfMel',
  'content': fs.readFileSync('StoryOfMel.markdown')
}
swarm.publish(edit, function (err) {
  console.log(err ? err : 'successfully edited')
})

swarm.on('root', function (root) {
  console.log('new root hash is', root)
})

