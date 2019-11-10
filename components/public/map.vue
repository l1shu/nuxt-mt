<template>
  <div id="ls" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    point: {
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data() {
    return {
      key: 'f8a14a2e5b2a66fd05f86a541a28b03f'
    }
  },
  watch: {
    point (val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
      let map = new window.AMap.Map('ls', {
        resizeEnable: true,
        zoom: 11,
        center: this.point
      })
      this.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: this.point
        })
        this.marker = marker
        marker.setMap(map)
      })
  },
}
</script>
