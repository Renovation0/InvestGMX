<template>
    <div class="vip-container">
        <div class="viplevel">VIP LEVEl</div>
        <div class="vipnotice-title">{{ $t('team.vipup') }}</div>
        <div class="vipnotice">
            <van-row class="title">
                <van-col span="8" offset="4">- VIP等级</van-col>
                <van-col span="8">成长值-</van-col>
            </van-row>
            <van-row class="title-row" v-for="(vip, v) in VIPList" :key="v + 'vip'">
                <van-col span="8" offset="4" class="title-col">
                    <div class="title-col-img"><span>{{ vip.id }}</span></div>
                </van-col>
                <van-col class="title-col" span="8">₹{{ vip.pet_assets }}</van-col>
            </van-row>
        </div>
        <div class="vipsm">
            <div class="wenzi">{{ $t('team.invDescript') }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition1') }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition2', { "number": VIPList[0].pet_assets }) }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition3', { "number": VIPList[1].pet_assets }) }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition4', { "number": VIPList[2].pet_assets }) }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition5', { "number": VIPList[3].pet_assets }) }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition6', { "number": VIPList[4].pet_assets }) }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition7', { "number": VIPList[5].pet_assets }) }}</div>
            <div class="wenzi2">{{ $t('team.vipcondition8', { "number": VIPList[6].pet_assets }) }}</div>
        </div>
    </div>
</template>
<script>
import { Image as VanImage } from 'vant'
import { getInviteInfo } from '@/api/mine'
export default {
    components: {
        [VanImage.name]: VanImage,

    },
    name: 'VIP',
    filters: {

    },
    data() {
        return {
            active: 0,
            show: false,
            VIPList: [],
        }
    },
    computed: {

    },
    created() {
        this.getInviteInfo()
    },
    mounted() {

    },
    beforeDestroy() {
    },
    methods: {
        getInviteInfo() {
            let vm = this
            getInviteInfo().then(res => {
                if (res.code == 1) {
                    vm.shareUrl = res.data.img_url
                    vm.VIPList = res.data.level_list
                } else {
                    vm.$toast(res.msg)
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
.vip-container {

    background: url("~assets/mine/vip-bg.png") no-repeat;
    background-size: 100% 100%;
    min-height: 100%;
    padding-bottom: 200px;

    .viplevel {
        margin-top: 15px;
        font-size: 100px;
        font-family: Adobe Heiti Std, Adobe Heiti Std-R;
        font-weight: bold;
        text-align: center;
        color: #FFF;
    }

    .vipnotice-title {
        width: 60%;
        margin: 10px auto;
        text-align: center;
        background-color: #FFF;
        border-radius: 50px;
        line-height: 50px;
        color: #fc8c70;
        font-size: 30px;
    }

    .vipnotice {
        width: 90%;
        margin: auto;
        // height: auto;
        // background-color: #FFF;
        // opacity: 0.6;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 30px;
        padding-bottom: 20px;

        .title {
            text-align: center;
            padding-top: 20px;
            font-size: 34px;
            font-family: Adobe Heiti Std, Adobe Heiti Std-R;
            font-weight: normal;
            color: #ffffff;
            line-height: 34px;
        }

        .title-row {
            text-align: center;
            width: 90%;
            margin: 20px auto;
            height: 147px;
            background: #ffffff;
            border-radius: 40px;
            box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.10);
            line-height: 80px;
        }

        .title-col-img {
            margin-left: 40px;
            background: url("~assets/mine/vip.png") no-repeat;
            background-size: 100% 100%;
            width: 67px;
            height: 68px;

            span {

                font-size: 19px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: bold;
                margin-left: 37px;
                color: #ffffff;
                line-height: 90px;
            }
        }

        .title-col {
            margin-top: 30px;
            font-size: 33px;
            color: #222222;
        }
    }

    .vipsm {
        width: 90%;
        margin: 30px auto;
        padding: 30px 0px;
        // height: 393px;
        background: rgba(253, 208, 197, 0.60);
        border-radius: 40px;

        .wenzi {
            text-align: center;
            font-size: 34px;
            padding: 10px;
            color: #ffffff;
            line-height: 34px;
        }

        .wenzi2 {
            width: 90%;
            margin: auto;
            font-size: 26px;
            font-family: Adobe Heiti Std, Adobe Heiti Std-R;
            font-weight: bold;

            color: #ffffff;
            letter-spacing: 4.68px;
        }
    }

}
</style>