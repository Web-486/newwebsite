<template>
  <div class="app-container">
    <!-- 现代化导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- 网站Logo -->
        <div class="nav-logo">
          <router-link to="/" class="logo-link">
            <span class="logo-text">DreamSpace</span>
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
            <router-link to="/youth-dream" class="nav-link">
              <span class="nav-icon">✨</span>
              <span class="nav-text">青春追梦</span>
            </router-link>
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

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      const navMenu = document.querySelector('.nav-menu')
      if (navMenu) {
        navMenu.classList.toggle('active')
      }
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