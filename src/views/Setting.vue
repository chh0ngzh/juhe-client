<template>
    <div>
        <h1>⚙️ 设置</h1>
        <el-divider />

        <!-- Client Options -->
        <h2>关于客户端</h2>
        <h3>服务器地址</h3>
        <el-input v-model="server_api"></el-input>

        <div style="margin-top: 5%;"></div>

        <!-- Server Options -->
        <h2>关于服务器</h2>
        <h3>服务器版本</h3>
        <el-input type="textarea" readonly autosize v-model="server_info"></el-input>
        <div style="margin-top: 2.5%;"></div>
        <h3>服务器统计</h3>
        <el-input type="textarea" readonly autosize v-model="server_stat"></el-input>


        <!-- Back -->
        <el-divider />
        <el-link type="info" @click="$router.push('/')">返回</el-link>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { info } from '@/utils'
import { ElNotification } from 'element-plus'
import { server_api } from '@/storage'
import store from '@/store'

const T = "Setting"
const axios = inject('axios')

const server_info = ref('等待服务器返回结果')
const server_stat = ref('等待服务器返回结果')

const get_data = () => {
    if (!store.state.is_server_alive) {
        ElNotification({
            title: '初始化服务器错误',
            message: "请等待服务器连接被初始化.",
            position: 'bottom-right',
            type: 'error'
        })
        return
    }

    axios.get(server_api.value + '/setting').then(res => {
        info(T, '获得数据!')

        server_info.value = res.data.data.version
        server_stat.value = `服务器总启动时间: ${res.data.data.status.uptime}(Sec)\n服务器总处理数量: ${res.data.data.status.total_req}\n服务器总错误数量: ${res.data.data.status.total_err}`
    })
}

onMounted(() => {
    info(T, "Page mounted.")

    // 获得服务器信息
    get_data()
})
</script>