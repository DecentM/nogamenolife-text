const rucksack = require('rucksack-css')
const flexibility = require('postcss-flexibility')
const willChange = require('postcss-will-change')
const willChangeTransition = require('postcss-will-change-transition')
const ellipsis = require('postcss-ellipsis')

const postcss = [
  // Syntax extending plugins
  rucksack({
    'autoprefixer':      false,
    'shorthandPosition': false,
    'quantityQueries':   false,
    'alias':             false,
    'inputPseudo':       false,
  }),
  ellipsis(),
  // Zero-effort feature adding plugins
  flexibility(),
  willChange(),
  willChangeTransition(),
]

const dev = process.env.NODE_ENV === 'development'
const ci = process.env.CI
const analyze = dev && !ci

module.exports = {
  'srcDir': './app',
  'head':   {
    'titleTemplate': 'No Game No Life text demo',
    'meta':          [
      {'charset': 'utf-8',},
      {'http-equiv': 'x-ua-compatible', 'content': 'ie=edge',},
      {'name': 'skype_toolbar', 'content': 'skype_toolbar_parser_compatible',},
      {'name': 'msapplication-tap-highlight', 'content': 'no',},
      {'name': 'renderer', 'content': 'webkit|ie-comp|ie-stand',},
      {'name': 'x5-page-mode', 'content': 'app',},
      {'name': 'browsermode', 'content': 'application',},
      {'name': 'wap-font-scale', 'content': 'no',},
      {'name': 'viewport', 'content': 'width=device-width, initial-scale=1, shrink-to-fit=no',},
      {'name': 'application-name', 'content': 'No Game No Life text demo',},
      {'name': 'robots', 'content': 'index,follow',},
      {'name': 'format-detection', 'content': 'telephone=no',},
      {'name': 'mobile-web-capable', 'content': 'yes',},
    ],
    'link': [
      {'rel': 'license', 'href': '//github.com/DecentM/vue-nogamenolife/LICENSE',},
      {'rel': 'me', 'href': '//decentm.com',},
    ],
  },
  'css': [
    '~/scss/main.scss',
  ],
  'plugins': [
    '~/plugins/vue-filters',
  ],
  'modules': [
    [
      'nuxt-matomo', {
        'matomoUrl': '//pwk.decentm.com/',
        'siteId':    11,
        'cookies':   false,
      },
    ],
  ],
  'build': {
    analyze,
    postcss,
  },
}
