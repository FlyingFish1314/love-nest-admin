<template>
  <div class="item-card">
    <div
      class="zb-pro-checkcard"
      v-for="(item, index) in list"
      @click="check(item, index)"
      :key="item.id"
      :class="{
        'single-active': active === index,
      }"
    >
      <div class="pro-checkcard-content flex-justify-between">
        <div>{{ item.name }}</div>
        <div class="num">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  let list = [
    {
      name: '活动总数',
      count: 13,
      id: 1,
    },
    {
      name: '进行中',
      count: 7,
      id: 2,
    },
    {
      name: '已结束',
      count: 6,
      id: 3,
    },
    {
      name: '参与人数',
      count: 136,
      id: 4,
    },
    {
      name: '服务人数',
      count: 67,
      id: 5,
    },
  ]

  let active = ref(0)

  const check = (item, index) => {
    active.value = index
  }
</script>

<style lang="scss" scoped>
  .item-card {
    display: flex;
    flex-wrap: wrap;
  }

  .zb-pro-checkcard {
    box-shadow: 0 2px 12px 0 #0000001a;
    width: 19.2%;
    margin-right: 1%;
    margin-bottom: 10px;
    cursor: pointer;
    background: white;
    position: relative;
    .pro-checkcard-content {
      width: 100%;
      height: 100%;
      padding: 20px 20px;
      box-sizing: border-box;
    }
    .num {
      font-weight: bold;
      font-size: 16px;
    }
    .tool {
      position: absolute;
      top: 0;
      right: 0;
      .el-icon-error {
        color: #f56c6c;
        font-size: 16px;
      }
    }
  }
  .zb-pro-checkcard:nth-child(5n + 5) {
    margin-right: 0;
  }
  .single-active {
    background: #409eff;
    color: white;
  }
</style>
