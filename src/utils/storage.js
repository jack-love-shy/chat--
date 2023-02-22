import config from './../config'

export default {
  setItem (key, value) {
    const storage = this.getStorage()
    storage[key] = value
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  clearItem (key) {
    const storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.clear()
  },
  getStorage () {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  }
}
