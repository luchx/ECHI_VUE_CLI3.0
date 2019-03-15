import Vue from 'vue';
import Router, {
  RouteConfig,
} from 'vue-router';
import filterRouter from '@/router/filterRouter';

Vue.use(Router);

const routes: RouteConfig[] = [
  ...filterRouter,
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

const router: Router = new Router({
  linkActiveClass: 'active',
  base: '/',
  routes,
});

router.afterEach((route) => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe');
      hackIframe.style.display = 'none';
      document.body.appendChild(hackIframe);
      setTimeout((_: any) => {
        document.body.removeChild(hackIframe);
      }, 300);
    }
  }
});

export default router;