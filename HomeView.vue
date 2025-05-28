<!-- src/views/HomeView.vue -->
<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <div class="welcome-content">
        <h1>欢迎使用干部管理系统</h1>
        <el-divider />
        <div class="system-info">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <el-icon><User /></el-icon>
                    <span>干部信息</span>
                  </div>
                </template>
                <p>当前系统共有干部信息：<strong>1,258</strong> 条</p>
                <p>本月更新：<strong>24</strong> 条</p>
                <el-button type="text" @click="goToCadreList">查看全部</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <el-icon><Document /></el-icon>
                    <span>审批流程</span>
                  </div>
                </template>
                <p>待您审批：<strong>5</strong> 条</p>
                <p>您的申请：<strong>2</strong> 条</p>
                <el-button type="text" @click="goToApproval">前往审批</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <el-icon><DataAnalysis /></el-icon>
                    <span>数据统计</span>
                  </div>
                </template>
                <p>干部分布：<strong>12</strong> 个部门</p>
                <p>年度考核：<strong>86%</strong> 完成率</p>
                <el-button type="text" @click="goToStatistics">查看统计</el-button>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-divider />
        <div class="quick-actions">
          <h3>快捷操作</h3>
          <el-space wrap>
            <el-button type="primary" @click="goToCadreAdd">
              <el-icon><Plus /></el-icon>
              新增干部
            </el-button>
            <el-button @click="goToImport">
              <el-icon><Upload /></el-icon>
              批量导入
            </el-button>
            <el-button @click="goToReport">
              <el-icon><Document /></el-icon>
              生成报告
            </el-button>
          </el-space>
        </div>
      </div>
    </el-card>
    
    <el-card class="notice-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span><el-icon><Bell /></el-icon> 系统公告</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in notices"
          :key="index"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
            <el-button v-if="item.link" type="text" @click="viewNotice(item)">查看详情</el-button>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Document,
  DataAnalysis,
  Plus,
  Upload,
  Bell
} from '@element-plus/icons-vue'

const router = useRouter()

// 公告数据
const notices = ref([
  {
    title: '系统升级维护通知',
    content: '系统将于2023年5月25日00:00-06:00进行升级维护，期间将暂停服务。',
    time: '2023-05-20',
    link: '#'
  },
  {
    title: '干部信息采集通知',
    content: '请各部门于2023年5月30日前完成本季度干部信息更新工作。',
    time: '2023-05-15',
    link: '#'
  },
  {
    title: '系统使用培训',
    content: '本周五下午3点将举行系统使用培训，请各部门派员参加。',
    time: '2023-05-10',
    link: '#'
  }
])

// 导航方法
const goToCadreList = () => {
  router.push('/cadre-list')
}

const goToApproval = () => {
  router.push('/approval')
}

const goToStatistics = () => {
  ElMessage.info('即将跳转到统计页面')
}

const goToCadreAdd = () => {
  ElMessage.info('即将跳转到新增干部页面')
}

const goToImport = () => {
  router.push('/import-export')
}

const goToReport = () => {
  ElMessage.info('即将跳转到报告生成页面')
}

const viewNotice = (item) => {
  ElMessage.info(`查看公告：${item.title}`)
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-card {
  text-align: center;
}

.welcome-content h1 {
  margin-bottom: 20px;
  color: #409EFF;
}

.system-info {
  margin: 20px 0;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.quick-actions {
  margin: 20px 0;
}

.notice-card {
  text-align: left;
}
</style>