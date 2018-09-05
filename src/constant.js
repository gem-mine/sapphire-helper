const n = String.fromCharCode(110)
const p = String.fromCharCode(112)
const at = String.fromCharCode(64)

const SXP = `${at}sd${p}`
const SXP_PREFIX = `${SXP}.${n}d`
const SXP_NPM = `registry.npm.sd${p}.${n}d`
const SXP_REGISTRY = `http://${SXP_NPM}/`
const TAOBAO_NPM = 'registry.npm.taobao.org'
const TAOBAO_REGISTRY = `https://${TAOBAO_NPM}/`
const OFFICIAL_NPM = 'registry.npmjs.org'
const OFFICIAL_REGISTRY = `https://${OFFICIAL_NPM}/`
const API = `http://cors.zmei.me`

exports.SXP = SXP
exports.SXP_PREFIX = SXP_PREFIX
exports.SXP_REGISTRY = SXP_REGISTRY
exports.SXP_NPM = SXP_NPM
exports.TAOBAO_REGISTRY = TAOBAO_REGISTRY
exports.TAOBAO_NPM = TAOBAO_NPM
exports.OFFICIAL_REGISTRY = OFFICIAL_REGISTRY
exports.OFFICIAL_NPM = OFFICIAL_NPM

exports.PC = 'pc'
exports.MOBILE = 'mobile'
exports.MORDEN = 'morden'
exports.IE8 = 'ie8'
exports.TIMEOUT = 10000

exports.API = API
