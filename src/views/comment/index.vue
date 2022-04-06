<template>
  <div class="comment-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        </div>
<!-- 表格 -->
 <el-table
      class="table-list"
      :data="articles"
      style="width: 100%"
      stripe>
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
            <el-table-column
        prop="comment_status"
        label="状态">
        <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭'}}
        </template>
      </el-table-column>
            <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
            <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onChange(scope.row)"
            :disabled="scope.row.statusDisabled">
            </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      background>
    </el-pagination>
</el-card>
  </div>
</template>

<script>
import {
  getArticles,
  updateCommentStatus
} from '@/api/article'
export default {
  name: 'CommenIndex',
  component: {},
  props: {},
  data () {
    return {
      articles: [], // 文章
      totalCount: 0,
      pageSize: 10,
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    handleSizeChange (page) {
      this.loadArticles(page = 1)
    },
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    onChange (article) {
      article.statusDisabled = true
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.statusDisabled = false
      })
    }
  }
}
</script>

<style>
.table-list {
  margin-bottom:30px
}
</style>
