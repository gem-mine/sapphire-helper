const n = String.fromCharCode(110)
const p = String.fromCharCode(112)
const at = String.fromCharCode(64)

const SXP = `sd${p}`
const SXP_PREFIX = `${at}${SXP}.${n}d`
const SXP_NPM = `registry.npm.sd${p}.${n}d`
const SXP_REGISTRY = `http://${SXP_NPM}/`
const TAOBAO_NPM = 'registry.npm.taobao.org'
const TAOBAO_REGISTRY = `https://${TAOBAO_NPM}/`
const OFFICIAL_NPM = 'registry.npmjs.org'
const OFFICIAL_REGISTRY = `https://${OFFICIAL_NPM}/`
const API = `http://gm.zmei.me/sapphire`

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
exports.TIMEOUT = 10000

exports.API = API
exports.NAME = 'sapphire'
