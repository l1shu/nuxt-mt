<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item"
      >
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="block in blocks"
      :key="block.title"
      class="m-categroy-section"
    >
      <dt :id="'city-' + block.title">{{ block.title }}</dt>
      <dd>
        <span
          v-for="c in block.city"
          :key="c"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'

export default {
  data () {
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      blocks:[]
    }
  },
  async mounted(){
    let blocks = []
    let { status, data }=await this.$axios.get('/geo/city')

    if (status === 200 && data.ret == 0) {
      let city = data.data.city
      let cityMap = {}

      city.forEach(item => {
        let firstLetter = pyjs.getFullChars(item.name).toLowerCase().slice(0,1)
        let firstCode = firstLetter.charCodeAt(0)

        if (firstCode > 96 && firstCode < 123) {
          if (!cityMap[firstLetter]) cityMap[firstLetter] = []
          cityMap[firstLetter].push(item.name)
        }
      })
      
      Object.entries(cityMap).forEach(([key, value]) => {
        blocks.push({
          title: key.toUpperCase(),
          city: value
        })
      })

      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      this.blocks = blocks
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/categroy.scss";
</style>
