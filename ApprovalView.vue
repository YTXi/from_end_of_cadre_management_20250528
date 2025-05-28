<!-- src/views/ApprovalView.vue -->
<template>
  <div class="approval-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>信息变更审批</span>
          <el-button type="primary" @click="showApplyDialog = true">提交申请</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="待我审批" name="pending">
          <el-table :data="pendingApprovals" border style="width: 100%">
            <el-table-column prop="id" label="申请ID" width="100" />
            <el-table-column prop="applicant" label="申请人" width="120" />
            <el-table-column prop="type" label="变更类型" width="150" />
            <el-table-column prop="content" label="变更内容" />
            <el-table-column prop="applyTime" label="申请时间" width="180" />
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button size="small" @click="viewDetail(row)">查看</el-button>
                <el-button size="small" type="primary" @click="handleApprove(row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="我的申请" name="myApplications">
          <el-table :data="myApplications" border style="width: 100%">
            <el-table-column prop="id" label="申请ID" width="100" />
            <el-table-column prop="type" label="变更类型" width="150" />
            <el-table-column prop="content" label="变更内容" />
            <el-table-column prop="status" label="状态" width="120">
              <template #default="{ row }">
                <el-tag :type="statusTagType(row.status)">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="180" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="viewDetail(row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="已审批记录" name="approved">
          <el-table :data="approvedRecords" border style="width: 100%">
            <el-table-column prop="id" label="申请ID" width="100" />
            <el-table-column prop="applicant" label="申请人" width="120" />
            <el-table-column prop="type" label="变更类型" width="150" />
            <el-table-column prop="content" label="变更内容" />
            <el-table-column prop="result" label="审批结果" width="120">
              <template #default="{ row }">
                <el-tag :type="row.result === '通过' ? 'success' : 'danger'">
                  {{ row.result }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="approvalTime" label="审批时间" width="180" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 申请对话框 -->
    <el-dialog v-model="showApplyDialog" title="提交变更申请" width="50%">
      <el-form :model="applyForm" label-width="100px">
        <el-form-item label="变更类型" required>
          <el-select v-model="applyForm.type" placeholder="请选择变更类型">
            <el-option label="基本信息变更" value="basic" />
            <el-option label="职务变更" value="position" />
            <el-option label="部门调动" value="department" />
            <el-option label="其他变更" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="变更内容" required>
          <el-input
            v-model="applyForm.content"
            type="textarea"
            :rows="4"
            placeholder="请详细描述变更内容"
          />
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                支持上传jpg/png/pdf/doc文件，单个文件不超过10MB
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showApplyDialog = false">取消</el-button>
          <el-button type="primary" @click="submitApplication">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 审批对话框 -->
    <el-dialog v-model="showApproveDialog" title="审批变更申请" width="50%">
      <el-descriptions border :column="1">
        <el-descriptions-item label="申请人">李四</el-descriptions-item>
        <el-descriptions-item label="变更类型">职务变更</el-descriptions-item>
        <el-descriptions-item label="变更内容">
          从宣传部副部长晋升为宣传部部长
        </el-descriptions-item>
        <el-descriptions-item label="申请时间">2023-05-20 14:30:45</el-descriptions-item>
      </el-descriptions>
      <el-form :model="approveForm" label-width="100px" style="margin-top: 20px;">
        <el-form-item label="审批意见" required>
          <el-radio-group v-model="approveForm.result">
            <el-radio label="通过">通过</el-radio>
            <el-radio label="拒绝">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批备注">
          <el-input
            v-model="approveForm.comment"
            type="textarea"
            :rows="3"
            placeholder="请输入审批备注（选填）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showApproveDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmApprove">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const activeTab = ref('pending')

// 待审批数据
const pendingApprovals = ref([
  {
    id: '2023052001',
    applicant: '李四',
    type: '职务变更',
    content: '从宣传部副部长晋升为宣传部部长',
    applyTime: '2023-05-20 14:30:45'
  },
  {
    id: '2023051902',
    applicant: '王五',
    type: '部门调动',
    content: '从办公室调动到组织部',
    applyTime: '2023-05-19 09:15:30'
  }
])

// 我的申请数据
const myApplications = ref([
  {
    id: '2023051803',
    type: '基本信息变更',
    content: '更新学历信息为硕士研究生',
    status: '已通过',
    updateTime: '2023-05-18 16:45:20'
  },
  {
    id: '2023051704',
    type: '其他变更',
    content: '更新联系方式',
    status: '审批中',
    updateTime: '2023-05-17 11:20:15'
  }
])

// 已审批记录数据
const approvedRecords = ref([
  {
    id: '2023051505',
    applicant: '张三',
    type: '职务变更',
    content: '从科员晋升为副科长',
    result: '通过',
    approvalTime: '2023-05-15 10:30:00'
  }
])

// 申请相关
const showApplyDialog = ref(false)
const applyForm = ref({
  type: '',
  content: ''
})

// 审批相关
const showApproveDialog = ref(false)
const approveForm = ref({
  result: '',
  comment: ''
})
const currentApproveItem = ref(null)

// 状态标签类型
const statusTagType = (status) => {
  switch (status) {
    case '已通过':
      return 'success'
    case '审批中':
      return 'warning'
    case '已拒绝':
      return 'danger'
    default:
      return ''
  }
}

// 查看详情
const viewDetail = (row) => {
  ElMessage.info(`查看申请详情：${row.id}`)
  // 实际项目中这里可以跳转到详情页或显示详情弹窗
}

// 处理审批
const handleApprove = (row) => {
  currentApproveItem.value = row
  showApproveDialog.value = true
}

// 确认审批
const confirmApprove = () => {
  ElMessage.success(`审批完成，结果：${approveForm.value.result}`)
  showApproveDialog.value = false
  approveForm.value = { result: '', comment: '' }
}

// 提交申请
const submitApplication = () => {
  ElMessage.success('变更申请已提交')
  showApplyDialog.value = false
  applyForm.value = { type: '', content: '' }
}

// 上传文件超出限制
const handleExceed = () => {
  ElMessage.warning('最多只能上传3个文件')
}
</script>

<style scoped>
.approval-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>