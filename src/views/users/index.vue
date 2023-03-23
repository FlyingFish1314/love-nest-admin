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
          <el-tag>用户列表</el-tag>
          <!-- <el-button type="primary" @click="add"
            ><el-icon><plus /></el-icon> 添加</el-button
          > -->
          <el-button type="danger" @click="batchDelete"
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <template v-slot:volunteer="scope">{{
        scope.row.volunteer ? '志愿者' : '普通用户'
      }}</template>
      <template v-slot:operation="scope">
        <el-button type="primary" size="small" icon="Edit" @click="edit(scope.row)">
          编辑
        </el-button>
        <el-button @click="del(scope.row)" type="danger" size="small" icon="Delete">
          删除
        </el-button>
      </template>
    </PropTable>

    <el-dialog v-model="dialogVisible" :title="title" width="50%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="消息" prop="msg">
          <el-input v-model="ruleForm.msg" />
        </el-form-item>
        <el-form-item label="身份" prop="volunteer">
          <el-radio-group v-model="ruleForm.volunteer">
            <el-radio :label="1">志愿者</el-radio>
            <el-radio :label="0">普通用户</el-radio>
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
  import type { FormInstance } from 'element-plus'
  const loading = ref(true)
  const appContainer = ref(null)
  import PropTable from '@/components/Table/PropTable/index.vue'
  const data = []
  const userStr = `{
  "id": 1,
  "username": "18503871613",
  "password": "$2a$10$ob14XXd4WKyQ6w7M9TgeD.RzdH80FtErFSoAfS00KsJbOZHbezgxW",
  "nickName": "赵如龙3",
  "avatar": "https://homing-1306641601.cos.ap-beijing.myqcloud.com/picture/2022/8/31/52a10ecb-1155-4aab-8419-78a442cf00b4.png",
  "realName": "赵rl",
  "sex": "男",
  "declaration": "我要奉献",
  "birthDay": "2001-12-15",
  "phoneNumber": "18503871613",
  "email": null,
  "residence": null,
  "idNo": "410182200112150752",
  "job": "7",
  "education": "3",
  "workUnit": null,
  "studentId": null,
  "regDate": "2022-08-02",
  "certification": 0,
  "politicsStatus": "3",
  "volunteer": 1,
  "permission": "ADMIN"
}`
  const userObj = JSON.parse(userStr)
  for (let i = 0; i < 100; i++) {
    data.push(userObj)
  }
  const column = [
    { type: 'selection', width: 60, fixed: 'left' },
    { name: 'username', label: '用户名', inSearch: true, valueType: 'input', width: 150 },
    { name: 'nickName', label: '真实姓名', align: 'center' },
    {
      name: 'volunteer',
      label: '身份',
      slot: true,
      inSearch: true,
      options: [
        {
          value: 1,
          label: '志愿者',
        },
        {
          value: 0,
          label: '普通用户',
        },
      ],
      valueType: 'select',
    },
    { name: 'birthDay', label: '生日', inSearch: false, valueType: 'input', width: 130 },
    { name: 'phoneNumber', label: '电话', inSearch: false, valueType: 'input', width: 130 },
    { name: 'permission', label: '权限', inSearch: false, valueType: 'input', width: 180 },
    { name: 'operation', slot: true, fixed: 'right', width: 200, label: '操作' },
  ]
  const list = ref(data)

  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    msg: '',
    volunteer: null,
  })

  const rules = reactive({
    msg: [{ required: false, message: '请输入描述', trigger: 'blur' }],
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
    ElMessage.success('身份修改成功')
  }

  const add = () => {
    title.value = '新增'
    dialogVisible.value = true
  }

  const batchDelete = () => {
    if (!selectObj.value.length) {
      return ElMessage.error('未选中任何行')
    }
    ElMessageBox.confirm('你确定要删除选中用户吗?', '温馨提示', {
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
    title.value = '编辑状态'

    ruleForm.volunteer = row.volunteer
    rowObj.value = row
    dialogVisible.value = true
    console.log(ruleForm.volunteer)
  }

  const del = (row) => {
    console.log('row==', row)
    ElMessageBox.confirm('你确定要删除当前用户吗?', '温馨提示', {
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
    }, 500)
    ElMessage.success('已重置')
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
