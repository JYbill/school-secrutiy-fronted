<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';
import { NTable, NButton, NModal, NInput } from 'naive-ui';
import { NDialogProvider, useDialog } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { UserReportHttp } from '@/utils/school/userReport.http';

// init
const dialog = useDialog();
const message = useMessage();

// type
type UserReport = {
  id: string,
  userId: string,
  content: string,
  image: string,
  status: number | string
}

// data
const tableData: Ref<UserReport[]> = ref([]);
const tbHeader = reactive(['id', '用户ID', '举报内容', '举报图片', '举报图片', 'operation🎶']);
const userReports: Ref<{ host: string, list: UserReport[] }> = ref({
  host: '',
  list: []
});
const itemReport: Ref<UserReport> = ref({
  id: '',
  userId: '',
  content: '',
  image: '',
  status: -1
})

// 初始化请求
function httpFindAllData() {
  UserReportHttp.getAll().then((res) => {
    userReports.value = res.data;
  });
}
httpFindAllData();

// 处理用户举报
const handleUserReport = (reportId: string) => {
  dialog.warning({
    title: '警告',
    content: '你确定？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      UserReportHttp.updateUserReportStatus(reportId)
        .then(res => {
          message.success('处理完毕')
          httpFindAllData();
        })
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}

const deleteUserReport = (id: string) => {
  dialog.warning({
    title: '警告',
    content: '你确定？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      UserReportHttp.deleteUserReport(id).then(res => {
        message.success('处理完毕')
        httpFindAllData();
      })
    },
    onNegativeClick: () => {
      message.error('取消')
    }
  })
}
</script>


<template>
  <div class="user-report">
    <n-table class="n-table" bordered striped :single-column="true">
      <thead class="header">
        <tr>
          <th class="item" v-for="item in tbHeader">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userReports.list">
          <td>{{ item.id }}</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.content }}</td>
          <td>
            <img style="width: 50%;" :src="userReports.host + item.image" />
          </td>
          <td>{{ item.status == '1' ? '处理中' : '处理完毕' }}</td>
          <td>
            <div class="operation">
              <n-dialog-provider>
                <n-button
                  :disabled="item.status == '2'"
                  strong
                  secondary
                  round
                  type="error"
                  @click="handleUserReport(item.id)"
                >处理完毕</n-button>
                <n-button
                  strong
                  secondary
                  round
                  type="warning"
                  @click="deleteUserReport(item.id)"
                >删除处理</n-button>
              </n-dialog-provider>
            </div>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>


<style scoped lang="scss">
.user-report {
  width: 80%;
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