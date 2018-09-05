const n = String.fromCharCode(110)
const p = String.fromCharCode(112)
const at = String.fromCharCode(64)

const SDP_PREFIX = `${at}sd${p}.${n}d`
const SDP_NPM = `registry.npm.sd${p}.${n}d`
const SDP_REGISTRY = `http://${SDP_NPM}/`
const TAOBAO_NPM = 'registry.npm.taobao.org'
const TAOBAO_REGISTRY = `https://${TAOBAO_NPM}/`
const OFFICIAL_NPM = 'registry.npmjs.org'
const OFFICIAL_REGISTRY = `https://${OFFICIAL_NPM}/`
const API = `http://cors.zmei.me`

exports.SDP_PREFIX = SDP_PREFIX
exports.SDP_REGISTRY = SDP_REGISTRY
exports.SDP_NPM = SDP_NPM
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
