<template>
  <!-- Loading modal -->
  <el-container>
    <el-main style="height:100%">
      <el-row>
        <el-col :push="4" :span="16">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :push="4" :span="16">
          <div style="text-align: right;">
            <el-text style="text-align: right;" type="info">这是一个由chhongzh开发的聚合搜索引擎... | <el-text
                @click="$router.push('/qa/why')" type="info">为什么?</el-text> | <el-text type="info"
                @click="toggle_dark">黑暗模式</el-text> | <el-text @click="$router.push('/setting')"
                type="info">设置</el-text></el-text>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup>
import { info } from '@/utils'
import { onMounted, inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { server_api } from '@/storage'

const axios = inject('axios');
const store = inject("$store")
const $router = useRouter();

const T = "App"


const is_dark = useDark()
const toggle_dark = () => { document.getElementById('HtMl').className = document.getElementById('HtMl').className == 'dark' ? "light" : 'dark' }

onMounted(() => {
  info(T, 'App mounted.')
  // Check server is avalivable.
  if (server_api.value == undefined || server_api == null) {
    store.commit('server_is_not_alive')

    info(T, '是第一次使用! 推送到教程!')

    $router.push('/firstuse')
  } else {
    info(T, '不是第一次使用, 不需要推送!')

    // Check server list.
    info(T, '检查服务器')

    axios.get(server_api.value)
      .then((res) => {
        let data = res.data

        if (data.code != 0) { // 如果不等于0代表出现错误
          ElMessageBox.alert(`期待搜索服务器返回0, 但是返回了${data.code}. 服务器部署错误?`, '遇到了错误 :(')

          $router.push('/error/server')
        } else {
          info(T, '服务器符合预期')

          // 告诉store, 服务器已经检查完成
          store.commit('server_is_alive')
        }
      })
      .catch((err) => {
        // BooM!
        console.log(err)
        ElNotification({
          title: '服务器错误???',
          message: "尝试与服务器进行测试连接时, 遇到了错误! 通过控制台获得更多信息...",
          position: 'bottom-right',
          type: 'error'
        })

        $router.push('/error/server')
      })
  }
})
</script>