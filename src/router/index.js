import { createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import YouthDream from '../views/YouthDream.vue'
import Activity from '../views/Activity.vue'
const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            { path: '/', component: Home },
            { path: '/about', component: About },
            { path: '/youth-dream', component: YouthDream },
            {path: '/activity', component: Activity}
        ]
    }
)
export default router