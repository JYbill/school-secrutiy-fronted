<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { NButton, NAvatar, NDropdown } from 'naive-ui'
import { xiaoQinVarUtils } from '@/utils/encapsulation.util';
import router from '@/router';

defineProps({
  showAvatar: {
    type: Boolean,
    default: true
  }
})



const avatarOpt = reactive([
  {
    label: '退出登录',
    key: "exit"
  },
  {
    label: '举报记录',
    key: 'report'
  }
])
const isLogin = ref(true);
const token = localStorage.getItem('token');
const tokenLength = localStorage.getItem('token')?.length;
tokenLength == undefined || tokenLength <= 0 ? isLogin.value = false : '';

let showAdmin = ref(true)
let checkAdmin = (): boolean => {
  if (token) {
    const user = xiaoQinVarUtils.parseJWT(token);
    localStorage.setItem('user', JSON.stringify(xiaoQinVarUtils.parseJWT(token).user));
    console.log(user);
    return user.user.admin == 1 ? true : false;
  }
  return false;
}

let checkIsLogin = (): any | boolean => {
  const userJSON = localStorage.getItem('user');
  return userJSON ? JSON.parse(userJSON) : false;
}
onMounted(() => {
  console.log(checkAdmin());
  if (checkAdmin()) {
    showAdmin.value = true;
  } else {
    showAdmin.value = false;
  }

  if (!checkIsLogin()) {
    avatarOpt.pop();
  }
})



// 函数
const selectFunc = (key: string | number) => {
  if (key === 'report') {
    router.replace('/report')
  }

  if (key === 'exit') {
    isLogin.value = false;
    showAdmin.value = checkAdmin();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('login')
  }
}

// title 返回首页
const toHome = () => router.push({ name: 'home' })
</script>


<template>
  <div class="top">
    <div class="title" @click="toHome">
      <img src="@/assets/no-login.png" />
      <h1>校园安全平台</h1>
    </div>
    <div class="info">
      <n-dropdown v-if="showAvatar" trigger="hover" :options="avatarOpt" :on-select="selectFunc">
        <n-avatar v-if="isLogin" round :size="48" src="https://deno.land/logo.svg" />
        <n-avatar v-else="isLogin" round :size="48"
          src="https://img2.baidu.com/it/u=2441105273,940716564&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
      </n-dropdown>
      <n-button type="info" @click="$router.replace({ name: 'admin' })" v-if="showAdmin">管理员入口</n-button>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top {
  $right: 10px;
  $height: 50px;

  width: 100%;
  box-sizing: border-box;
  height: $height;
  background-color: #999;
  box-shadow: 2px 2px 10px #666;
  // margin-bottom: $height;

  .title {
    position: absolute;
    top: -15px;
    left: 10px;
    display: flex;
    border: 1px;

    img {
      $w-h: 30px;
      width: $w-h;
      height: $w-h;
      flex-shrink: 0;
      margin-top: 25px;
      margin-right: 10px;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: right;
    height: 100%;

    $right: 20px;

    .n-avatar {
      margin-right: $right;
    }

    .n-button {
      margin-right: $right;
    }
  }
}
</style>