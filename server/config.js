module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/mt',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    get host () {
      return 'smtp.qq.com'
    },
    get user () {
      return '873384125@qq.com'
    },
    get pass () {
      return 'usmdspfdqassbbji'
    },
    get code () {
      // 返回一个函数，这样每次调用才是随机值，否则就是常量了
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire () {
      return ()=>{
        return new Date().getTime() + 60*1000
      }
    }
  }
}