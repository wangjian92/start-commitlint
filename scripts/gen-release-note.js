const version = process.argv[2] || process.env.VERSION || require('../package.json').version
const cc = require('conventional-changelog')
const file = `./CHANGELOGS/CHANGELOG${version ? `_${version}` : ``}.md`
const fileStream = require('fs').createWriteStream(file)

cc({
  preset: 'angular',
  pkg: {
    transform(pkg) {
      pkg.version = `v${version}`
      return pkg
    }
  }
}).pipe(fileStream).on('close', () => {
  console.log(`Generated release note at ${file}`)
})
