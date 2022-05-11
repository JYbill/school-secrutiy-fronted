<script setup lang="ts">
import { reactive, Ref, ref, toRefs } from 'vue';
import { NTable, NButton, NModal, NInput } from 'naive-ui';
import { NDialogProvider, useDialog } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { SecurityHttp } from '@/utils/school/security.http';

// init
const dialog = useDialog();
const message = useMessage();

// type
type Epidemic = {
  id: number,
  title: string,
  content: string,
  images: string
}

// data
const tableData: Ref<Epidemic[]> = ref([]);
const tbHeader = reactive(['id', 'title', 'content', 'images', 'operation🎶']);
const showInsertModal = ref(false);
const showUpdateModal = ref(false);
const itemData: Ref<Epidemic> = ref({
  id: 0,
  title: '',
  content: '',
  images: ''
});

// http 初始化请求
function httpFindAllData() {
  SecurityHttp.getAll().then((res) => {
    tableData.value = res.data;
    // console.log(res.data);
  });
}
httpFindAllData();

// 打开模态框
const addOperation = () => showInsertModal.value = true;

// 修改文章
const updateItemFunc = (item: Epidemic) => {
  showUpdateModal.value = true;
  itemData.value = {
    id: item.id,
    title: item.title,
    content: item.content,
    images: item.images
  }
}

// 删除文章
const deleteItemFunc = (id: number) => {
  dialog.warning({
    title: '警告',
    content: '你确定？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      SecurityHttp.deleteSecurity(id).then(res => {
        message.success('删除成功')
        httpFindAllData();
      })
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}

// 确定插入文章
const submitCallback = () => {
  SecurityHttp.insertSecurity(itemData.value).then(res => {
    message.success('新增成功')
    httpFindAllData();
  })
}

// 取消更新文章modal
const cancelUpdateCallBack = () => {
  itemData.value = {
    id: 0,
    title: '',
    content: '',
    images: ''
  }
}

// 确定更新文章modal
const submitUpdateCallback = () => {
  SecurityHttp.updateSecurity(itemData.value).then(res => {
    message.info('更新成功');
    httpFindAllData();
  })
  itemData.value = {
    id: 0,
    title: '',
    content: '',
    images: ''
  }
}
</script>


<template>
  <div class="epidemic">
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
          <td>{{ item.content }}</td>
          <td class="td">{{ item.images }}</td>
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
    <n-input v-model:value="itemData.content" type="text" size="large" placeholder="内容" />图片
    <n-input v-model:value="itemData.images" type="text" size="large" placeholder="图片" />
  </n-modal>

  <!-- 修改modal -->
  <n-modal
    v-model:show="showUpdateModal"
    preset="dialog"
    :title="$route.path.split('/')[2]"
    content="你确认?"
    positive-text="确认"
    negative-text="算了"
    @positive-click="submitUpdateCallback"
    @negative-click="cancelUpdateCallBack"
  >
    ID
    <n-input disabled :value="itemData.id.toString()" type="text" size="large" placeholder="标题" />标题
    <n-input v-model:value="itemData.title" type="text" size="large" placeholder="标题" />内容
    <n-input v-model:value="itemData.content" type="text" size="large" placeholder="内容" />图片
    <n-input v-model:value="itemData.images" type="text" size="large" placeholder="图片" />
  </n-modal>
</template>


<style scoped lang="scss">
td {
  word-break: break-all;
}
.epidemic {
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