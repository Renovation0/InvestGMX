 /* eslint-disable */
 import {
   checkVersion
 } from '@/api/index'
 /**
  *获取服务器上的app版本号
  */
 function get_versions(vm) {
   checkVersion().then(res => {
     console.log(res.data.app_v)
     if (res.code === 1) {
       try {
         getProperty(vm, res)
       } catch (error) {
         document.addEventListener('plusready', function () {
           getProperty(vm, res)
         })
       }
     }
   })
 }

 /**
  *1.获取本机安装的app的版本号
  *2.把app的和服务器的版本号进行比较，自动检测是否需要更新
  */
 function getProperty(vm, res) {
   plus.runtime.getProperty(
     plus.runtime.appid,
     function (inf) {
       const wgtVer = inf.version.toString()
       if (wgtVer !== res.data.app_v) {
         vm.$toast("New version detected, downloading");
         downloader_install(vm, res.data.app_wgt_url)
       }
     }
   )
 }

 /**
  * 下载最新版本文件自动安装
  * 安装完成后会提示用户重启
  * WGTURL:从服务器传过来的下载地址
  */
 function downloader_install(vm, WGTURL) {
   let dtask = null
   dtask = plus.downloader.createDownload(WGTURL)
   dtask.addEventListener(
     'statechanged',
     function (download, status) {
       if (download.state === 4 && status === 200) {
         plus.runtime.install(
           download.filename, {
             force: true
           },
           function () {
             vm.$dialog.alert({
               title: 'update completed',
               message: 'Please restart to experience the latest version',
               confirmButtonText: 'reboot'
             }).then(() => {
               plus.runtime.restart()
             })
           },
           function () {
             vm.$dialog.alert({
               title: 'update failed',
               message: 'Please check whether the mobile phone permission is enabled',
             })
           }
         )
       }
     },
     false
   )
   dtask.start()
 }
 export default {
   get_versions
 }
