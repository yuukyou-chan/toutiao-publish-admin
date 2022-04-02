<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
       <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
  </div>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
    <el-form-item label="内容">
    <el-input type="textarea" v-model="article.content"></el-input>
  </el-form-item>
    <el-form-item label="封面">
    <el-radio-group v-model="article.cover.type">
      <el-radio :label="1">单图</el-radio>
      <el-radio :label="3">三图</el-radio>
      <el-radio :label="0">无图</el-radio>
      <el-radio :label="-1">自动</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="article.channel_id" labelplaceholder="请选择频道">
      <el-option
       :label="chanel.name"
       :value="chanel.id"
       v-for="(chanel, index) in channels"
       :key="index"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onPublish(false)">发表</el-button>
    <el-button @click="onPublish(true)">存入草稿</el-button>
  </el-form-item>
</el-form>
</el-card>

</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    this.loadArticle()
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, this.article, draft).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      } else {
        addArticle(this.article, draft).then(res => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
