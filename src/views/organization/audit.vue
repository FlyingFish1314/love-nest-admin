<template>
  <div class="app-container" ref="appContainer">
    <PropTable
      :loading="loading"
      @selection-change="selectionChange"
      :columns="column"
      :data="list"
      @reset="reset"
      @onSubmit="onSubmit"
    >
      <template v-slot:btn>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <el-tag>组织审核</el-tag>
          <el-button type="primary" @click="add"
            ><el-icon><plus /></el-icon>批量审核</el-button
          >
          <!-- <el-button type="danger" @click="batchDelete"
            ><el-icon><delete /></el-icon>批量操作</el-button
          > -->
        </div>
      </template>
      <template v-slot:state="scope">{{
        scope.row.state > 0 ? (scope.row.state == 1 ? '审核通过' : '未通过') : '未审核'
      }}</template>
      <template v-slot:operation="scope">
        <el-button type="primary" size="small" icon="Edit" @click="edit(scope.row)">
          编辑
        </el-button>
        <!-- <el-button @click="del(scope.row)" type="danger" size="small" icon="Delete">
          删除
        </el-button> -->
      </template>
    </PropTable>

    <el-dialog v-model="dialogVisible" :title="title" width="50%">
      <el-descriptions
        title="申请信息 "
        :column="1"
        border
        class="descriptions"
        style="margin-bottom: 20px"
      >
        <el-descriptions-item label="组织名称">河南科技学院爱心协会</el-descriptions-item>
        <el-descriptions-item label="申请人">王箫凯</el-descriptions-item>
        <el-descriptions-item label="组织类型">校内组织</el-descriptions-item>
        <el-descriptions-item label="联系电话">18503871613</el-descriptions-item>
        <el-descriptions-item label="介绍"
          >乘上幸福智慧号，健康快乐每一天或者：吹响幸福智慧的号角。</el-descriptions-item
        >
        <el-descriptions-item label="地址">河南科技学院</el-descriptions-item>
        <el-descriptions-item label="申请理由">致力于服务学校周边的空巢老人</el-descriptions-item>
        <el-descriptions-item label="身份证号">410182200112150752</el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="7.5rem"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="回复消息" prop="message">
          <el-input v-model="ruleForm.message" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio :label="1">通过审核</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleClose(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup name="comprehensive">
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import * as dayjs from 'dayjs'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import PropTable from '@/components/Table/PropTable/index.vue'
  import type { FormInstance } from 'element-plus'
  const loading = ref(true)
  const appContainer = ref(null)
  const data = [
    {
      id: 3,
      name: '河南科技学院爱心协会',
      nature: '校内组织',
      principal: '王箫凯',
      phoneNumber: '18503871613',
      introduction: '较快拉升的咯技术的就爱看 卡圣诞贺卡大厦酒店了爱看电视教案课件了',
      address: '河南科技学院',
      reason: '致力于服务学校周边的空巢老人',
      idno: '410182200112150752',
      applicationLetter: '11',
      state: '0',
    },
    {
      id: 3,
      name: '爱益启',
      nature: '校内组织',
      principal: '许明',
      phoneNumber: '18115637767',
      introduction:
        '《爱的奉献》只要人人都献出一点爱世界将变成美好的人间;一点点爱汇聚成大爱的意思。',
      address: '河南科技学院',
      reason: '帮助他人，乐于奉献',
      idno: '410182200012150232',
      applicationLetter: '11',
      state: '0',
    },
    {
      id: 3,
      name: '爱心工社',
      nature: '校内组织',
      principal: '秦平',
      phoneNumber: '18503871613',
      introduction:
        '以公益服务为主导，强化社区老少文体活动之功能，体现我们设计活动的趣味性、幸福感、和谐性',
      address: '河南科技学院',
      reason: '致力于服务学校周边的空巢老人',
      idno: '410182200112150752',
      applicationLetter: '11',
      state: '0',
    },
  ]
  const column = [
    { type: 'selection', width: 60, fixed: 'left' },
    { name: 'name', label: '组织名称', inSearch: true, valueType: 'input', width: 200 },
    { name: 'nature', label: '描述', align: 'center', width: 120 },
    {
      name: 'state',
      label: '状态',
      slot: true,
      inSearch: true,
      options: [
        {
          value: 0,
          label: '未审核',
        },
        {
          value: 1,
          label: '审核通过',
        },
        {
          value: 2,
          label: '未通过',
        },
      ],
      valueType: 'select',
    },
    { name: 'reason', label: '申请理由', width: 240 },
    { name: 'address', label: '地址', width: 120 },
    { name: 'phoneNumber', label: '联系电话', width: 120 },
    { name: 'operation', slot: true, fixed: 'right', width: 100, label: '操作' },
  ]
  const list = ref(data)

  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    message: '',
    state: null,
  })
  let detail = reactive({})
  const rules = reactive({
    name: [
      { required: true, message: '请输入活动名称活动区域', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
    sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change',
      },
    ],
  })

  const dialogVisible = ref(false)
  const title = ref('新增')
  const rowObj = ref({})
  const selectObj = ref([])

  const handleClose = async (done: () => void) => {
    dialogVisible.value = false
    selectObj.value.length = 0
    loading.value = true
    setTimeout(() => {
      loading.value = false
      ElMessage.success('操作成功')
    }, 500)
  }

  const add = () => {
    if (!selectObj.value.length) {
      return ElMessage.error('未选中任何行')
    }
    title.value = '批量审核'
    dialogVisible.value = true
  }

  const batchDelete = () => {
    if (!selectObj.value.length) {
      return ElMessage.error('未选中任何行')
    }
    ElMessageBox.confirm('你确定要删除选中组织吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        ElMessage.success('删除成功')
        list.value = list.value.concat([])
      })
      .catch(() => {})
  }
  const selectionChange = (val) => {
    selectObj.value = val
  }

  const edit = (row) => {
    title.value = '编辑'
    rowObj.value = row
    dialogVisible.value = true
    ruleForm.message = row.message
    ruleForm.state = row.state
    detail = row
  }
  const del = (row) => {
    console.log('row==', row)
    ElMessageBox.confirm('你确定要删除当前组织吗吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        list.value = list.value.filter((item) => item.id !== row.id)
        ElMessage.success('删除成功')
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 500)
      })
      .catch(() => {})
  }

  const reset = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      ElMessage.success('已重置')
    }, 500)
  }

  const onSubmit = (val) => {
    console.log('val===', val)
    loading.value = true
    setTimeout(() => {
      loading.value = false
      ElMessage.success('查询成功')
    }, 500)
  }

  const getHeight = () => {}

  onMounted(() => {
    nextTick(() => {
      // let data = appContainer.value.
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
</script>

<style scoped>
  .edit-input {
    padding-right: 6.25rem;
  }
  .app-container {
    flex: 1;
    display: flex;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }
  .cancel-btn {
    position: absolute;
    right: 0.9375rem;
    top: 0.625rem;
  }
</style>
