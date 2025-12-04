<template>

  <div class="common-layout">
    <el-container>
      <!-- <el-header>网页设计新视界</el-header> -->
      <el-main>


        <el-radio-group v-model="size">
          <el-radio value="large">Large</el-radio>
          <el-radio value="default">Default</el-radio>
          <el-radio value="small">Small</el-radio>
        </el-radio-group>

        <el-descriptions title="网页设计新视界" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">会长</el-tag>
              <el-tag size="small">李顺安</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[0].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">线上</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">实践实习</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            从浏览器底层渲染原理到网站实现演示，全新视角解读网页设计。
            涵盖色彩搭配、布局技巧、交互设计等，带你领略前沿趋势。
            无论初学者还是设计爱好者，都能在这里收获满满，开启创意设计之旅！
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[0].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[0].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>


    </el-container>


    <el-container>
      <!-- <el-header>404 错误页面设计活动</el-header> -->
      <el-main>
        <el-descriptions title="404 错误页面设计活动" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">会长</el-tag>
              <el-tag size="small">李顺安</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[1].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">线上</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">实践实习</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            你遇过404页面吗？现在，把它变成创意画布！无论简约、酷炫、幽默，还是艺术风，都尽情发挥。用设计赋予404温暖与个性，引导用户不再焦虑。快来参加404错误页面设计活动，重新定义404，让错误变得有趣！
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[1].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[1].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>





    <el-container>
      <!-- <el-header>PhotoShop入门教学：开启你的创意之旅</el-header> -->
      <el-main>
        <el-descriptions title="PhotoShop入门教学：开启你的创意之旅" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">会长</el-tag>
              <el-tag size="small">李顺安</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[2].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">长江新区教学楼B100</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">创新创业</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            想学习PhotoShop却不知从何开始？本教学带你轻松入门！从界面认识到基础操作，再到实用技巧，一步步掌握修图、调色、合成等技能，让你也能玩转PS，释放创意，制作出令人惊艳的作品！
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[2].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[2].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>


    <el-container>
      <!-- <el-header>PR软件入门教学</el-header> -->
      <el-main>
        <el-descriptions title="PR软件入门教学" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">副会长</el-tag>
              <el-tag size="small">左飘</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[3].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">长江新区教学楼B100</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">创新创业</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            想玩转视频剪辑吗？快来加入我们的PR软件实战课堂！专业讲师手把手教你剪辑技巧，从基础操作到炫酷特效，轻松入门Adobe Premiere！无论你是新手还是想提升技能，这里都能满足你。
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[3].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[3].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>



    <!-- 第五个活动：PS软件入门教学 -->
    <el-container>
      <!-- <el-header>PS软件入门教学</el-header> -->
      <el-main>
        <el-descriptions title="PS软件入门教学" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">会长</el-tag>
              <el-tag size="small">李顺安</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[4].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">长江新区教学楼B100</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">创新创业</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            想学习Photoshop却不知从何入手？快来参加我们的PS入门教学活动吧！本次活动将带你从零开始，掌握PS的基础操作，包括图层、选区、修图等实用技巧。无论你是设计小白还是想提升技能，这里都能满足你。
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[4].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[4].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>

    <!-- 第六个活动：IT文化节开幕式暨1024程序员节 -->
    <el-container>
      <!-- <el-header>IT文化节开幕式暨1024程序员节</el-header> -->
      <el-main>
        <el-descriptions title="IT文化节开幕式暨1024程序员节" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small" type="warning">无</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[5].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">求索广场</el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            无
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[5].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[5].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>

    <!-- 第七个活动："指尖绘意，弹幕狂想"网页教学活动 -->
    <el-container>
      <!-- <el-header>"指尖绘意，弹幕狂想"网页教学活动</el-header> -->
      <el-main>
        <el-descriptions title="指尖绘意，弹幕狂想网页教学活动" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">会长</el-tag>
              <el-tag size="small">李顺安</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[6].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">武昌校区教4-204</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">思想成长</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            采用线上线下结合的形式。核心内容是先通过AI辅助教学，手把手带领同学们学习网站开发基础，随后让大家进入一个特制的互动网页进行自由创作与弹幕互动。参与者可以在虚拟涂鸦墙上绘画，并发送留言，所有作品和留言都会实时展示在大屏幕上，形成一个充满科技感与创意表达的沉浸式互动体验。整个活动无需预算，旨在寓教于乐地推广网页技术。
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[6].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[6].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>


    <el-container>
      <!-- <el-header>IT知识挑战赛</el-header> -->
      <el-main>
        <el-descriptions title="IT知识挑战赛" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">副会长</el-tag>
              <el-tag size="small">刘香语</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[7].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日 HH时mm分"
              value-format="YYYY-MM-DD HH:mm:ss" disabled style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">计算机学院102室</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">思想成长</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            为响应行业人才需求，弥补学生学习短板，激发全院学生对 IT 知识的探索热情，营造以赛促学、以赛促练的校园氛围，湖北大学计算机学院特策划举办本次 IT 知识挑战赛，为学生搭建检验知识、交流提升的平台。
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[7].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[7].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>
    <el-container>
      <!-- <el-header>第二届'创艺杯'网页设计大赛</el-header> -->
      <el-main>
        <el-descriptions title="第二届'创艺杯'网页设计大赛" direction="vertical" :column="4" :size="size" border>
          <el-descriptions-item label="活动负责人">
            <div class="leader-content">
              <el-tag size="small">副会长</el-tag>
              <el-tag size="small">左飘</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="活动时间">
            <el-date-picker v-model="activities[8].dateRange" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" disabled
              style="width: 90%" />
          </el-descriptions-item>
          <el-descriptions-item label="活动地点" :span="2">线上+计算机学院102室</el-descriptions-item>
          <el-descriptions-item label="积分类型">
            <el-tag size="small">思想成长</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="活动简介" :span="4">
            本次"创意杯"网页设计大赛旨在提供一个讲理论知识与实践操作紧密结合的平台，让学生能够深入理解和应用网页设计原则。
          </el-descriptions-item>
        </el-descriptions>

        <!-- 活动图片展示 -->
        <div class="activity-images">
          <el-image v-for="(img, index) in activities[8].images" :key="index" :src="img" fit="cover" lazy
            :preview-src-list="activities[8].images" :preview-teleported="true" :initial-index="index"
            class="activity-img">
            <template #error>
              <div class="image-fallback">图片加载失败</div>
            </template>
          </el-image>
        </div>
      </el-main>
    </el-container>

  </div>

  <el-divider />
  <footer class="footer-section">
    <div class="container">
      <p>&copy; 2024-2025 互联网应用协会</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import type { ComponentSize } from 'element-plus'

const size = ref<ComponentSize>('default')

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value as keyof typeof marginMap] || marginMap.default,
  }
})

// 从localStorage获取选中日期
const selectedDate = ref(localStorage.getItem('selectedDate'))

// 清除localStorage中的选中日期
if (selectedDate.value) {
  localStorage.removeItem('selectedDate')
}

const activities = ref([
  {
    title: '网页设计新视界',
    dateRange: ['2025-02-28 12:00:00', '2025-03-02 12:00:00'],
    images: [
      '/img/activtity/001/img1.jpg',
      '/img/activtity/001/img2.jpg',
      '/img/activtity/001/img3.jpg',
      '/img/activtity/001/img4.jpg'
    ]
  },
  {
    title: '404 错误页面设计活动',
    dateRange: ['2025-03-22 12:00:00', '2025-03-25 12:00:00'],
    images: [
      '/img/activtity/002/001.png',
      '/img/activtity/002/002.png',
      '/img/activtity/002/003.png',
      '/img/activtity/002/004.png'
    ]
  },
  {
    title: 'PhotoShop入门教学：开启你的创意之旅',
    dateRange: ['2025-04-25 19:00:00', '2025-04-25 20:30:00'],
    images: [
      '/img/activtity/003/001.png',
      '/img/activtity/003/002.png',
      '/img/activtity/003/003.png',
      '/img/activtity/003/004.png'
    ]
  },
  {
    title: 'PR软件入门教学',
    dateRange: ['2025-04-25 19:00:00', '2025-04-25 21:00:00'],
    images: [
      '/img/activtity/004/001.jpg',
      '/img/activtity/004/002.jpg',
      '/img/activtity/004/003.jpg',
      '/img/activtity/004/004.jpg'
    ]
  },
  {
    title: 'PS软件入门教学',
    dateRange: ['2025-05-23 19:00:00', '2025-05-23 21:00:00'],
    images: [
      '/img/activtity/005/001.jpg',
      '/img/activtity/005/002.jpg',
      '/img/activtity/005/003.jpg',
      '/img/activtity/005/004.jpg'
    ]
  },
  {
    title: 'IT文化节开幕式暨1024程序员节',
    dateRange: ['2025-10-24 12:00:00', '2025-10-24 16:00:00'],
    images: [
      '/img/activtity/006/001.jpg',
      '/img/activtity/006/002.jpg',
      '/img/activtity/006/003.jpg',
      '/img/activtity/006/004.jpg',
      '/img/activtity/006/005.jpg'
    ]
  },
  {
    title: '"指尖绘意，弹幕狂想"网页教学活动',
    dateRange: ['2025-11-22 19:00:00', '2025-11-22 20:30:00'],
    images: [
      '/img/activtity/007/001.jpg',
      '/img/activtity/007/002.jpg',
      '/img/activtity/007/003.jpg',
      '/img/activtity/007/004.jpg'
    ]
  },
  {
    title: 'IT知识挑战赛',
    dateRange: ['2025-11-20 12:00:00', '2025-11-20 13:00:00'],
    images: [
      '/img/activtity/008/001.jpg',
      '/img/activtity/008/002.jpg',
      '/img/activtity/008/003.jpg',
      '/img/activtity/008/004.jpg'
    ]
  },
  {
    title: '第二届"创艺杯"网页设计大赛',
    dateRange: ['2025-11-25 00:00:00', '2025-12-15 23:59:59'],
    images: [
      '/img/activtity/009/001.jpeg'
    ]
  }
])

// 组件挂载后处理
onMounted(() => {
  if (selectedDate.value) {
    // 查找选中日期对应的活动索引
    const activityIndex = activities.value.findIndex(activity => {
      const startDate = new Date(activity.dateRange[0]).toISOString().split('T')[0]
      const endDate = new Date(activity.dateRange[1]).toISOString().split('T')[0]
      return selectedDate.value! >= startDate && selectedDate.value! <= endDate
    })

    if (activityIndex !== -1) {
      // 滚动到对应活动区域
      const activityElement = document.querySelectorAll('.el-container')[activityIndex]
      if (activityElement) {
        activityElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
})
</script>


<style scoped>
/* 负责人内容容器，水平排列 */
.leader-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 确保描述项行不换行 */
.activity-leader-wrapper :deep(.el-descriptions-item__row) {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

/* 活动图片样式 */
.activity-images {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

/* 页脚样式 */
.footer-section {
  margin-top: 40px;
  padding: 20px 0;
  text-align: center;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.activity-img {
  width: 220px;
  height: 160px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.activity-img:hover {
  transform: scale(1.02);
}

.image-fallback {
  width: 220px;
  height: 160px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  border-radius: 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .activity-images {
    justify-content: center;
  }

  .activity-img {
    width: calc(50% - 8px);
    height: auto;
    aspect-ratio: 4/3;
  }
}
</style>
