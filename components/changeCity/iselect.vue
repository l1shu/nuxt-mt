<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      province: [], // 所有省
      city: [], // 当前省的市
      pvalue: '', // 选中省
      cvalue: '', // 选中市
      input: '', // 搜索项
      cities: [] // 所有市
    }
  },
  watch: {
    async pvalue (pvalue) {
      this.cvalue = ''
      
      let { status, data } = await this.$axios.get(`/geo/province/${pvalue}`)
      if (status===200 && data.ret == 0) {
        let city = data.data.city
        this.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    }
  },
  async mounted () {
    let { status, data } = await this.$axios.get('/geo/province')
    if (status===200 && data.ret == 0) {
      let province = data.data.province
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      if (this.cities.length == 0) {
        let { status, data } = await this.$axios.get('/geo/city')
        if (status == 200 && data.ret == 0) {
          let city = data.data.city
          this.cities = city.map(item => {
            return {
              value: item.name
            }
          })
        }
      }
      cb(this.cities.filter(item => item.value.indexOf(query) > -1))
    }, 200),
    handleSelect (item) {
      
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>