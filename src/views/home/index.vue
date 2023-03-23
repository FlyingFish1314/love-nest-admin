<template>
  <div class="home-container">
    <el-row class="row-bg" :gutter="10">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-row class="custom" :gutter="10">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-card style="margin-bottom: 10px">
              <div class="grid-content">
                <div class="left"
                  ><el-icon style="font-size: 24px; color: white"><user /></el-icon
                ></div>
                <div class="right">
                  <div class="h2" style="color: #2d8cf0"
                    ><count-to
                      :start-val="0"
                      :end-val="3223"
                      :duration="2000"
                      :autoplay="true"
                    ></count-to
                  ></div>
                  <div>用户访问量 </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-card style="margin-bottom: 10px">
              <div class="grid-content">
                <div class="left" style="background: #64d572"
                  ><el-icon style="font-size: 24px; color: white"><user /></el-icon
                ></div>
                <div class="right">
                  <div class="h2" style="color: #64d572"
                    ><count-to
                      :start-val="0"
                      :end-val="1233"
                      :duration="2000"
                      :autoplay="true"
                    ></count-to
                  ></div>
                  <div>系统消息 </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-card style="margin-bottom: 10px">
              <div class="grid-content">
                <div class="left" style="background: #f25e43"
                  ><el-icon style="font-size: 24px; color: white"><user /></el-icon
                ></div>
                <div class="right">
                  <div class="h2" style="color: #f25e43"
                    ><count-to
                      :start-val="0"
                      :end-val="1223"
                      :duration="2000"
                      :autoplay="true"
                    ></count-to
                  ></div>
                  <div>数量 </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>每周用户活跃量</span>
            </div>
          </template>
          <div>
            <bar-charts height="300px" width="100%" id="bar1"></bar-charts>
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>系列开源产品</span>
            </div>
          </template>
          <div style="display: flex">
            <el-card style="flex: 1; margin-right: 20px; cursor: pointer" class="card-item">
              <div style="color: white; margin-bottom: 10px"><h3>zb-table</h3></div>
              <div style="font-size: 12px; color: white"
                >用作后台管理系统，管理员对平台信息做管理，包括首页、用户列表、组织列表、组织审核
              </div>
            </el-card>
            <el-card style="flex: 1; cursor: pointer" class="card-item">
              <div style="color: white; margin-bottom: 10px"><h3>移动端</h3></div>
              <div style="font-size: 12px; color: white"
                >面向用户群体，致力于志愿服务，用户登陆注册，创建组织，进行志愿服务</div
              >
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
  import { User } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import AvatarLogo from '@/assets/image/avatar.png'
  import weLogo from '@/assets/image/we.png'
  import CountTo from '@/components/CountTo/index.vue'
  import BarCharts from '@/views/echarts/simple/components/bar.vue'

  const goTo = (url) => {
    window.open(url, '_blank')
  }
</script>

<style scoped lang="scss">
  @import './index';
</style>
