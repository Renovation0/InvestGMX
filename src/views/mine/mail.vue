<template>
    <div class="mail-container">
        <div class="back"></div>
        <div class="mail-list">
            <div class="mail-body" v-for="(item, index) in list" :key="index + 'mail'"  @click="$router.push({ path: '/mailDetail', query: { i: $AES.encrypt(item.id) } })">
                <div class="body1">
                    <img  v-if="(item.type==0)" class="mail-body-img" src="@/assets/mine/new/mail-system.png" /> 
                    <img  v-if="(item.type==1)" class="mail-body-img" src="@/assets/mine/new/mail-huodong.png" /> 
                    <img  v-if="(item.type==2)" class="mail-body-img" src="@/assets/mine/new/mail-order.png" /> 
                    <span
                        class="wenzi">{{(item.type==0?'system notice':item.type==1?'action notice':'order notice')}}
                    </span>
                </div>
                <!-- <div class="body2">{{item.content}}</div> -->
                <div class="body2" v-html="item.content"> </div>
                <div class="body3">{{item.ctime}}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getmail } from '@/api/mine'
export default {
    name: 'mail',
    data() {
        return {
            list: [],
        };
    },

    mounted() {
        this.getmail()
        
    },

    methods: {
        getmail() {
            let vm = this
            getmail().then(res => {
                vm.list = res.data
            })
        }
    },
};
</script>
<style lang="less" scoped>
.mail-container {
    padding-top: 1rem;
    height: 100%;
    background: url("~assets/home/home-bg.png") no-repeat;
    background-size: 100% 100%;

    .back {
        position: absolute;
        top: 260px;
        height: 100%;
        width: 100%;
        background-color: #FAF9F9;
        border-radius: 50px;
    }

    .mail-list {
        margin-top: 30px;
        position: relative;
        z-index: 2;

        .mail-body {
            width: 90%;
            margin: 20px auto;
            height: auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: -6px 0px 10px 6px rgba(0, 0, 0, 0.02);
            padding-left: 30px;
            padding-top: 20px;
            padding-bottom: 20px;
            line-height: 40px;

            .body1 {
                .mail-body-img {
                    width: 37px;
                    height: 38px;
                    border-radius: 3px;
                    float: left;
                }

                .wenzi {
                    margin-left: 10px;
                    font-size: 28px;
                    color: #071228;
                    line-height: 42px;
                }
            }

            .body2 {

                font-size: 28px;
                color: #000;
                padding: 10px;
            }

            .body3 {
                margin-left: 10px;
                font-size: 20px;
                font-family: SourceHanSansCN, SourceHanSansCN-Regular;
                font-weight: 400;
                text-align: left;
                color: #adafbc;
                line-height: 38px;
            }
        }
    }

}
</style>