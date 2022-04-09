<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
        <img  class="cover-image" src="">
        <el-dialog
            title="选择封面"
            :visible.sync="dialogVisible"
            width="30%"
            append-to-body>
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="素材库" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="上传图片" name="second">配置管理</el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadCover',
  components: {},
  props: {},
  data () {
    return {
      dialogVisible: false,
      activeName: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 100px;
  border: 1px solid #000;
}
</style>
