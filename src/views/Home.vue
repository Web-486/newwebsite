<template>
  <div class="main-content-wrapper">
    <!-- 主要内容 -->
    <div class="block text-center">
      <!--<span class="demonstration">
        风采展示
      </span>-->
      <el-carousel height="400px" type="card">
        <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <img :src="image" style="width: 100%; height: 100%; object-fit: cover;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <h1>社团简介</h1>
      <p>
        互联网应用协会正式成立于2004年3月21日，挂靠于计算机学院（原计算机与信息工程学院），由2002级软件工程专业的学生联合创办，以互联网应用协会首次开展科普计算机硬件的讲座为其成立的标志。互联网应用协会自成立之日起，即将自己定位为全校性的计算机与互联网知识传播团体，以“丰富湖北大学学生的计算机和互联网知识”为其基本的前进方向，以“科技创新，引领未来”为宗旨，成为互联网爱好者相互交流与展现自我的舞台，大家在这里可以自由交流，共同成长。
      </p>


      <h1>社团组织建设</h1>
      <div class="content-section">
        <h2>指导教师</h2>
        <p>孙斌老师</p>
      </div>

      <div class="content-section">
        <h2>社团职能组织结构</h2>
        <p>互联网应用协会由本部和阳逻分部两部分组成，组织结构都为：</p>
        <ul>
          <li>1名会长主管大局（如：确定活动可行性、确定社团活动方向、与院老师及社团指导中心的同学对接）；</li>
          <li>2位副会长主管细节（如：活动确定以后开始后的社团干事分工，对社团内部的日常管理）；</li>
          <li>宣传部负责宣传（如：负责活动宣传文案的编写及发布，对官q的日常运营，在活动预热阶段对同学们的疑问进行解答等）；</li>
          <li>技术部负责保障活动能够顺利进行（如负责在活动开展前对活动内容进行学习，方便在活动进行中对抱有疑问的参加者进行答疑）；</li>
          <li>活动部负责确定活动的具体细节（如：在活动的方向确定后起草策划案、活动结束后对活动总结进行填写）。</li>
        </ul>
      </div>

      <div class="content-section">
        <h2>社团干部选拔培训制度</h2>
        <p>
          社团干部每年都会更替，能者上位。在大一学年结束和大二学年间我们会进行本部干事更改；已经是社团干部的同学将根据个人意愿和考核决定是否继续担任社团干部，非社团干部的同学也可以进行报名表的填写，通过面试决定是否能担任社团干部。
        </p>
        <p>在每一年的阳逻校区的百团大战后一个月内会进行阳逻的社团干事选举；由新加入社团的同学通过自行报名、社团初步筛选、面试考核三步骤最终决定阳逻分部干事的人员名单。</p>
        <p>为广泛吸纳校内互联网领域人才，阳逻分部现已试行人才选拔机制：个人自荐或活动表现突出者均可联系会长沟通，经初步评估后吸纳为临时干事，并观察后续表现。目前该机制已成功吸纳1名新干事。</p>
      </div>

      <div class="content-section">
        <h2>社团档案管理制度</h2>
        <p>互联网应用协会的社团会员名单将在每次社团招新后留存，由社团的会长进行保管；每次活动的策划案及审核表在社团指导中心审核后会有电子档由会长进行留存，由所有会员及其干事共同监督。</p>
      </div>

      <h1>社团财务管理</h1>
      <div class="content-section">
        <h2>（一）社团财务管理制度</h2>
        <p>
          互联网应用协会社团的财务由会长与社团挂靠单位学院老师直接对接，活动所需要购置的物品社团所有干事发表意见，后投票进行选举，最终选出需要购买的物品，由学院老师统一支付，并开具发票及活动物品照片、活动购置物品说明，提交给挂靠单位学院进行统一报销。
        </p>
      </div>

      <div class="content-section">
        <h2>（二）社团收支记录</h2>
        <p>社团举办活动暂无收支记录；</p>
      </div>

      <div class="content-section">
        <h2>（三）社团财务信息公开情况</h2>
        <p>无</p>
      </div>

      <h1>2024工作总结</h1>
      <div class="content-section">
        <h2>（一）本年度主要工作总结</h2>
        <p>在过去的一年里，互联网应用协会（后称社团）全体成员团结一心，积极开展各项工作以促进社团发展。以下是我们的年度工作总结：</p>
        <p>活动方面：在2024-2025学年中，社团完成了本部、阳逻的社团招新活动，并完成两次社团干事的换届及其社团职务交接。在2025年里，阳逻进行了三次活动，都得到了良好的回应。</p>
        <p>宣传方面：社团在本学年在每次活动的前3天便开始预热，通过官q的宣传及其社团指导中心的帮推宣传，更多的同学都能够加入到我们的活动中，让我们感到十分荣幸。</p>
        <p>在新的一年里，我们将继续努力，为创办出更多、更积极、更有意义的活动而奋斗！</p>
      </div>

      <div class="content-section">
        <h2>（二）工作中存在的不足</h2>
        <p>在过去的一年里，我们也看到了很多的不足：</p>
        <ul>
          <li>1、对活动的报名时间、活动时间、活动人数掌握不足。以常规活动为例，因为申请名额过少、报名时间和活动时间太拖沓，削减了参加活动的同学的热情。</li>
          <li>2、活动举办过少，在过去的时间社团举办的活动确实很少。一方面是思维的盲区，没能及时扩张思维来创办更多活动，更多的是会长的拖沓，把准备的活动一味推迟举办，造成活动开展的太少。</li>
        </ul>
      </div>

      <div class="content-section">
        <h2>（三）未来工作的发展方向</h2>
        <p>将来社团将会从以下几个方面开始整改发展：</p>
        <ul>
          <li>1、增加活动的类型与数量，未来社团将继续贯彻例行活动的开展，并且在学习活动的基础上举行相关比赛，设计更多优秀的奖品来吸引更多有才华的同学。</li>
          <li>2、对活动的报名时间、活动时间、活动人数考虑更多，把我们的活动一步一步完善起来，给参与者更良好的体验。</li>
          <li>3、加强社团内的联系，社团本就为一体，我们要加强社团干事与会员之间的联系，加强本部社团与分部社团之间的联系。</li>
        </ul>
      </div>


    </div>




    <el-row :gutter="20">
      <!-- 日历列 -->
      <el-col :xs="24" :md="12">
        <el-calendar v-model="value">
          <template #date-cell="{ data }">
            <div @click="handleDateClick(data)" class="calendar-cell">
              <span :class="{ 'has-activity': hasActivityOnDate(data.day) }">
                {{ data.day.split('-').slice(2).join('-') }}
              </span>
            </div>
          </template>
        </el-calendar>
      </el-col>

      <!-- 时间轴列 -->
      <el-col :xs="24" :md="12">
        <el-timeline class="timeline-container">
          <el-timeline-item timestamp="2025-02-28" placement="top">
            <el-card>
              <h4>网页设计新视界</h4>
              <p>2025年2月28日 - 2025年3月2日</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-03-22" placement="top">
            <el-card>
              <h4>404 错误页面设计活动</h4>
              <p>2025年3月22日 - 2025年3月25日</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-04-25" placement="top">
            <el-card>
              <h4>PhotoShop入门教学：开启你的创意之旅</h4>
              <p>2025年4月25日 19:00-20:30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-04-25" placement="top">
            <el-card>
              <h4>PR软件入门教学</h4>
              <p>2025年4月25日 19:00-21:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-05-23" placement="top">
            <el-card>
              <h4>PS软件入门教学</h4>
              <p>2025年5月23日 19:00-21:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-10-24" placement="top">
            <el-card>
              <h4>IT文化节开幕式暨1024程序员节</h4>
              <p>2025年10月24日 12:00-16:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-11-22" placement="top">
            <el-card>
              <h4>"指尖绘意，弹幕狂想"网页教学活动</h4>
              <p>2025年11月22日 19:00-20:30</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-11-20" placement="top">
            <el-card>
              <h4>IT知识挑战赛</h4>
              <p>2025年11月20日 12:00-13:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2025-11-25" placement="top">
            <el-card>
              <h4>第二届"创艺杯"网页设计大赛</h4>
              <p>2025年11月25日 - 2025年12月15日</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>




    <el-backtop :bottom="100">
      <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
        ↑
      </div>
    </el-backtop>
    <el-divider />
    <footer class="footer-section">
      <div class="container">
        <p>&copy; 2024-2025 互联网应用协会</p>
      </div>
    </footer>
  </div>
</template>




<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { ref } from 'vue'
import type { ObjectFitProperty } from 'csstype'
import { useRouter } from 'vue-router'

const router = useRouter()
const value = ref(new Date())

// 活动数据
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
    title: '指尖绘意，弹幕狂想网页教学活动',
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

const state = reactive({
  carouselImages: [
    '/img/home/img1.png',
    '/img/home/img2.png',
    '/img/home/img3.png',
    '/img/home/img4.png'
  ],
  circleUrl:
    '/../../img/img1.jpg',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
  fits: [
    'fill',
    'contain',
    'cover',
    'none',
    'scale-down',
  ] as ObjectFitProperty[],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const { circleUrl, squareUrl, sizeList, fits, url, carouselImages } = toRefs(state)

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 检查日期是否有活动
const hasActivityOnDate = (date: string) => {
  return activities.value.some(activity => {
    const startDate = new Date(activity.dateRange[0]).toISOString().split('T')[0]
    const endDate = new Date(activity.dateRange[1]).toISOString().split('T')[0]
    return date >= startDate && date <= endDate
  })
}

// 处理日期点击事件
const handleDateClick = (data: any) => {
  const clickedDate = data.day
  const activitiesOnDate = activities.value.filter(activity => {
    const startDate = new Date(activity.dateRange[0]).toISOString().split('T')[0]
    const endDate = new Date(activity.dateRange[1]).toISOString().split('T')[0]
    return clickedDate >= startDate && clickedDate <= endDate
  })

  if (activitiesOnDate.length > 0) {
    // 跳转到活动页面
    router.push('/activity')
    // 可以通过localStorage或其他方式传递活动信息
    localStorage.setItem('selectedDate', clickedDate)
  }
}

</script>

<style scoped>
/* 日历样式 */
.calendar-cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.calendar-cell:hover {
  background-color: #f5f7fa;
}

.has-activity {
  color: #409eff;
  font-weight: bold;
  position: relative;
}

/* 时间轴样式优化 */
.timeline-container {
  max-height: 600px;
  /* 设置与日历相同的最大高度 */
  overflow-y: auto;
  /* 添加垂直滚动 */
  padding-right: 10px;
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

/* Webkit浏览器滚动条样式 */
.timeline-container::-webkit-scrollbar {
  width: 6px;
}

.timeline-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.timeline-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.timeline-container .el-timeline-item {
  margin-bottom: 15px;
}

.timeline-container .el-card {
  padding: 10px;
  margin-top: 5px;
}

.timeline-container h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
}

.timeline-container p {
  margin: 0;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .timeline-container {
    max-height: none;
    overflow-y: visible;
  }

  .timeline-container .el-timeline-item {
    margin-bottom: 20px;
  }
}

.has-activity::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background-color: #409eff;
  border-radius: 50%;
}

.demo-basic {
  text-align: center;
}

.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.demo-basic .block {
  flex: 1;
}

.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

@media screen and (max-width: 992px) {
  .demo-basic .el-col:not(:last-child) {
    border-right: none;
  }
}

.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}

.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.main-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 文字排版样式 */
h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 30px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 20px 0 15px 0;
}

.content-section {
  margin-bottom: 30px;
  padding: 15px 20px;
  background-color: rgba(240, 242, 245, 0.5);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-section p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--el-text-color-regular);
  margin-bottom: 15px;
  text-align: justify;
}

.content-section ul {
  padding-left: 25px;
  margin-bottom: 15px;
}

.content-section li {
  font-size: 15px;
  line-height: 1.6;
  color: var(--el-text-color-regular);
  margin-bottom: 8px;
  text-align: justify;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .main-content-wrapper {
    padding: 10px;
  }

  h1 {
    font-size: 24px;
    margin: 20px 0 15px 0;
  }

  h2 {
    font-size: 18px;
    margin: 15px 0 10px 0;
  }

  .content-section {
    padding: 10px 15px;
    margin-bottom: 20px;
  }

  .content-section p {
    font-size: 14px;
    line-height: 1.6;
  }

  .content-section li {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>