<!-- src/views/CadreDetailView.vue -->
<template>
  <div class="cadre-detail-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>干部详细信息</span>
          <el-button type="primary" @click="goBack">返回列表</el-button>
        </div>
      </template>
      
      <el-descriptions title="基本信息" border :column="2">
        <el-descriptions-item label="姓名">张三</el-descriptions-item>
        <el-descriptions-item label="性别">男</el-descriptions-item>
        <el-descriptions-item label="出生日期">1985-05-15</el-descriptions-item>
        <el-descriptions-item label="政治面貌">中共党员</el-descriptions-item>
        <el-descriptions-item label="学历">研究生</el-descriptions-item>
        <el-descriptions-item label="学位">硕士</el-descriptions-item>
        <el-descriptions-item label="联系电话">13800138000</el-descriptions-item>
        <el-descriptions-item label="电子邮箱">zhangsan@example.com</el-descriptions-item>
        <el-descriptions-item label="部门">组织部</el-descriptions-item>
        <el-descriptions-item label="职务">部长</el-descriptions-item>
        <el-descriptions-item label="职级">正处级</el-descriptions-item>
        <el-descriptions-item label="入职时间">2010-08-20</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag type="success">在职</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      
      <el-tabs type="border-card" class="detail-tabs">
        <el-tab-pane label="任职经历">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in workExperience"
              :key="index"
              :timestamp="item.time"
              placement="top"
            >
              <el-card>
                <h4>{{ item.position }}</h4>
                <p>{{ item.department }} ({{ item.time }})</p>
                <p>{{ item.description }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="考核记录">
          <el-table :data="assessmentData" border style="width: 100%">
            <el-table-column prop="year" label="年度" width="100" />
            <el-table-column prop="result" label="考核结果" width="120" />
            <el-table-column prop="comment" label="评语" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="viewAssessment(row.id)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="奖惩记录">
          <el-table :data="rewardPunishmentData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="type" label="类型" width="120">
              <template #default="{ row }">
                <el-tag :type="row.type === '奖励' ? 'success' : 'danger'">
                  {{ row.type }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 任职经历数据
const workExperience = ref([
  {
    time: '2010-2020',
    position: '科员',
    department: '组织部办公室',
    description: '负责日常行政工作'
  },
  {
    time: '2020-2023',
    position: '副科长',
    department: '组织部干部科',
    description: '负责干部考核工作'
  },
  {
    time: '2023-至今',
    position: '部长',
    department: '组织部',
    description: '全面负责组织部工作'
  }
])

// 考核记录数据
const assessmentData = ref([
  {
    id: 1,
    year: '2022',
    result: '优秀',
    comment: '工作认真负责，业绩突出'
  },
  {
    id: 2,
    year: '2021',
    result: '良好',
    comment: '工作表现良好'
  },
  {
    id: 3,
    year: '2020',
    result: '合格',
    comment: '基本完成工作任务'
  }
])

// 奖惩记录数据
const rewardPunishmentData = ref([
  {
    date: '2022-12-15',
    type: '奖励',
    title: '年度优秀干部',
    description: '被评为2022年度优秀干部'
  },
  {
    date: '2021-06-20',
    type: '奖励',
    title: '先进工作者',
    description: '被评为2021年上半年先进工作者'
  }
])

// 返回列表
const goBack = () => {
  router.push({ name: 'cadre-list' })
}

// 查看考核详情
const viewAssessment = (id) => {
  console.log('查看考核详情:', id)
}
</script>

<style scoped>
.cadre-detail-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-tabs {
  margin-top: 20px;
}

.el-descriptions {
  margin-bottom: 20px;
}
</style>