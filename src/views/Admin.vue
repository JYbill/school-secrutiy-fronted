<script setup lang="ts">
import Header from '@/components/Header.vue';
import { NMenu, NGrid, NGi, MenuOption, NConfigProvider, NButton, NTag } from 'naive-ui'
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NDialogProvider } from 'naive-ui';


// 初始化
const route = useRoute();
const router = useRouter();

// 侧边栏数据
const asideOption: any[] = reactive([
  {
    label: '用户',
    key: 1,
    children: []
  },
  {
    label: '学校',
    key: 2,
    children: []
  },
  {
    label: '反诈骗',
    key: 3,
    children: []
  },
  {
    label: '疫情',
    key: 4,
    children: []
  },
  {
    label: '通知',
    key: 5,
    children: []
  },
])
const asideDetailOption = [
  {
    type: 'group',
    label: '用户信息',
    key: 11,
    children: [
      {
        label: '用户信息',
        key: 'user'
      },
      {
        label: '用户举报信息',
        key: 'user-report'
      }
    ]
  },
  {
    type: 'group',
    label: '学校信息',
    key: 21,
    children: [
      {
        label: '学校文章信息',
        key: 'school'
      },
      {
        label: '学校文章举报信息',
        key: 'school-report'
      }
    ]
  },
  {
    type: 'group',
    label: '反诈骗信息',
    key: 31,
    children: [
      {
        label: '反诈骗文章信息',
        key: 'security'
      }
    ],
  },
  {
    type: 'group',
    label: '疫情信息',
    key: 41,
    children: [
      {
        label: '疫情文章信息',
        key: 'epidemic',
      }
    ]
  },
  {
    type: 'group',
    label: '通知',
    key: 51,
    children: [
      {
        label: '通知面板',
        key: 'info',
      }
    ]
  }
]
asideOption.forEach((item, index) => {
  item.children.push(asideDetailOption[index])
});


// 回调函数
const clickMenuOptFunc = (key: string, item: MenuOption) => {
  switch (key) {
    case 'user':
      router.replace({ name: 'user' });
      break;
    case 'security':
      router.replace({ name: 'security' });
      break;
    case 'school':
      router.replace({ name: 'school' });
      break;
    case 'epidemic':
      router.replace({ name: 'epidemic' });
      break;
    case 'school-report':
      console.log(1);
      router.replace({ name: 'school-report' });
      break;
    case 'user-report':
      router.replace({ name: 'user-report' });
      break;
    case 'info':
      router.replace({ name: 'info' });
      break;
  }
}


</script>


<template>
  <!-- 顶部 -->
  <Header />

  <!-- 侧边栏 -->
  <n-grid :cols="24">
    <n-gi :span="5">
      <n-menu
        :options="asideOption"
        :on-update:value="clickMenuOptFunc"
        style="text-align: left;"
        :default-expand-all="true"
      />
    </n-gi>
    <n-gi :span="19">
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-gi>
  </n-grid>
</template>


<style scoped lang="scss">
</style>