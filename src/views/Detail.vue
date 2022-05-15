<script setup lang="ts">
import { onMounted, reactive, Ref, ref } from 'vue';
import { NButton, NGrid, NGi, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { LocationQuery, useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue';
import { SchoolHttp } from '@/utils/school/school.http';
import { SecurityHttp } from '@/utils/school/security.http';
import { EpidemicHttp } from '@/utils/school/epidemic.http';
import router from '@/router';
import { NMessageProvider, useMessage } from 'naive-ui';
import { SchoolReportHttp } from '@/utils/school/school-report.http';

// init
const message = useMessage();

let navList = reactive([])
let detail: any = ref({})
const menuOptions = reactive([
  {
    label: '导航',
    key: 'nav',
    children: [
      {
        type: 'group',
        label: '校园安全相关',
        key: 'news',
        children: []
      },
      {
        type: 'group',
        label: '疫情相关',
        key: 'epidemic',
        children: []
      },
      {
        type: 'group',
        label: '反诈骗相关',
        key: 'security',
        children: []
      },
    ]
  }
])
const defaultSelect: Ref<string> = ref('');

// 路由
const route = useRoute();
const { id, type }: LocationQuery = route.query;


// 请求
let schoolData: Ref<any[]> = ref([])
SchoolHttp.getAll().then((res) => {
  // console.log(res.data);
  schoolData.value = res.data;
  res.data.forEach((item: any) => {
    menuOptions[0].children[0].children.push({
      //@ts-ignore
      label: item.title,
      //@ts-ignore
      key: item.id + ';school'
    })
  });
})

let epidemicData: Ref<any[]> = ref([])
EpidemicHttp.getAll().then((res) => {
  // console.log(res.data);
  epidemicData.value = res.data;
  res.data.forEach((item: any) => {
    menuOptions[0].children[1].children.push({
      //@ts-ignore
      label: item.title,
      //@ts-ignore
      key: item.id + ';news'
    })
  });
})


let securityData: Ref<any[]> = ref([]);
SecurityHttp.getAll().then((res) => {
  // console.log(res.data);
  securityData.value = res.data;
  res.data.forEach((item: any) => {
    menuOptions[0].children[2].children.push({
      //@ts-ignore
      label: item.title,
      //@ts-ignore
      key: item.id + ';security'
    })
  });
})

// 组件回调
const clickMenuFunc = (key: string, item: MenuOption) => {
  defaultSelect.value = key;
  const info = key.split(';');
  switch (info[1]) {
    case 'news':
      epidemicData.value.forEach(item => {
        console.log(info[0]);
        router.push(`/detail?type=${info[1]}&id=${info[0]}`)
        if (item.id === info[0]) {
          detail.value = {
            id: item.id,
            title: item.content,
            images: item.images
          }
        }
      })
      break;
    case 'school':
      schoolData.value.forEach(item => {
        router.push(`/detail?type=${info[1]}&id=${info[0]}`)
        if (item.id === parseInt(info[0])) {
          detail.value = {
            id: item.id,
            title: item.content,
            images: item.images
          }
        }
      })
      break;
    case 'security':
      securityData.value.forEach(item => {
        router.push(`/detail?type=${info[1]}&id=${info[0]}`)
        if (item.id === parseInt(info[0])) {
          detail.value = {
            id: item.id,
            title: item.content,
            images: item.images
          }
        }
      })
      break;
  }
}

// 初始化校验
setTimeout(() => {
  // 查询详情
  if (id && type) {
    switch (type) {
      case 'news':
        epidemicData.value.forEach((item: any) => {
          // console.log(item, id);       
          //@ts-ignore
          item.id == parseInt(id) ?
            (detail.value = {
              id: item.id,
              title: item.title,
              content: item.content,
              images: item.images
            }, defaultSelect.value = item.id + ';news') : '';
        });
        break;
      case 'school':
        schoolData.value.forEach((item: any) => {
          // console.log(item, id);
          //@ts-ignore
          item.id == parseInt(id) ?
            (detail.value = {
              id: item.id,
              title: item.title,
              content: item.content,
              images: item.images
            }, defaultSelect.value = item.id + ';school') : '';
        });
        break;
      case 'security':
        securityData.value.forEach((item: any) => {
          // console.log(item, id);
          //@ts-ignore
          item.id == parseInt(id) ?
            (detail.value = {
              id: item.id,
              title: item.title,
              content: item.content,
              images: item.images
            }, defaultSelect.value = item.id + ';security') : '';
        });
        break;
    }
  } else {
    detail.value = {
      title: '请选择内容',
      content: `暂无内容`,
      images: ''
    }
  }
}, 300);


// click 举报按钮
const reportArticle = () => {
  const userJSON = localStorage.getItem('user');
  if (!userJSON || userJSON.length < 1) {
    message.error('请先登录')
  }

  const user = userJSON ? JSON.parse(userJSON) : '';
  SchoolReportHttp.insertSchoolReport(detail.value.id, user.id).then(res => {
    message.success('举报成功')
  })
}
</script>



<template>
  <Header />

  <n-grid x-gap="12" :cols="10">
    <n-gi class="nav" :span="2">
      <n-menu :options="menuOptions" :default-expand-all="true" :on-update:value="clickMenuFunc"
        :value="defaultSelect" />
    </n-gi>
    <n-gi :span="8">
      <div class="detail">
        <div class="header">
          <img :src="detail.images" style="width: 100%;" />
        </div>

        <div class="container">
          <div class="title">{{ detail.title }}</div>
          <div class="content">{{ detail.content }}</div>
        </div>

        <div class="report">
          <n-message-provider>
            <n-button strong secondary round type="error" @click="reportArticle">举报</n-button>
          </n-message-provider>
        </div>
      </div>
    </n-gi>
  </n-grid>
</template>


<style scoped lang="scss">
.nav {
  border: 1px solid black;
  text-align: left;
  border-radius: 0 10px 10px 0;
  background-color: #ffffff;

  .n-menu {
    .n-menu-item-group-title {
      color: blue;
    }
  }
}

.detail {
  position: relative;
  margin: 0 auto 0;
  width: 80%;
  max-width: 1000px;
  min-height: 800px;
  background-color: #fffefe;
  border-radius: 10px;
  box-sizing: content-box;
  box-shadow: 1px 1px 3px #d1cdcd;
  background-color: rgb(189, 189, 189);

  // 顶部图片
  .header {
    width: 80%;
    margin: 0 auto 30px;
    padding-top: 15px;

    .img {
      width: 100%;
    }
  }

  // 文章信息
  .container {
    padding: 0 10px;

    .title {
      font-size: 14px;
      margin-bottom: 25px;
    }

    .content {
      text-indent: 2em;
      text-align: left;
      line-height: 25px;
    }
  }

  // 举报
  .report {
    position: absolute;
    bottom: -6%;
  }
}
</style>