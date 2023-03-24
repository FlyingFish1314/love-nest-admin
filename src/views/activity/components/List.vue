<template>
  <el-card header="活动列表" class="m-list">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in list">
        <el-card class="inner">
          <div class="header">
            <div class="title">
              <div class="border"></div>
              <div>{{ item.name }}</div>
              <div class="text">{{ item.planner }} | {{ item.date }}</div>
            </div>
          </div>
          <div class="footer">
            <div class="flex-center item-child" v-on:click="handleClick(item)">
              <el-icon><View /></el-icon>
              <span class="text">预览</span>
            </div>
            <!-- <div class="flex-center item-child">
              <el-icon><Edit /></el-icon>
              <span class="text">编辑</span>
            </div> -->
            <div class="flex-center item-child" v-on:click="batchDelete(index)">
              <el-icon><Delete /></el-icon>
              <span class="text">删除</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <Pagination />
  </el-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Pagination from './Pagination.vue'
  import router from '@/routers'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const batchDelete = (index) => {
    ElMessageBox.confirm('你确定要删除该活动吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        list.value.splice(index, 1)
        ElMessage.success('删除成功')
      })
      .catch(() => {})
  }
  let list = ref([
    { id: '1', name: '清洁家园行动', date: '2022-01-01', planner: '赵如龙' },
    { id: '2', name: '爱心助学计划', date: '2022-02-14', planner: '唐静' },
    { id: '3', name: '环保义工招募', date: '2022-03-20', planner: '史杰' },
    { id: '4', name: '健康知识普及活动', date: '2022-04-07', planner: '许磊' },
    { id: '5', name: '敬老爱幼志愿服务', date: '2022-05-01', planner: '谭强' },
    { id: '6', name: '乡村振兴义工行动', date: '2022-06-15', planner: '史玉玉' },
    { id: '7', name: '助力残疾人融入社会', date: '2022-07-10', planner: '吴九' },
    { id: '8', name: '爱心送温暖，关爱留守儿童', date: '2022-08-18', planner: '赵如龙' },
    { id: '9', name: '绿色出行行动', date: '2022-09-22', planner: '史娟' },
    { id: '10', name: '公益捐赠计划', date: '2022-10-11', planner: '李静' },
    { id: '11', name: '爱心抗疫志愿服务', date: '2022-11-08', planner: '赵如龙' },
    { id: '12', name: '垃圾分类普及教育', date: '2022-12-12', planner: '唐静' },
    { id: '13', name: '美丽乡村建设行动', date: '2023-01-01', planner: '史玉玉' },
  ])
  function handleClick(value) {
    console.log(value)
    // this.$router.push(`/activity/${value.id}`)
    router.push('/activity/1')
  }
</script>

<style lang="scss" scoped>
  .m-list {
    margin-top: 10px;
    .header {
      padding: 20px;
      position: relative;
      display: flex;
      .text {
        margin-top: 10px;
        font-size: 12px;
        color: #d7d7d7;
      }
      .title {
        position: relative;
        padding-left: 20px;
      }
    }
    .border {
      left: 0;
      position: absolute;
      border-left: 2px solid $primaryColor;
      height: 100%;
    }
    .footer {
      border-top: 1px solid #e4e7ed;
      display: flex;
      justify-content: space-between;
      .text {
        margin-left: 6px;
      }
      .item-child {
        flex: 1;
        padding: 10px 0;
        color: #7f7f7f;
        position: relative;
        cursor: pointer;
        font-size: 12px;
      }
      .item-child:after {
        position: absolute;
        right: 0;
        content: '';
        display: block;
        height: 20px;
        border-right: 1px solid #e4e7ed;
      }
      .item-child:last-child:after {
        display: none;
      }
    }
    .inner {
      ::v-deep(.el-card__body) {
        padding: 0;
      }
    }
    ::v-deep(.el-col) {
      margin-bottom: 20px;
    }
  }
</style>
