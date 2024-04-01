<template>
    <Article title="Don't Panic! 不要紧张" author="chhongzh" :date="ddate">
        哟!<br />
        你的服务器配置看起来不正常<br />
        <br />
        (我早就猜到了你会来这里看解决办法?......!)<br />
        <br />
        <br />
        好吧, 那么让我来告诉你解决方法吧:<br />
        1. 可能是服务端没有启动成功. 尝试启动服务器并重试.<br />
        2. 可能是服务器地址配置错误, 要不点击下面的按钮来重置?<br />
        <el-button @click="reset_server" type="danger">点我重置服务器地址~</el-button><br />
        3. 如果你坚信, 这不是一个错误. 那么点击下面按钮来标记这不是错误<br />
        <el-button @click="not_err">标记不是个错误</el-button><br />

    </Article>
</template>

<script setup>
import { info } from '@/utils'
import { server_api } from '@/storage'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import store from '@/store'
import { onMounted } from 'vue'

const T = 'ServerError'
const ddate = new Date('2024-3-30')
const $router = useRouter()

const reset_server = () => {
    info(T, '重置地址')
    server_api.value = null

    ElNotification({
        title: '重置成功',
        message: "页面将会在3秒后重新加载...",
        position: 'bottom-right',
        type: 'success'
    })

    setTimeout(() => {
        location.reload()
    }, 3000);
}

const not_err = () => {
    store.commit('server_is_alive')
    store.commit('bypass')

    ElNotification({
        title: '提示',
        message: "强制绕过检查, 接下来遇到的错误将不会被处理.",
        position: 'bottom-right',
        type: 'warning'
    })

    info(T, 'Back to homepage')
    $router.push('/')
}

onMounted(() => {
    info(T, '检查是否有Error')

    if (store.state.is_server_alive) {
        info(T, '没问题为什么要来???')

        ElNotification({
            title: '提示',
            message: "没问题为什么要来?",
            position: 'bottom-right',
            type: 'info'
        })

        $router.push('/')
    }
})

</script>

<script>
import Article from '../components/Article.vue';
export default {
    components: { Article }
}
</script>