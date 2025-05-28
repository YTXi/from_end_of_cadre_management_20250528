<!-- src/views/ImportExportView.vue -->
<template>
  <div class="import-export-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>批量导入/导出</span>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>数据导入</span>
              </div>
            </template>
            
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="handleImportSuccess"
              :on-error="handleImportError"
              :before-upload="beforeImportUpload"
              accept=".xlsx,.xls"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件到此处或<em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  请上传Excel文件，支持.xlsx和.xls格式
                </div>
              </template>
            </el-upload>
            
            <div class="template-download">
              <el-button type="text" @click="downloadTemplate">
                <el-icon><Download /></el-icon>
                下载导入模板
              </el-button>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>数据导出</span>
              </div>
            </template>
            
            <el-form :model="exportForm" label-width="120px">
              <el-form-item label="导出范围">
                <el-select v-model="exportForm.range" placeholder="请选择">
                  <el-option label="全部数据" value="all"></el-option>
                  <el-option label="当前页数据" value="current"></el-option>
                  <el-option label="选中数据" value="selected"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="导出字段">
                <el-checkbox-group v-model="exportForm.fields">
                  <el-checkbox label="name" name="type">姓名</el-checkbox>
                  <el-checkbox label="gender" name="type">性别</el-checkbox>
                  <el-checkbox label="department" name="type">部门</el-checkbox>
                  <el-checkbox label="position" name="type">职位</el-checkbox>
                  <el-checkbox label="status" name="type">状态</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="handleExport">导出Excel</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UploadFilled, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const exportForm = ref({
  range: 'all',
  fields: ['name', 'gender', 'department', 'position', 'status']
})

// 导入成功处理
const handleImportSuccess = (response, file, fileList) => {
  ElMessage.success(`文件 ${file.name} 导入成功`)
  console.log('导入成功:', response)
}

// 导入错误处理
const handleImportError = (error, file, fileList) => {
  ElMessage.error(`文件 ${file.name} 导入失败`)
  console.error('导入失败:', error)
}

// 上传前校验
const beforeImportUpload = (file) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                  file.type === 'application/vnd.ms-excel'
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isExcel) {
    ElMessage.error('只能上传Excel文件!')
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过10MB!')
  }
  return isExcel && isLt10M
}

// 下载模板
const downloadTemplate = () => {
  ElMessage.success('模板下载开始')
  // 这里实际项目中应该是API调用获取模板文件
}

// 导出处理
const handleExport = () => {
  ElMessage.success('导出数据开始')
  console.log('导出参数:', exportForm.value)
  // 这里实际项目中应该是API调用导出数据
}
</script>

<style scoped>
.import-export-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-demo {
  text-align: center;
}

.template-download {
  margin-top: 20px;
  text-align: center;
}

.el-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>