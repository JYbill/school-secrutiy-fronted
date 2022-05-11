<script setup lang="ts">
import Header from '@/components/Header.vue';
import { NInput, NButton } from 'naive-ui'
import { reactive, ref } from 'vue';
import { useMessage } from 'naive-ui'
import { UserHttp } from '@/utils/school/user.http';
import { Result } from '@/interface/axios.interface';
import { useRoute, useRouter } from 'vue-router'


// 初始化数据
const route = useRoute();
const router = useRouter();
const username = ref('');
const password = ref('');

// ui组件
const message = useMessage()

const clickLogin = () => {
  if (!(username.value.trim().length >= 1 && password.value.trim().length >= 1)) {
    return message.warning('请输入账号密码...')
  }

  UserHttp.login(username.value, password.value).then((res: Result) => {
    if (res.code !== 200) {
      return message.error('账号密码不正确...');
    }

    localStorage.setItem('token', res.data);
    router.replace({ name: 'home' });
  })
}

const clickRegister = () => {
  if (!(username.value.trim().length >= 1 && password.value.trim().length >= 1)) {
    return message.warning('请输入账号密码...')
  }

  UserHttp.register(username.value, password.value).then((res: Result) => {
    res.code !== 200 ? message.error('注册失败...') : message.info('注册成功请登录...');
  })
}

const usernameInput = (value: string) => username.value = value;
const passwordInput = (value: string) => password.value = value;

</script>


<template>
  <Header :showAvatar="false" />

  <div class="login">
    <div class="container">
      <h1>登录</h1>
      <n-input type="text" size="large" placeholder="username" clearable :on-input="usernameInput" />
      <n-input
        type="password"
        size="large"
        placeholder="password"
        clearable
        :on-input="passwordInput"
      />
      <div class="button">
        <n-button type="info" @click="clickLogin">登录</n-button>
        <n-button type="warning" @click="clickRegister">注册</n-button>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.login {
  position: relative;
  width: 50%;
  max-width: 1000px;
  height: 500px;
  margin: 30px auto;
  // background-color: #2e2e2e;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #dcdcdc;
  color: white;
  overflow: hidden;

  // bg
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../assets/login-bg.jpeg");
    z-index: -1;
    filter: blur(3px);
    transform: scale(1.05);
  }

  // 登录界面
  .container {
    width: 50%;
    height: 50%;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    h1 {
      text-align: left;
    }

    .n-input {
      border-radius: 10px;
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;
    }
    .button {
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
      .n-input {
        margin-bottom: 10px;
        height: 50px;
        border-radius: 10px;
      }
    }
  }
}
</style>