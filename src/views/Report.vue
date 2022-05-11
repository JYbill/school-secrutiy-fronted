<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';
import { NTimeline, NTimelineItem, NTag, NButton, NModal, NUpload, NText, NP, NUploadDragger, NIcon, NInput } from 'naive-ui'
import Header from '@/components/Header.vue';
import { SchoolReportHttp } from '@/utils/school/school-report.http';
import { UserReportHttp } from '@/utils/school/userReport.http';
import { useMessage, ImageGroupProps, UploadFileInfo } from 'naive-ui';

import { Image, LayerGroup } from '@vicons/fa'

// init
const message = useMessage();

// type
type Report = {
  id: number,
  process: string
  schoolArticleId: number
  userId: number
}

// data
const imageOption: ImageGroupProps = reactive({});
const showUserReportModal = ref(false)
const reportData: Ref<Report[]> = ref([]);
const userReportData: Ref<any> = ref({
  host: '',
  list: []
});
const fileList = ref<UploadFileInfo[]>([]);
const userReportContent = ref<string>('');

// http 初始化请求
const httpFindAllData = () => {

  // 学校文章举报
  SchoolReportHttp.getAll().then(res => {
    // reportData.value = res.data;
    const userJSON = localStorage.getItem('user');
    const { id: userId }: { id: string } = userJSON ? JSON.parse(userJSON) : {};
    const targetArr: any = [];
    res.data.forEach((item: any) => {
      // console.log(item.userId, userId);
      item.userId == userId ? targetArr.push(item) : '';
    })
    reportData.value = targetArr;
  })

  // 用户举报
  UserReportHttp.getAll().then(res => {
    const userJSON = localStorage.getItem('user');
    let user = userJSON ? JSON.parse(userJSON) : '';

    // 当前用户的举报数据
    const targetArr: any = [];
    res.data.list.forEach((item: any) => {
      if (item.userId == user.id) {
        targetArr.push(item);
      }
      userReportData.value.list = targetArr;
    });
    // 主机:端口
    userReportData.value.host = res.data.host;
  })
};
httpFindAllData();

// modal弹出层回调函数
// 取消举报
const onNegativeClick = () => {
  showUserReportModal.value = false;
}

// 提交举报
const onPositiveClick = () => {
  const userJSON = localStorage.getItem('user');
  if (!userJSON) {
    return message.error('当前状态无法举报');
  }

  // 上传文件
  showUserReportModal.value = false;
  const userReportForm = new FormData();
  const file: any = fileList.value[0].file;
  userReportForm.append('img', file);
  userReportForm.append('content', userReportContent.value)
  userReportForm.append('userId', JSON.parse(userJSON).id);
  UserReportHttp.addUserReport(userReportForm).then((item) => {
    message.success('举报成功');
    httpFindAllData();
  })
}

// 上传文件回调函数
const onUploadFile = (list: UploadFileInfo[]) => {
  list.forEach((item) => {
    item.status = "finished";
  })
  fileList.value = list;
}
</script>


<template>
  <div class="report">
    <!-- 头部 -->
    <Header></Header>

    <n-timeline>
      <n-timeline-item content="我的举报文章信息" />
      <n-timeline-item v-for="item in reportData">
        <div>
          举报文章ID:
          <n-tag type="info" style="margin-bottom: 10px;">{{ item.id }}</n-tag>
          <br />举报状态:
          <n-tag v-if="item.process === '2'" type="success">举报成功</n-tag>
          <n-tag v-else type="error">举报处理中</n-tag>
        </div>
      </n-timeline-item>
    </n-timeline>

    <!-- 新增举报 -->
    <n-button style="margin: 50px 0 0 0" type="error" @click="showUserReportModal = true">举报</n-button>

    <!-- 用户举报 -->
    <n-timeline>
      <n-timeline-item content="我的举报信息" />
      <n-timeline-item v-for="item in userReportData.list">
        <div>
          举报内容:
          <p style="margin-bottom: 10px;">{{ item.content ? item.content : '无' }}</p>
          <br />举报图片:
          <br />
          <img style="width: 40%;" v-if="item.image" :src="userReportData.host + item.image" />
          <p v-else>无</p>
          <br />举报状态
          <n-tag v-if="item.status == '2'" type="info">{{ '处理完毕' }}</n-tag>
          <n-tag v-if="item.status == '1'" type="warning">{{ '处理中...' }}</n-tag>
        </div>
      </n-timeline-item>
    </n-timeline>

    <!-- 新增举报模态框 -->
    <n-modal
      v-model:show="showUserReportModal"
      preset="dialog"
      title="举报"
      positive-text="确认"
      negative-text="取消"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    >
      <!-- 举报图片 -->
      <span>举报图片</span>
      <br />
      <n-upload
        :default-upload="false"
        :default-file-list="fileList"
        list-type="image-card"
        name="img"
        :max="1"
        :image-group-props="imageOption"
        :show-preview-button="true"
        :on-update:file-list="onUploadFile"
        :file-list-style="{
          transform: 'translateX(-50%)',
          position: 'relative',
          left: '85%'
        }"
      >
        <n-upload-dragger>
          <div>
            <n-icon size="48" :depth="3">
              <Image />
            </n-icon>
          </div>
        </n-upload-dragger>
      </n-upload>

      <!-- 举报内容 -->
      <span>举报内容</span>
      <br />
      <n-input
        type="textarea"
        placeholder="举报内容"
        passively-activated
        v-model:value="userReportContent"
      />
    </n-modal>
  </div>
</template>


<style scoped lang="scss">
.n-timeline {
  margin-top: 15px !important;
  text-align: left;
  width: 300px;
  margin: 0 auto;
  background-color: #f6f6f6;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 0px 40px #b9b9b9;
}
</style>