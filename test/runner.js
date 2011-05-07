JSCLASS_PATH = 'vendor/js.class/build/min'
require('../' + JSCLASS_PATH + '/loader')

JS.ENV.DynamicAudio = function() {}

JS.Packages(function() { with(this) {
  file('build/zairecma.js').provides('ZairECMA')
  autoload(/.*Spec$/, {from: 'test'})
}})

JS.require('JS.Test', 'ZairECMA', function() {
  JS.require('ZairecmaSpec', JS.Test.method('autorun'))
})
