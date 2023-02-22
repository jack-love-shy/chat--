<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/router'
import { useStore } from 'vuex'

const labelPositon = 'left'
const formLabelAligin = ref({
  username: 'jack',
  password: '123'
})
const resdata = ref([])
const loginform = ref(null)
const store = useStore()

// 定义校验规则
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})

const login = () => {
  // 进行提交前的校验
  loginform.value.validate((valid) => {
    if (valid) {
      axios.get('api/logincontroller/login/' + formLabelAligin.value.username + '/' + formLabelAligin.value.password
      ).then((res) => {
        console.log(res.data)
        resdata.value = res.data
        if (resdata.value != null) {
          router.push('/ChatRoom')
          store.dispatch('userStore/saveUserInfoAction', res)
          console.log('存储数据')
        }
        if (resdata.value == null) {
          ElMessage.error('登录失败，用户名或者密码错误')
        }
      })
    }
  })
}

</script>

<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :span="10">
        <div class="top">

          <span class="title">在线IM系统</span>
        </div>
        <div class="box"></div>
        <div class="bottom">
          <div class="container">
            <p class="title">账号登录</p>
            <el-form :label-position="labelPositon" lable-width="80px" :model="formLabelAligin" :rules="rules"
              status-icon ref="loginform">
              <el-form-item label="用户">
                <el-input v-model="formLabelAligin.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAligin.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <div class="sumbit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<style scoped>
.top .el-icon {

  font-size: 50px;
}

.box {
  padding-bottom: 40px;
}

.container {
  margin-bottom: 32px;
}

.container .el-radio-group {
  margin: 30px 0px;
}

a:link {
  color: #ff962a;
  text-decoration: none;
}

#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}

#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background-color: #b6bccdd1 !important;
}

#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #ff962a;
  display: flex;
  justify-content: center;
}

#login .top .title {
  margin-top: 20px;
}

#login .bottom {
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#login .bottom .title {
  text-align: center;
  font-size: 30px;
}

.bottom .container .title {
  margin: 30px 0px;
  ;
}

.bottom .submit .row-login {
  width: 100%;
  background-color: #04468b;
  border-color: #04468b;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}

.bottom .submit {
  display: flex;
  justify-content: center;
}

.footer {
  margin-top: 50px;
  text-align: center;
}

.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}

.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}

.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}

.bottom .options>a {
  color: #ff962a;
}

.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
</style>
