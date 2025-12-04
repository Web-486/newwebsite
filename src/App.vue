<template>
  <div class="app-container">
    <!-- 现代化导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- 网站Logo -->
        <div class="nav-logo">
          <router-link to="/" class="logo-link">
            <span class="logo-text">互联网应用协会</span>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">首页</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              <span class="nav-icon">ℹ️</span>
              <span class="nav-text">关于</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/activity" class="nav-link">
              <span class="nav-icon">📅</span>
              <span class="nav-text">活动</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/youth-dream" class="nav-link">
              <span class="nav-icon">✨</span>
              <span class="nav-text">青春追梦</span>
            </router-link>
          </li>

          <!-- 登录/注销选项 -->
          <li class="nav-item">
            <button v-if="!isLoggedIn" @click="openLoginModal" class="nav-link login-btn">
              <span class="nav-icon">🔑</span>
              <span class="nav-text">登录</span>
            </button>
            <button v-else @click="logout" class="nav-link logout-btn">
              <span class="nav-icon">🚪</span>
              <span class="nav-text">注销</span>
            </button>
          </li>
        </ul>

        <!-- 移动端菜单按钮 -->
        <div class="nav-toggle" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- 登录模态框 -->
    <el-dialog v-model="loginModalVisible" title="管理员登录" width="400px" :close-on-click-modal="false">
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="loginModalVisible = false">取消</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view :isLoggedIn="isLoggedIn" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMobileMenuOpen: false,
      isLoggedIn: false,
      loginModalVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 页面加载时检查登录状态
    this.checkLoginStatus()
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      const navMenu = document.querySelector('.nav-menu')
      if (navMenu) {
        navMenu.classList.toggle('active')
      }
    },
    openLoginModal() {
      this.loginModalVisible = true
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          // 这里使用简单的硬编码验证，实际项目中应该调用后端API
          if (this.loginForm.username === 'root' && this.loginForm.password === '123456') {
            // 登录成功，保存用户状态到localStorage
            localStorage.setItem('isAdminLoggedIn', 'true')
            this.isLoggedIn = true
            this.loginModalVisible = false
            this.$message.success('登录成功！')
          } else {
            this.$message.error('用户名或密码错误')
          }
        }
      })
    },
    logout() {
      // 清除登录状态
      localStorage.removeItem('isAdminLoggedIn')
      this.isLoggedIn = false
      this.$message.success('已成功注销')
    },
    checkLoginStatus() {
      // 从localStorage检查登录状态
      this.isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'
    }
  },
  watch: {
    $route() {
      // 路由变化时关闭移动端菜单
      this.isMobileMenuOpen = false
      const navMenu = document.querySelector('.nav-menu')
      if (navMenu) {
        navMenu.classList.remove('active')
      }
    }
  },
  provide() {
    // 提供登录状态给子组件
    return {
      isLoggedIn: this.isLoggedIn,
      logout: this.logout
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Logo样式 */
.nav-logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.logo-text {
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-text {
  font-size: 1rem;
}

/* 登录/注销按钮样式 */
.login-btn,
.logout-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.logout-btn {
  color: rgba(255, 255, 255, 0.9);
}

.logout-btn:hover {
  background: rgba(255, 100, 100, 0.2);
  color: white;
}

/* 移动端菜单按钮 */
.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background: white;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding-top: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  background-size: cover;
  background-attachment: fixed;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    gap: 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    margin: 1rem 0;
  }

  .nav-link {
    padding: 1rem 2rem;
    display: block;
    width: 100%;
    border-radius: 0;
  }

  .logo-text {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .nav-container {
    height: 60px;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .nav-menu {
    top: 60px;
  }
}
</style>