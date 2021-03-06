class BaseModel {
  constructor (data, msg) {
    if (typeof data === 'string') {
      this.msg = data
      return
    }
    if (data) {
      this.data = data
    }
    if (msg) {
      this.msg = msg
    }
  }
}

class SuccessModel extends BaseModel {
  constructor (data, msg) {
    super(data, msg)
    this.ret = 0
  }
}

class ErrorModel extends BaseModel {
  constructor (data, msg) {
    super(data, msg)
    this.ret = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}