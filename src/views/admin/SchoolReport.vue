<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';
import { NTable, NButton, NModal, NInput } from 'naive-ui';
import { NDialogProvider, useDialog } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { SchoolReportHttp } from '@/utils/school/school-report.http';

// init
const dialog = useDialog();
const message = useMessage();

// type
type SchoolReport = {
  id: string,
  userId: string,
  schoolArticleId: string,
  process: string
}

// data
const tableData: Ref<SchoolReport[]> = ref([]);
const tbHeader = reactive(['id', '用户ID', '学校文章ID', '状态', 'operation🎶']);
const itemData: Ref<SchoolReport> = ref({
  id: '',
  userId: '',
  schoolArticleId: '',
  process: ''
});

// 初始化请求
function httpFindAllData() {
  SchoolReportHttp.getAll().then((res) => {
    tableData.value = res.data;
    // console.log(res.data);
  });
}
httpFindAllData();

// 处理文章
const handleSchoolReport = (userId: string, schoolArticleId: string) => {
  dialog.warning({
    title: '警告',
    content: '你确定？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      SchoolReportHttp.updateSchoolReport(userId, schoolArticleId)
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
</script>


<template>
  <div class="school-report">
    <n-table class="n-table" bordered striped :single-column="true">
      <thead class="header">
        <tr>
          <th class="item" v-for="item in tbHeader">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData">
          <td>{{ item.id }}</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.schoolArticleId }}</td>
          <td>{{ item.process }}</td>
          <td>
            <div class="operation">
              <n-dialog-provider>
                <n-button
                  :disabled="item.process == '2'"
                  strong
                  secondary
                  round
                  type="error"
                  @click="handleSchoolReport(item.userId, item.schoolArticleId)"
                >处理完毕</n-button>
              </n-dialog-provider>
            </div>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>


<style scoped lang="scss">
.school-report {
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