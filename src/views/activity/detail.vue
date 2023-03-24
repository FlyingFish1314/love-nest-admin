<template>
  <div class="m-check-card app-container">
    <el-descriptions title=" " :column="1" border class="descriptions">
      <el-descriptions-item label="活动名称">{{ activity.name }} </el-descriptions-item>
      <el-descriptions-item label="发起组织">
        {{ activity.organization }}
      </el-descriptions-item>
      <el-descriptions-item label="发起人">
        {{ activity.creator }}
      </el-descriptions-item>
      <el-descriptions-item label="活动介绍">
        {{ activity.description }}
      </el-descriptions-item>
      <el-descriptions-item label="活动地点">{{ activity.location }} </el-descriptions-item>
      <el-descriptions-item label="开始时间">
        {{ activity.startTime }}
      </el-descriptions-item>
      <el-descriptions-item label="结束时间">
        {{ activity.endTime }}
      </el-descriptions-item>
      <el-descriptions-item label="人数"> {{ activity.capacity }} </el-descriptions-item>
      <el-descriptions-item label="封面">
        <el-image style="width: 100px; height: 100px" :src="activity.cover" />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
  let activity = {
    name: '清洁家园行动',
    organization: '未来软件工作室',
    creator: '赵如龙',
    cover:
      'https://bpic.588ku.com/back_origin_min_pic/19/04/16/6aaad5b102a489ca0dab57282e4d964f.jpg!/fw/750/quality/99/unsharp/true/compress/true',
    description:
      '旨在了所能及的情况下做一些帮助空巢老人做家务，打扫卫生等工作，感受来自社会的温暖。',
    startTime: '2023-02-15 9:00',
    endTime: '2023-02-15 12:00',
    location: '学校操场集合前往目的地',
    capacity: '15',
  }
</script>

<style lang="scss" scoped></style>
