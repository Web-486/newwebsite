<template>

    <!-- 团队成员展示 -->
    <div class="team-members">
        <h2>2024级协会干事</h2>
        <div class="members-grid">
            <div v-for="(member, index) in teamData2024" :key="index" class="member-card"
                @click="showMemberCard(member)">
                <el-avatar :size="80" :src="member.img" :alt="member.name" />
                <div class="member-info">
                    <div class="member-name">{{ member.name }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="team-members">
        <h2>2025级协会干事</h2>
        <div class="members-grid">
            <div v-for="(member, index) in teamData2025" :key="index" class="member-card"
                @click="showMemberCard(member)">
                <el-avatar :size="80" :src="member.img" :alt="member.name" />
                <div class="member-info">
                    <div class="member-name">{{ member.name }}</div>
                </div>
            </div>
        </div>
    </div>


    <!-- 人物卡片弹窗 -->
    <div class="modal-overlay" :class="{ active: isModalOpen }" @click="closeModal"></div>
    <div class="member-modal" :class="{ active: isModalOpen }">
        <div class="close-btn" @click="closeModal">&times;</div>
        <div class="member-left">
            <img :src="currentMember.img" :alt="currentMember.name">
            <div class="member-name">{{ currentMember.name }}</div>
        </div>
        <div class="member-right">
            <div class="member-tags">
                <span class="tag" v-for="(tag, index) in currentMember.tags" :key="index">{{ tag }}</span>
            </div>
            <div class="member-desc" v-html="currentMember.desc"></div>
        </div>
    </div>

    <el-divider />
    <footer class="footer-section">
        <div class="container">
            <p>&copy; 2024-2025 互联网应用协会</p>
        </div>
    </footer>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date())

// 响应式变量
const isModalOpen = ref(false)
const currentMember = ref({
    img: '',
    name: '',
    tags: [],
    desc: ''
})

// 成员展示相关变量
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
const sizeList = ['large', 'medium', 'small', 100, 80, 40, 30]

// 2024级协会干事数据
const teamData2024 = [
    {
        img: '../../img/about/2024/李顺安.jpg',
        name: '李顺安',
        tags: ['会长', '前端开发'],
        desc: `2024级计算机科学与技术专业，<br>
              计算机学院学生会学科部部长，<br>
              所运营社团在通识教育学院2024—2025 年度学生社团“五四评优”中获评五星社团荣誉；<br>
              获得第十六届“蓝桥杯”全国软件和信息技术专业人才大赛C/C++程序设计大学B组湖北省一等奖；<br>
              2024 - 2025学年优秀学生奖学金（二等）；<br>
              2024 - 2025学年科研创新奖学金；<br>
              2024 - 2025学年三好学生`
    },
    {
        img: '../../img/about/2024/刘香语.jpg',
        name: '刘香语',
        tags: ['副会长'],
        desc: `2024级制药工程专业，<br>
              学管会管理服务部部长；<br>
              在2024-2025学年度荣获优秀学生干部；<br>
              “华巾杯”大学生数学建模挑战赛三等奖`
    },
    {
        img: '../../img/about/2024/左飘.jpg',
        name: '左飘',
        tags: ['副会长', '追剧', '羽毛球'],
        desc: `2024级金融学专业，<br>
              团支书，省一项校数十项院数十，<br>
              一等奖学金三好学生优秀班干部等十余项荣誉称号，<br>
              志愿时长135`
    },
    {
        img: '../../img/about/2024/陆宇轩.jpg',
        name: '陆宇轩',
        tags: ['副会长'],
        desc: `2024级高分子材料与工程专业，<br>
              担任校社导宣传部部长`
    },
    {
        img: '../../img/about/2024/余彬泓.jpg',
        name: '余彬泓',
        tags: ['活动部', '阅读', '音乐', '游戏'],
        desc: `2024级经济学专业，<br>
              让风告诉你`
    },
    {
        img: '../../img/about/2024/蒋华鑫.jpg',
        name: '蒋华鑫',
        tags: ['活动部', '武术', '极乐迪斯科'],
        desc: `2024级信息安全专业，<br>
              劲口内！`
    },
    {
        img: '../../img/about/2024/吴彬璐.jpg',
        name: '吴彬璐',
        tags: ['活动部', '麻将', '羽毛球', '台球'],
        desc: `2024级药学专业，<br>
              药学2401班宣传委员`
    },
    {
        img: '../../img/about/2024/刘汝杰.jpg',
        name: '刘汝杰',
        tags: ['活动部', '追剧'],
        desc: `2024级数字经济专业，<br>
              团宣副部长`
    },
    {
        img: '../../img/about/2024/何志豪.jpg',
        name: '何志豪',
        tags: ['宣传部', '阅读', '哲学'],
        desc: `2024级汉语言文学专业，<br>
              约到同学我就狂，让我给钱我装糖，<br>
              好马不吃回头草，好片别删不好找，<br>
              好话我只说一遍，好片我得看三遍，<br>
              男人再穷不能卖，价格到位那叫爱`
    },
    {
        img: '../../img/about/2024/向泠萱.jpg',
        name: '向泠萱',
        tags: ['宣传部'],
        desc: `2024级生物科学师范2401班，<br>
              宣传委员`
    },
    {
        img: '../../img/about/2024/王思甜.jpg',
        name: '王思甜',
        tags: ['技术部', '乒乓球', '羽毛球', '阅读'],
        desc: `2024级信息安全专业，<br>
              万事胜意`
    },
    {
        img: '../../img/about/2024/杨明月.jpg',
        name: '杨明月',
        tags: ['技术部', '游戏'],
        desc: `2024级软件工程专业，<br>
              什么？！你也玩无限暖暖`
    }
]

// 2025级协会干事数据
const teamData2025 = [
    {
        img: '../../img/about/2025/潘莘怡.jpg',
        name: '潘莘怡',
        tags: ['副会长', '唱歌'],
        desc: `2025级计算机类专业，<br>
              世界本没有太大意义，真理和热爱除外。`
    },
    {
        img: '../../img/about/2025/张雯琪.jpg',
        name: '张雯琪',
        tags: ['副会长', '羽毛球', '调香', '写小说'],
        desc: `2025级物理学专业，<br>
              希望社团内部人员多搞活动比如桌游组团吃饭出去玩啥的！！！！！！`
    },
    {
        img: '../../img/about/2025/李壮.jpg',
        name: '李壮',
        tags: ['活动部', '羽毛球', '台球', '麻将'],
        desc: `2025级药学专业，<br>
              无🈚️`
    },
    {
        img: '../../img/about/2025/张阳瑞杰.jpg',
        name: '张阳瑞杰',
        tags: ['活动部', '化学', '物理', '数学', '互联网'],
        desc: `2025级新能源材料与器件专业，<br>
              生者生者，路化成冰`
    },
    {
        img: '../../img/about/2025/王欣怡.jpg',
        name: '王欣怡',
        tags: ['活动部', '乒乓球', '办公软件'],
        desc: `2025级国际经济与贸易专业，<br>
              星火青年先锋队队长之一`
    },
    {
        img: '../../img/about/2025/洪梓鑫.jpg',
        name: '洪梓鑫',
        tags: ['宣传部', '日语', '打游戏', '看动漫'],
        desc: `2025级机器人工程专业，<br>
              请不要后悔与我的相遇`
    },
    {
        img: '../../img/about/2025/邓宇桓.jpg',
        name: '邓宇桓',
        tags: ['宣传部'],
        desc: `2025级环境工程（中外合作办学）专业，<br>
              无`
    },
    {
        img: '../../img/about/2025/王宇涵.jpg',
        name: '王宇涵',
        tags: ['宣传部', '绘画', '摄影', '剪辑', '舞蹈'],
        desc: `2025级机器人工程专业，<br>
              宣传使者上线，给你做最美微信推文😋`
    },
    {
        img: '../../img/about/2025/张善喜.jpg',
        name: '张善喜',
        tags: ['宣传部', '绘画', '唱歌', '手工'],
        desc: `2025级计算机类专业，<br>
              世界灿烂盛大，欢迎回家`
    },
    {
        img: '../../img/about/2025/王孜禄.jpg',
        name: '王孜禄',
        tags: ['技术部'],
        desc: `2025级计算机类专业，<br>
              Dynamic Creative Center (Studio) 动力创意中心(工作室) 创始人`
    },
    {
        img: '../../img/about/2025/王翔.png',
        name: '王翔',
        tags: ['技术部', '王者荣耀', '影视'],
        desc: `2025级材料科学与工程专业，<br>
              所有命运的馈赠，都在暗中标注好了价格。`
    },
    {
        img: '../../img/about/2025/曾佳.jpg',
        name: '曾佳',
        tags: ['技术部'],
        desc: `2025级物理学（师范类）专业，<br>
              江南红豆树，一叶一相思`
    },
    {
        img: '../../img/about/2025/黄毓情.jpg',
        name: '黄毓情',
        tags: ['技术部', '前端开发'],
        desc: `2025级电子信息类J专业，<br>
              “死亡是终将到来的节日”`
    }
]

// 显示人物卡片
function showMemberCard(member: any) {
    if (!member) return

    currentMember.value = member
    isModalOpen.value = true
}

// 关闭模态框
function closeModal() {
    isModalOpen.value = false
}
</script>

<style scoped>
/* 人物卡片弹窗 */
.member-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background: #fff9c4;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: none;
    padding: 20px;
    flex-direction: row;
    gap: 20px;
}

.member-modal.active {
    display: flex;
}

/* 背景遮罩 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
}

.modal-overlay.active {
    display: block;
}

/* 关闭按钮 */
.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
    color: #333;
}

.close-btn:hover {
    color: #ff0000;
}

/* 弹窗左侧 */
.member-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.member-left img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
}

.member-name {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

/* 弹窗右侧 */
.member-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.member-tags {
    display: flex;
    gap: 10px;
}

.tag {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
}

.member-desc {
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    overflow-y: auto;
    max-height: 200px;
}

/* 成员卡片样式 */
.member-card {
    cursor: pointer;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px;
}

.member-card:hover {
    transform: scale(1.05);
}

.member-info {
    text-align: center;
}

/* 团队成员展示样式 */
.team-members {
    margin: 50px 0;
    text-align: center;
}

.team-members h2 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #333;
}

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* 页脚样式 */
.footer-section {
    margin-top: 40px;
    padding: 20px 0;
    text-align: center;
    color: var(--el-text-color-secondary);
    font-size: 14px;
}
</style>