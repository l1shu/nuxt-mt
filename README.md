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
