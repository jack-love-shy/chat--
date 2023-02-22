<!-- eslint-disable camelcase -->
<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '../router/router'
import storage from '../utils/storage'
import { ElMessage } from 'element-plus'
const store = useStore()
const username = ref(store.state.userStore.userInfo.data.username)
const avatarUrl = ref(store.state.userStore.userInfo.data.avatarUrl)
const userId = ref(store.state.userStore.userInfo.data.userId)
const friendlist = ref([])
const ifvisable = ref(false)
const active = ref(-1)
const touser = ref()
const touserId = ref()
const content = ref()
const socket = ref(null)
const realcontent = ref()
// const bacjcontent = ref()
// const backusername = ref()
// const backtime = ref()
const msg = ref({
  realcontent,
  username,
  touser,
  type: 'text'
})

const backmsgAndsendmsg = ref([]

)

onMounted(() => {
  createSocket()
  getfriend()
})

// 创建 websocket 的实例
const createSocket = () => {
  socket.value = new WebSocket('ws://localhost:8081/ws')
  socket.value.onopen = websocketonopen
  socket.value.onmessage = websocketonmessage
  socket.value.onerror = websocketonerror
  socket.value.onclose = websocketclose
}

// Websoket连接成功事件
const websocketonopen = (res) => {
  ElMessage.success('WebSocket连接成功')
}
// Websoket接收消息事件
const websocketonmessage = (res) => {
  if ((res.data) !== '用户不在线') {
    ElMessage.success('接收到消息')
    backmsgAndsendmsg.value.push(JSON.parse(res.data))
  } else {
    ElMessage.error('接收到消息：' + JSON.stringify(res.data))
  }
}
// Websoket连接错误事件
const websocketonerror = (res) => {
  ElMessage.error('连接错误')
}
// Websoket断开事件
const websocketclose = (res) => {
  ElMessage.error('WebSocket连接失败！！！')
}
const getfriend = () => {
  axios.get('api/usercontroller/user/' + userId.value).then(res => {
    friendlist.value = res.data
  })
}

const exit = () => {
  storage.clearAll()
  router.push('/')
}

const visable = (index) => {
  ifvisable.value = true
  active.value = index
  touser.value = friendlist.value[index].username
  touserId.value = friendlist.value[index].userId
}

const send = () => {
  realcontent.value = content.value
  socket.value.send(JSON.stringify(msg.value))
  backmsgAndsendmsg.value.push((msg.value))

  console.log(backmsgAndsendmsg.value)
  content.value = null
}

</script>

<template>
  <el-container class="home_container">

    <el-header id="topbar">
      <el-row>
        <el-col :span="4" class="topbar-left">
          <span class="title" @click="index()">IM-SYSTEM</span>
        </el-col>
        <el-col :span="20" class="topbar-right">
          <i class="el-icon-menu" @click="toggle()"></i>
          <div class="user">

            <img :src="'src/' + avatarUrl" class="user-img" ref="img" @click="showSetting()" />
            <li class="right">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <div class="box"> <a href="javacript:;">{{ username }}</a></div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <p @click="manage()">管理中心</p>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <p class="exit" @click="exit()">退出</p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </li>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px" class="left">
        <div class="aside" :class="active != index ? 'aside1' : 'aside2'" v-for="(item, index) in friendlist" :key="index"
          @click="visable(index)">
          <div class="img"><img :src="'src/' + item.avatarUrl" class="friend-img" ref="img" /></div>
          <div class="username">{{ item.username }}</div>
        </div>
      </el-aside>
      <el-main v-show="ifvisable">
        <div class="chathead">{{ touser }}</div>
        <el-main class="chatmain">
          <div class="message" v-for="(messages, index) in backmsgAndsendmsg" :key="index">
            <div v-show="messages.fromuser == touser" class="msgleft">
              <!-- <div class="img"><img :src="'src/' + item.avatarUrl" class="friend-img" ref="img" /></div>
                                      <div class="username">{{ item.username }}</div> -->
              <div class="diog">{{ messages.content }}</div>
            </div>
            <div v-show="messages.touser == touser" class="msgright">
              <div class="diog">{{ messages.realcontent }}</div>
              <!-- <div class="username">{{ item.username }}</div> -->
              <!-- <div class="img"><img :src="'src/' + item.avatarUrl" class="friend-img" ref="img" /></div> -->
            </div>
          </div>
        </el-main>
        <el-footer class="chatfooter">
          <el-input v-model="content" :rows="10" type="textarea" placeholder="请输入内容"></el-input>
          <div class="button"><button @click="send">发送</button></div>
        </el-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.box {
  padding-bottom: 10px;
  padding-top: 5px;
}

.box a {
  color: #000;
  ;
}

.index {
  margin-left: 70px;

}

.home_container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%
}

.box {
  margin-top: 25px;

}

.box a {
  text-decoration: none;
  font-size: x-large;
  color: aquamarine;
}

.right .icon {
  margin-right: 6px;

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

#topbar {
  position: relative;
  z-index: 10;
  background-color: #124280;
  height: 80px;
  line-height: 80px;
  color: #fff;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5);
}

#topbar .topbar-left {
  height: 80px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.topbar-left .icon-kaoshi {
  font-size: 60px;
}

.topbar-left .title {
  font-size: 20px;
  cursor: pointer;
}

.topbar-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar-right .user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.topbar-right .el-icon-menu {
  font-size: 30px;
  margin-left: 20px;
}

.topbar-right .user {
  position: relative;
  margin-right: 40px;
  display: flex;
}

.topbar-right .user .user-img {
  margin-top: 15px;
  margin-left: 10px;
  cursor: pointer;
}

.user .out {
  font-size: 14px;
  position: absolute;
  top: 80px;
  right: 0px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 12px;
}

.user .out ul {
  list-style: none;
}

.user .out ul>li {
  height: 26px;
  line-height: 26px;
}

.left {
  background-color: #94b6e3;
  width: 210px;
}

.aside1 {
  border-bottom: solid 0.5px rgba(0, 0, 0, 0.066);
  height: 80px;
  text-align: center;

  display: flex;
}

.aside2 {
  background-color: #9b3838;
  border-bottom: solid 0.5px rgba(0, 0, 0, 0.066);
  height: 80px;
  text-align: center;
  display: flex;
}

.friend-img {
  flex: 1;
  width: 95px;
  height: 80px;
}

.username {
  flex: 1;
  text-align: left;
  padding-left: 25px;
  margin-top: 10px;
}

.chathead {
  height: 30px;
  text-align: left;
  border-bottom: solid 0.5px rgba(0, 0, 0, 0.197);

}

.chatmain {
  border-bottom: solid 0.5px rgba(0, 0, 0, 0.197);
  height: 400px;
}

.button {

  text-align: right;
  color: #124280;
}

.message {
  width: auto;
  height: 50px;

}

.msgleft {
  text-align: left;
}

.msgright {
  text-align: right;
}
</style>
