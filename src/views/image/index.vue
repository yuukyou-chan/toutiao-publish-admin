<template>
  <div class="image-container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div class="action-head">
      <el-radio-group
      v-model="radio1"
      size="mini"
      @change="onCollectChanged">
        <el-radio-button :label="false" >全部</el-radio-button>
        <el-radio-button :label="true" >收藏</el-radio-button>
      </el-radio-group>
       <el-button
        size="mini"
        type="success"
        @click="dialogUploadVisible = true">上传素材</el-button>
    </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
         :md="6"
         :xs="12"
         :sm="6"
         :lg="4"
         v-for="(img,index) in images"
         :key="index">
         <el-image
           style="height: 100px"
           :src="img.url"
           fit="cover"
           ></el-image>
           </el-col>
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          >
        </el-pagination>
</el-card>
    <el-dialog
    title="上传素材"
    :visible.sync="dialogUploadVisible"
    :append-to-body="true">
        <el-upload
        v-if="dialogUploadVisible"
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      radio1: '全部',
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () {},
  methods: {
    loadImages (collect = false) {
      getImages({ collect }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChanged (value) {
      this.loadImages(value)
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(false)
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
