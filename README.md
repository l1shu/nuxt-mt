# nuxt-mt

## nuxt 流程图
Incoming Request
      |
      |
nuxtServerInit
(store action)
      |
      |
  middleware  <—————————————————————
1. nuxt.config.js                   |
2. matching layout                  |
3. matching page & children         |
      |                             |
      |                             |
  validate()                     Navigate
(pages & chidlren)              <nuxt-link>
      |                             |
      |                             |
asyncData() & fetch()               |
(pages & chidlren)                  |
      |                             |
      |                             |
    Render —————————————————————————

## 数据库导入
mongoimport -d [dbs] -c [collection] [document.dat]
1. dbs: 数据库
2. collection: 数据结合
3. document.dat: 数据源

## 接口签名
http://cp-tools.cn/sign