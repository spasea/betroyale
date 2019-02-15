class Alert {
  static execute (message) {
    alert(message)

    return Promise.resolve(true)
  }
}

export default Alert
