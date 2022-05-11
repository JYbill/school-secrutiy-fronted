<script setup lang="ts">
import { reactive, Ref, ref, toRefs } from 'vue';
import { NTable, NButton, NModal, NInput } from 'naive-ui';
import { NDialogProvider, useDialog } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { InfoHttp } from '@/utils/school/info.http';

// init
const dialog = useDialog();
const message = useMessage();

// type
type Info = {
  id: string;
  information: string;
  title: string;
}

// data
const tableData: Ref<Info[]> = ref([]);
const tbHeader = reactive(['id', 'title', 'content', 'operation🎶']);
const showInsertModal = ref(false);
const showUpdateModal = ref(false);
const itemData: Ref<Info> = ref({
  id: '',
  title: '',
  information: ''
});

// http 初始化请求
function httpFindAllData() {
  InfoHttp.getAll().then((res: any) => {
    tableData.value = res.data;
    // console.log(res.data);
  });
}
httpFindAllData();

// 打开模态框
const addOperation = () => showInsertModal.value = true;

// 修改通知
const updateItemFunc = (item: Info) => {
  showUpdateModal.value = true;
  itemData.value = {
    id: item.id,
    title: item.title,
    information: item.information
  }
}

// 删除通知
const deleteItemFunc = (id: string) => {
  dialog.warning({
    title: '警告',
    content: '你确定？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      InfoHttp.delete(id).then((res: any) => {
        message.success('删除成功')
        httpFindAllData();
      })
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}

// 确定插入通知
const submitCallback = () => {
  InfoHttp.insert(itemData.value).then((res: any) => {
    message.success('新增成功')
    httpFindAllData();
  })
}

// 取消更新通知modal
const cancelUpdateCallBack = () => {
  itemData.value = {
    id: '',
    title: '',
    information: ''
  }
}

// 确定更新通知modal
const submitUpdateCallback = () => {
  InfoHttp.update(itemData.value).then((res: any) => {
    message.info('更新成功');
    httpFindAllData();
  })
  itemData.value = {
    id: '',
    title: '',
    information: ''
  }
}
</script>


<template>
  <div class="info">
    <n-button @click="addOperation" strong type="info">添加</n-button>
    <n-table class="n-table" bordered striped :single-column="true">
      <thead class="header">
        <tr>
          <th class="item" v-for="item in tbHeader">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.information }}</td>
          <td>
            <div class="operation">
              <n-button strong secondary round type="success" @click="updateItemFunc(item)">修改</n-button>
              <n-dialog-provider>
                <n-button strong secondary round type="error" @click="deleteItemFunc(item.id)">删除</n-button>
              </n-dialog-provider>
            </div>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>

  <!-- 新增modal -->
  <n-modal
    v-model:show="showInsertModal"
    preset="dialog"
    :title="$route.path.split('/')[2]"
    content="你确认?"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitCallback"
  >
    标题
    <n-input v-model:value="itemData.title" type="text" size="large" placeholder="标题" />内容
    <n-input v-model:value="itemData.information" type="text" size="large" placeholder="内容" />
  </n-modal>

  <!-- 修改modal -->
  <n-modal
    v-model:show="showUpdateModal"
    preset="dialog"
    :title="$route.path.split('/')[2]"
    content="你确认?"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitUpdateCallback"
    @negative-click="cancelUpdateCallBack"
  >
    ID
    <n-input disabled :value="itemData.id.toString()" type="text" size="large" placeholder="标题" />标题
    <n-input v-model:value="itemData.title" type="text" size="large" placeholder="标题" />内容
    <n-input v-model:value="itemData.information" type="text" size="large" placeholder="内容" />
  </n-modal>
</template>


<style scoped lang="scss">
td {
  word-break: break-all;
}
.info {
  width: 90%;
  margin: 0 auto;

  .n-button {
    margin-bottom: 10px;
  }
  .operation {
    .n-button {
      margin-right: 10px;
    }
  }
}
</style>