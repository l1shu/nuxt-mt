<template>
  <div class="page-changeCity">
    <el-row>
      <el-col>
        <iSelect></iSelect>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <Hot></Hot>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <Categroy></Categroy>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Categroy from '@/components/changeCity/categroy.vue'

export default {
  components:{ iSelect, Hot, Categroy }
}
</script>

<style>

</style>