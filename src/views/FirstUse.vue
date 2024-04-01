<template>
    <Article title="欢迎使用「聚」合搜索" author="chhongzh" :date="ddate">
        欢迎使用「聚」合搜索<br />
        相信看到这里, 你已经完成安装过程的一大半了!<br />
        <br />
        <br />
        <br />
        下方为你服务器的URL地址. 如果您使用您的后端是在本地运行的, 请在下方地址栏输入<code>http://localhost:57621</code>. 否则, 请根据你的服务器地址进行配置. <br />

        <div style="margin-top: 2.5%;"></div>
        <el-input v-model="vvalue" :readonly="is_edit">
            <template #append>
                <el-button @click="set_server">设置!</el-button>
            </template>
        </el-input>
    </Article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { info } from '@/utils'
import { server_api } from '@/storage'
import { ElNotification } from 'element-plus'


const ddate = new Date('2024-3-30')
const T = 'FirstUse'
const vvalue = ref("http://localtest.me:57621")
const is_edit = ref(false)

const set_server = async () => {
    is_edit.value = true
    info(T, `Setting server api. -> ${vvalue.value}`)

    server_api.value = vvalue.value

    // 重新加载!
    ElNotification({
        title: '设置成功',
        message: "页面将会在3秒后重新加载...",
        position: 'bottom-right',
        type: 'success'
    })

    setTimeout(() => {
        info(T, 'Reload!')

        location.reload()
    }, 3000);
}

onMounted(async () => {
    // 已经设置过, 推到主页
    if (server_api.value != undefined || server_api.value != null) {
        info(T, '已经设置过了api地址, 返回')

        ElNotification({
            title: '提示',
            message: "设置已经生效了! 快去看看吧!",
            position: 'bottom-right',
            type: 'info'
        })

        useRouter().push('/')
    }
    info(T, '检查通过 -> 不推送')
})
</script>

<script>
import Article from '../components/Article.vue';
export default {
    components: { Article }
}
</script>