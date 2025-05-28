<!-- src/views/CadreListView.vue -->
<template>
  <div class="cadre-list-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>干部信息列表</span>
          <div>
            <el-button type="primary" @click="handleAdd">新增干部</el-button>
            <el-button @click="exportData">导出Excel</el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="gender" label="性别" width="80" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="position" label="职位" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '在职' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button size="small" @click="handleView(row.id)">查看</el-button>
            <el-button size="small" type="primary" @click="handleEdit(row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        class="pagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '张三',
    gender: '男',
    department: '组织部',
    position: '部长',
    status: '在职'
  },
  {
    id: 2,
    name: '李四',
    gender: '女',
    department: '宣传部',
    position: '副部长',
    status: '在职'
  },
  {
    id: 3,
    name: '王五',
    gender: '男',
    department: '办公室',
    position: '主任',
    status: '离职'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const disabled = ref(false)
const background = ref(true)
const total = ref(100)

// 分页变化
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  fetchData()
}

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  fetchData()
}

// 模拟获取数据
const fetchData = () => {
  console.log('Fetching data...', currentPage.value, pageSize.value)
  // 这里实际项目中应该是API调用
}

// 查看详情
const handleView = (id) => {
  router.push({ name: 'cadre-detail', params: { id } })
}

// 编辑
const handleEdit = (id) => {
  ElMessage.info(`编辑ID为${id}的干部信息`)
}

// 新增
const handleAdd = () => {
  ElMessage.info('新增干部')
}

// 导出数据
const exportData = () => {
  ElMessage.success('导出数据成功')
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.cadre-list-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>