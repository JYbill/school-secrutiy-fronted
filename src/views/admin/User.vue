<script setup lang="ts">
import { reactive, ref, toRef, toRefs } from 'vue';
import { NTable, NButton, NModal, NInput, NSelect } from 'naive-ui';
import { UserHttp } from '@/utils/school/user.http';
import { useMessage } from 'naive-ui';
import { NDialogProvider, useDialog } from 'naive-ui';

// 初始数据
const message = useMessage();
const dialog = useDialog();

type User = {
  id: number;
  admin: number;
  password: string;
  username: string;
}

// data
const tbHeader = reactive(['id', 'username', 'password', 'role', 'operation🎶']);
let tableDat = ref([
  { id: 1, admin: 0, password: '', username: '' }
])
const showModal = ref(false);
const userData = ref({
  username: '',
  password: '',
  role: '',
  id: ''
});
const selectOpt = [{
  label: '用户',
  value: '0'
},
{
  label: '管理员',
  value: '1'
}]

// 请求
function httpFindAllUsers() {
  UserHttp.findAll().then((res) => {
    tableDat.value = res.data;
    // console.log(res.data);
  });
}
httpFindAllUsers();


// 添加/修改用户函数
const submitCallback = () => {

  // 更新请求
  if (userData.value.id && userData.value.role) {
    UserHttp.updateUser(userData.value).then((res) => {
      httpFindAllUsers();
      message.success('修改成功...')
    })
  } else {
    UserHttp.insertUser(userData.value.username, userData.value.username).then((res) => {
      httpFindAllUsers();
      message.success('添加成功');
    })
  }
  userData.value = {
    username: '',
    password: '',
    role: '',
    id: ''
  };
}

const cancelCallback = () => {
  userData.value = {
    username: '',
    password: '',
    role: '',
    id: ''
  };
}

// 添加按钮
const addUser = () => showModal.value = true;

// 修改按钮
const updateUserFunc = (item: User) => {
  userData.value = {
    id: item.id.toString(),
    username: item.username,
    password: item.password,
    role: item.admin.toString()
  };
  showModal.value = true;
}

// 删除按钮
const deleteUserFunc = (item: number) => {
  dialog.warning({
    title: '警告',
    content: '你确定？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      console.log(item);

      UserHttp.deleteUser(item.toString()).then(res => {
        message.success('删除成功');
        httpFindAllUsers();
      })
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}
</script>


<template>
  <div class="user">
    <n-button @click="addUser" strong type="info">添加</n-button>
    <n-table class="n-table">
      <thead class="header">
        <tr>
          <th class="item" v-for="item in tbHeader">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableDat">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.admin === 1 ? '管理员' : '用户' }}</td>
          <td>
            <div class="operation">
              <n-button strong secondary round type="success" @click="updateUserFunc(item)">修改</n-button>
              <n-dialog-provider>
                <n-button strong secondary round type="error" @click="deleteUserFunc(item.id)">删除</n-button>
              </n-dialog-provider>
            </div>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="$route.path.split('/')[2]"
    content="你确认?"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  >
    <div v-if="userData.id.trim() !== ''">
      ID
      <n-input disabled v-model:value="userData.id" type="text" size="large" placeholder="ID" />
    </div>用户名
    <n-input v-model:value="userData.username" type="text" size="large" placeholder="用户名" />密码
    <n-input v-model:value="userData.password" type="text" size="large" placeholder="密码" />
    <div v-if="userData.role.trim() !== ''">
      角色
      <n-select v-model:value="userData.role" :options="selectOpt" />
    </div>
  </n-modal>
</template>


<style scoped lang="scss">
.user {
  width: 80%;
  text-align: center;
  margin: 0 auto;

  .n-button {
    margin-bottom: 20px;
  }

  tbody {
    .operation {
      .n-button {
        margin-right: 10px;
      }
    }
  }
}
</style>