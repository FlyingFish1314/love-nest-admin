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
          <!-- <el-button type="primary" @click="add"
            ><el-icon><plus /></el-icon> 添加</el-button
          > -->
          <el-tag>组织列表</el-tag>
          <!-- <el-button type="danger" @click="batchDelete"
            ><el-icon><delete /></el-icon>删除</el-button
          > -->
        </div>
      </template>
      <template v-slot:sex="scope">{{ scope.row.sex ? '男' : '女' }}</template>
      <template v-slot:operation="scope">
        <el-button type="primary" size="small" icon="InfoFilled" @click="edit(scope.row)">
          详情
        </el-button>
        <!-- <el-button @click="del(scope.row)" type="danger" size="small" icon="Delete">
          删除
        </el-button> -->
      </template>
    </PropTable>

    <el-dialog v-model="dialogVisible" :title="title" width="50%">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-descriptions :bordered="true" size="small">
              <el-descriptions-item label-width="100%" label="组织名:"
                >未来软件工作室</el-descriptions-item
              >
              <el-descriptions-item label-width="100%" label="成立人账号:"
                >18503871613</el-descriptions-item
              >
              <el-descriptions-item label-width="100%" label="成立类型:"
                >高校内部成立</el-descriptions-item
              >
              <el-descriptions-item label-width="100%" label="成员数量:">0</el-descriptions-item>
              <el-descriptions-item label-width="100%" label="组织介绍:">学习</el-descriptions-item>
              <el-descriptions-item label-width="100%" label="地址:"
                >河南科技学院</el-descriptions-item
              >
              <el-descriptions-item label-width="100%" label="联系电话:"
                >18503871613</el-descriptions-item
              >
              <el-descriptions-item label-width="100%" label="成立时间:"
                >2022-08-19</el-descriptions-item
              >
              <el-descriptions-item label-width="100%" label="身份id:"
                >41018220011215</el-descriptions-item
              >
            </el-descriptions>
          </el-col>
        </el-row>
      </el-card>
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
  import type { FormInstance } from 'element-plus'
  import PropTable from '@/components/Table/PropTable/index.vue'
  const loading = ref(true)
  const appContainer = ref(null)
  let detail = ref(null)
  const data = []
  let obj = `{
        "id": 1,
        "name": "未来软件工作室",
        "nature": "高校内部成立",
        "members": 0,
        "username": null,
        "date": "2022-08-19",
        "introduction": "学习",
        "address": "河南科技学院",
        "idno": "41018220011215",
        "phoneNumber": "18503871613"
      }`
  obj = JSON.parse(obj)
  for (let i = 0; i < 100; i++) {
    data.push(obj)
  }
  const column = [
    { type: 'selection', width: 60, fixed: 'left' },
    { name: 'name', label: '组织名称', inSearch: true, valueType: 'input', width: 150 },
    { name: 'nature', label: '描述', align: 'center', width: 120 },
    { name: 'members', label: '成员数' },
    { name: 'date', label: '成立时间', width: 120 },
    { name: 'introduction', label: '介绍' },
    { name: 'address', label: '地址', width: 120 },
    { name: 'phoneNumber', label: '联系电话', width: 120 },
    { name: 'operation', slot: true, fixed: 'right', width: 100, label: '操作' },
  ]
  const list = ref(data)

  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    name: '',
    sex: null,
    price: null,
  })

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
    await ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        let obj = {
          id: Date.now(),
          ...ruleForm,
          age: 0,
          city: '普陀区',
          address: '上海市普上海',
          zip: 200333,
          province: '上海',
          admin: 'admin',
          date: dayjs().format('YYYY-MM-DD'),
        }
        if (title.value === '新增') {
          list.value = [obj, ...list.value]
          ElMessage.success('添加成功')
        } else {
          list.value.forEach((item) => {
            if (item.id === rowObj.value.id) {
              item.name = obj.name
              item.sex = obj.sex
              item.price = obj.price
            }
          })
        }
        dialogVisible.value = false
        console.log('submit!', obj)
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const add = () => {
    title.value = '新增'
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
    title.value = '详情'
    rowObj.value = row
    dialogVisible.value = true
    ruleForm.name = row.name
    ruleForm.sex = row.sex
    ruleForm.price = row.price
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
    padding-right: 100px;
  }
  .app-container {
    flex: 1;
    display: flex;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
