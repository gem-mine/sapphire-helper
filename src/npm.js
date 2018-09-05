const { exec, execWithProcess } = require('./cmd')
const { SXP_PREFIX, SXP_REGISTRY, TAOBAO_REGISTRY, OFFICIAL_REGISTRY } = require('./constant')

const REGISTRY = `--registry=${SXP_REGISTRY}`

/**
 * 执行相关 npm 命令，自动识别是否使用 SXP 的 npm 镜像源
 */
function runNpm(command, options = {}, process = false) {
  const registry = command.indexOf(SXP_PREFIX) > -1 ? REGISTRY : ''
  if (process) {
    return execWithProcess(`${command} ${registry}`, options)
  } else {
    return exec(`${command} ${registry}`, options)
  }
}

/**
 * 检测并自动设置 npm 源，如果使用的是官方源，自动切换为指定源（默认淘宝源）
 * 如果切换返回 true，否则返回 false
 */
function autoSetRegistry(registry = TAOBAO_REGISTRY) {
  const currentRegistry = exec('npm get registry')
  if (currentRegistry.indexOf(OFFICIAL_REGISTRY) > -1) {
    exec(`npm set registry ${registry}`)
    return true
  }
  return false
}

module.exports = { runNpm, autoSetRegistry }
