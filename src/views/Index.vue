<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';
import { NCarousel, NButton } from 'naive-ui'
import { Epidemic } from '../utils/epidemic/index';
import Header from '@/components/Header.vue';
import { useRoute, useRouter } from 'vue-router'
import { SchoolHttp } from '@/utils/school/school.http';
import { SecurityHttp } from '@/utils/school/security.http';
import { InfoHttp } from '@/utils/school/info.http';

// init
const route = useRoute();
const router = useRouter();

// type
type Info = {
  id: string;
  information: string;
  title: string;
}

// data
let epidemicInfo: any = reactive({
  info: {
    localConfirm: 0,
    addLocalConfirm: 0,
    nowConfirm: 0,
    addNowConfirm: 0,
    confirm: 0,
    addConfirm: 0,
    noInfect: 0,
    addNoInfect: 0,
    importedCase: 0,
    addImportedCase: 0,
    dead: 0,
    addDead: 0
  }
})

Epidemic.getInformation().then((res: any) => {
  const dayList = res.data.chinaDayList;
  const yesterday = dayList[dayList.length - 2];
  const now = dayList[dayList.length - 1];
  epidemicInfo.info = now;
  epidemicInfo.info.addLocalConfirm = now.localConfirm - yesterday.localConfirm;
  epidemicInfo.info.addNowConfirm = now.nowConfirm - yesterday.nowConfirm;
  epidemicInfo.info.addConfirm = now.confirm - yesterday.confirm;
  epidemicInfo.info.addNoInfect = now.noInfect - yesterday.noInfect;
  epidemicInfo.info.addImportedCase = now.importedCase - yesterday.importedCase;
  epidemicInfo.info.addDead = now.dead - yesterday.dead;
  // console.log(now.nowConfirm, yesterday.nowConfirm);
});

// 校园安全信息
const school = reactive([
  {
    title: '加強校園安全通知單'
  },
  {
    title: '加強校園安全通知單'
  }
])

// 管理员通知
const notify: Ref<Info[]> = ref([])

// http 初始化请求
function httpFindAllData() {
  InfoHttp.getAll().then((res: any) => {
    notify.value = res.data;
    // console.log(res.data);
  });
}
httpFindAllData();

// 请求
let schoolData: Ref<any[]> = ref([])
SchoolHttp.getAll().then((res) => {
  // console.log(res.data);
  schoolData.value = res.data;
})

let securityData: Ref<any[]> = ref([]);
SecurityHttp.getAll().then((res) => {
  // console.log(res.data);
  securityData.value = res.data;
})



// 方法
const toDetail = (type: string) => {
  switch (type) {
    case 'news':
      router.push('/detail?type=news&id=1');
      break;
    case 'security':
      router.push('/detail?type=security&id=1');
      break;
    case 'school':
      router.push('/detail?type=school&id=1');
      break;
  }
}
</script>


<template>
  <div class="index">
    <Header />

    <div class="header">
      <n-carousel autoplay show-arrow dot-type="line">
        <img class="carousel-img"
          src="https://img2.baidu.com/it/u=3882703997,21461129&fm=253&fmt=auto&app=138&f=JPEG?w=886&h=500" />
        <img class="carousel-img"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0160e45c987d2fa801208f8b40f0c0.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648805195&t=61fe7ae2a3fc076e3e0e9a3370ad08f0" />
        <img class="carousel-img"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F01.minipic.eastday.com%2F20170818%2F20170818165552_af7ce87c8a468e499d0ebd0336b423ad_10.jpeg&refer=http%3A%2F%2F01.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648805195&t=292b0e075f65ace0938e8da195464fcd" />
        <img class="carousel-img"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fjjkfq.gyjye.cn%2F__local%2F2%2F01%2F43%2FDDB79E09A95F28C1A2CA295338A_564EA88A_28EDE8.jpg&refer=http%3A%2F%2Fjjkfq.gyjye.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648805195&t=5e07d79d645c7713fbf5fd633665d6fd" />
      </n-carousel>
    </div>

    <div class="epidemic">
      <div class="row">
        <div>
          <span class="increment">新增{{ epidemicInfo.info.addLocalConfirm }}</span>
          <h1>{{ epidemicInfo.info.localConfirm }}</h1>
          <span>本土确诊</span>
        </div>
        <div>
          <span class="increment">新增{{ epidemicInfo.info.addNowConfirm }}</span>
          <h1>{{ epidemicInfo.info.nowConfirm }}</h1>
          <span>现有确诊</span>
        </div>
        <div>
          <span class="increment">新增{{ epidemicInfo.info.addConfirm }}</span>
          <h1>{{ epidemicInfo.info.confirm }}</h1>
          <span>累计确证</span>
        </div>
      </div>
      <div class="row">
        <div>
          <span class="increment">新增{{ epidemicInfo.info.addNoInfect }}</span>
          <h1>{{ epidemicInfo.info.noInfect }}</h1>
          <span>无症状感染者</span>
        </div>
        <div>
          <span class="increment">新增{{ epidemicInfo.info.addImportedCase }}</span>
          <h1>{{ epidemicInfo.info.importedCase }}</h1>
          <span>境外输入</span>
        </div>
        <div>
          <span class="increment">新增{{ epidemicInfo.info.addDead }}</span>
          <h1>{{ epidemicInfo.info.dead }}</h1>
          <span>累计死亡</span>
        </div>
      </div>
    </div>

    <span class="epidemic-news" @click="toDetail('news')">查看更多新闻</span>

    <div class="container">
      <div class="information" v-for="(item, index) in 2">
        <div class="title">
          {{ index === 0 ? '反诈骗信息' : '' }}
          {{ index === 1 ? '校园安全信息' : '' }}
        </div>
        <div class="content" v-if="index === 0" v-for="item in schoolData"
          @click="router.push(`/detail?type=security&id=${item.id}`)">{{ item.title }}</div>
        <div class="content" v-if="index === 1" v-for="item in securityData"
          @click="router.push(`/detail?type=school&id=${item.id}`)">{{ item.title }}</div>
        <span>...</span>
        <div class="container-footer">
          <n-button v-if="index === 0" type="warning" @click="toDetail('security')">查看更多</n-button>
          <n-button v-if="index === 1" type="warning" @click="toDetail('school')">查看更多</n-button>
        </div>
      </div>
    </div>

    <div class="notification">
      <div class="item" v-for="item in notify">
        <div class="header">❗管理员发布的通知: {{ item.title }}</div>
        <div class="content">{{ item.information }}</div>
      </div>
    </div>

    <div class="footer">校园安全平台.com © 2022</div>
  </div>
</template>


<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b9b9b9;

  .header {
    // background-color: rgba($color: #f2f6ff, $alpha: 1);
    width: 100%;
    padding-bottom: 50px;

    .n-carousel {
      $radius: 26px;

      width: 80%;
      margin: 0 auto 0;
      border-radius: $radius;

      .carousel-img {
        border-radius: $radius;
        text-align: center;
        width: 100%;
        height: 500px;
        object-fit: cover;
        margin-top: 50px;
      }
    }
  }

  // 疫情
  .epidemic {
    margin-top: 30px;
    background-color: #ffffff;
    width: 70%;
    height: 360px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .row {
      width: 100%;
      height: 47%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      div {
        width: 32%;
        height: 100%;
        font-size: 22px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .increment {
          font-size: 15px;
          color: #b61e1b;
          margin-top: 10px;
        }

        h1 {
          font-size: 25px;
          margin: 0;
        }
      }

      div:nth-of-type(1) {
        h1 {
          color: #a83bc9 !important;
        }

        background-color: #fdf7ff;
      }

      div:nth-of-type(2) {
        h1 {
          color: #dc1611 !important;
        }

        background-color: #fef4f4;
      }

      div:nth-of-type(3) {
        h1 {
          color: #b61e1b !important;
        }

        background-color: #fefaf7;
      }
    }
  }

  // 疫情新闻
  .epidemic-news {
    height: 30px;
    background-color: #f1f3f4;
    width: 70%;
    border-radius: 5px;
    padding-top: 7px;
    margin-top: 15px;
    color: #888888;
    font-size: 18px;
    cursor: pointer;
  }

  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-bottom: 40px;
    margin-top: 20px;

    .information {
      position: relative;
      background-color: #f1f3f4;
      width: 320px;
      height: 300px;
      margin-right: 50px;
      border-radius: 15px;
      box-shadow: 1px 1px 5px #c0bebe;

      .title {
        font-size: 18px;
        color: #666;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      .content {
        font-size: 15px;
        margin-bottom: 8px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
          color: #b61e1b;
        }
      }

      .container-footer {
        position: absolute;
        left: 50%;
        bottom: 15px;
        transform: translateX(-50%);
      }
    }
  }

  .notification {
    width: 80%;
    // background-color: #888888;
    border-radius: 10px;
    margin-bottom: 20px;

    .item {
      padding: 0 30px;
      height: 80%;
      background-color: rgba(249, 249, 249, 1);
      padding-bottom: 23px;

      .header {
        height: 20%;
        width: 100%;
        font-size: 25px;
        text-align: left;
        padding-left: 30px;
        line-height: 100px;
        padding-bottom: 0;
        border-bottom: 1px solid #dedddd;
        box-sizing: border-box;
      }

      .content {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        line-height: 30px;
        font-size: 19px;
        margin-top: 30px;
        margin-bottom: 50px;
        text-indent: 2em;
        text-align: left;
      }
    }
  }

  .footer {
    width: 100%;
    height: 100px;
    background-color: #f9f9f9;
    border-radius: 10px 10px 0 0;
    line-height: 100px;
  }
}
</style>