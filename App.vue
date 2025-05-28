<template>
  <el-container>
    <el-header>
      <h1>干部管理系统</h1>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="30" :src="user.avatar" />
            {{ user.name }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical"
          @select="handleMenuSelect"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="cadre-management">
            <template #title>
              <el-icon><User /></el-icon>
              <span>干部信息管理</span>
            </template>
            <el-menu-item index="/cadre-list">干部列表</el-menu-item>
            <el-menu-item index="/cadre-detail/1">干部详情</el-menu-item>
          </el-submenu>
          <el-menu-item index="/import-export">
            <el-icon><Upload /></el-icon>
            <span>批量导入/导出</span>
          </el-menu-item>
          <el-submenu index="approval-management">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>审批管理</span>
            </template>
            <el-menu-item index="/approval-list">审批列表</el-menu-item>
            <el-menu-item index="/approval-process">审批流程</el-menu-item>
          </el-submenu>
          <el-menu-item index="/assessment">
            <el-icon><DataAnalysis /></el-icon>
            <span>考核管理</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <el-icon><PieChart /></el-icon>
            <span>数据统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  House,
  User,
  Upload,
  Document,
  DataAnalysis,
  PieChart,
  ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()

// 模拟用户数据
const user = ref({
  name: '管理员',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

// 菜单选择处理
const handleMenuSelect = (index) => {
  console.log('菜单选择:', index)
}

// 跳转到个人中心
const goToProfile = () => {
  router.push('/profile')
}

// 退出登录
const logout = () => {
  console.log('退出登录')
  // 这里实际项目中应该是调用退出登录API
}
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

.el-header {
  background-color: #409EFF;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.el-header h1 {
  font-size: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
}

.el-dropdown-link .el-avatar {
  margin-right: 8px;
}

.el-aside {
  background-color: #eef0f5;
  height: calc(100vh - 60px);
  border-right: 1px solid #e6e6e6;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}

/* 页面过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>