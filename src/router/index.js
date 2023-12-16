import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index'
import cookies from '@/utils/cookies'

const Login = () => import('@/views/login/login')
const Logincj = () => import('@/views/login/logincj')
const Register = () => import('@/views/login/register')
const Setpwd = () => import('@/views/login/setpwd')
const UserAgr = () => import('@/views/login/user_agreement')

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalReplace.call(this, location, onResolve, onReject) }
  return originalReplace.call(this, location).catch(err => err)
}

// 切换页面渐入效果
VueRouter.prototype.goBack = function(num = -1) {
  this.isBack = true
  this.go(num)
}
// 切换页面渐入效果
VueRouter.prototype.goPage = function(path) {
  this.isBack = false
  this.push(path)
}

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/logincj',
      name: 'logincj',
      component: Logincj
    },{
      path: '/userAgr',
      name: 'userAgr',
      component: UserAgr,
      meta: {
          headshow: true,
          left: true,
          title: 'head.userAgr'
      }
    },
    /** 首页 */
    {
      path: '/',
      component: Layout,
      redirect: '/hIndex',
      children: [{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          headshow: true,
          headOpacity: true,
          title: '',
          left: true
        }
      },{
        path: 'hIndex',
        name: 'hIndex',
        component: () => import('@/views/home'),
        meta: {
          tabShow: true,
          headshow:false,
          bgColor:0,
          left:false,
          title: 'head.name'
        }
      },{
        path: '/mail',
        name: 'mail',
        component: () => import('@/views/mine/mail'),
        meta: {
          titlecolor:'custome-black',
          headshow:true,
          bgColor:28,
          left:true,
          title: 'head.mail'
        }
      },{
        path: '/setpwd',
        name: 'setpwd',
        component: Setpwd,
        meta: {
          headshow: true,
          title: 'login.forgetPwd',
          headOpacity: true,
          left: true
        }
      },{
        path: '/downloadApp',
        name: 'downloadApp',
        component: () => import('@/views/login/download'),
        meta: {
          titlecolor:'custome-white',
          headshow: true,
          left: true,
          title: 'login.downLoad'
        }
      },{
        path: '/hNoticeDetail',
        name: 'hNoticeDetail',
        component: () => import('@/views/home/notice_detail'),
        meta: {
          titlecolor:'custome-white',
          bgColor: 26,
          headshow:true,
          left:true,
          title: 'head.noticeDetail'
        }
      },{
        path: '/mailDetail',
        name: 'mailDetail',
        component: () => import('@/views/home/mail_detail'),
        meta: {
          bgColor: 29,
          headshow:true,
          left:true,
          title: 'head.mailDetail'
        }
      },{
        path: '/hCompanyIntroduction',
        name: 'hCompanyIntroduction',
        component: () => import('@/views/home/company_introduction'),
        meta: {
          bgColor: 28,
          headshow:true,
          left:true,
          title: 'head.companyIn'
        }
      }]
    },{
      path: '/mine',
      name: 'mine',
      component: Layout,
      redirect: '/mine/mIndex',
      children: [{
        path: 'mIndex',
        name: 'mIndex',
        component: () => import('@/views/mine'),
        meta: {
          bgColor: 30,
          headshow:false,
          tabShow:true,
          title: 'mine.title'
        }
      },{
        path: '/mMyTeam',
        name: 'mMyTeam',
        component: () => import('@/views/mine/my_team'),
        meta: {
          left:true,
          headshow:true,
          tabShow:true,
          titlecolor:'custome-white',
          title: ''
        }
      },{
        path: '/team',
        name: 'team',
        component: () => import('@/views/mine/team'),
        meta: {
          titlecolor:'custome-white',
          left:true,
          bgColor: 0,
          headshow:true,
          tabShow:true,
          title: 'foot.team'
        }
      },{
        path: '/mVip',
        name: 'mVip',
        component: () => import('@/views/mine/vip'),
        meta: {
          titlecolor:'custome-white',
          left:true,
          headshow:true,
          tabShow:true,
          title: ''
        }
      },{
        path: '/mInviteFriends',
        name: 'mInviteFriends',
        component: () => import('@/views/mine/invite_friends'),
        meta: {
          headshow:true,
          headOpacity:true,
          left:true,
          title: 'head.invFriends'
        }
      },{
        path: '/mTeamMembers',
        name: 'mTeamMembers',
        component: () => import('@/views/mine/team_members'),
        meta: {
          headshow:true,
          headOpacity:true,
          left:true,
          title: 'head.teamMb'
        }
      },{
        path: '/mRecharge',
        name: 'mRecharge',
        component: () => import('@/views/mine/recharge'),
        meta: {
          headshow:true,
          headOpacity:true,
          left:true,
          title: 'head.recharge'
        }
      },{
        path: '/mWithdraw',
        name: 'mWithdraw',
        component: () => import('@/views/mine/withdraw'),
        meta: {
          // titlecolor:'custome-block',
          headshow:true,
          headOpacity:true,
          left:true,
          title: 'head.withdraw'
        }
      },{
        path: '/share',
        name: 'share',
        component: () => import('@/views/mine/share'),
        meta: {
          titlecolor:'custome-block',
          headshow:true,
          // headOpacity:true,
          bgColor: 0,
          left:true,
          title: 'head.share'
        }
      },{
        path: '/mEarningsRecord',
        name: 'mEarningsRecord',
        component: () => import('@/views/mine/earnings_record'),
        meta: {
          titlecolor:'custome-block',
          bgColor: 0,
          headshow:true,
          left:true,
          title: 'head.earRecord'
        }
      },{
        path: '/mOrder',
        name: 'mOrder',
        component: () => import('@/views/mine/order'),
        meta: {
          titlecolor:'custome-block',
          headshow:true,
          bgColor:0,
          left:true,
          title: 'head.order'
        }
      },{
        path: '/mFundingDetails',
        name: 'mFundingDetails',
        component: () => import('@/views/mine/funding_details'),
        meta: {
          titlecolor:'custome-white',
          headshow:true,
          bgColor:0,
          left:true,
          title: 'head.funDetail'
        }
      },{
        path: '/mBankCard',
        name: 'mBankCard',
        component: () => import('@/views/mine/bank_card'),
        meta: {
          titlecolor:'custome-block',
          headshow:true,
          left:true,
          title: 'head.bankCardM'
          
        }
      },{
        path: '/mAddBank',
        name: 'mAddBank',
        component: () => import('@/views/mine/add_bank'),
        meta: {
          titlecolor:'custome-block',
          headshow:true,
          left:true,
          title: 'head.addbankCard'
        }
      },{
        path: '/mLanguage',
        name: 'mLanguage',
        component: () => import('@/views/mine/language'),
        meta: {
          titlecolor:'custome-block',
          headshow:true,
          bgColor:0,
          left:true,
          title: 'head.language'
        }
      }]
    }
  ],
  //配置滚动行为，跳转到新的路由界面滚动条的位置
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

const whitList = ['login','logincj', 'register', 'setpwd', 'userAgr','downloadApp']
// 路由前置处理
router.beforeEach((to, from, next) => {
  if (whitList.indexOf(to.name) > -1) {
    if (to.name === 'login') {
      cookies.remove('loginUser')
      cookies.remove('tokenSP')
      cookies.remove('userInfoSP')
    }
    next()
  } else {
    if (!cookies.get('tokenSP')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

export default router
