<template>
    <div>
        <h1>「聚」合搜索</h1>
        <el-divider />
        <el-input size="large" :placeholder="search_tip" @keyup.enter="search_click" v-model="search_value"
            :disabled="is_on_search">
            <!-- 左边搜索btn -->
            <template #append>
                <el-button v-loading="is_on_search" @click="search_click">{{ is_on_search ? "搜索中..." : "搜索"
                    }}</el-button>
            </template>
        </el-input>


        <!-- 上下边距 -->
        <div style="margin-top: 2.5%;"></div>

        <!-- 搜索结果 -->
        <div>
            <el-scrollbar>
                <SearchResult v-for="(res) in search_res" :title="res[0]" :content="res[2]" :url="res[1]"
                    :matchers="res[3]" />
                <!-- 搜索骨架, 用于搜索结果展示 -->
                <Transition name="el-fade-in" v-for="n in 1">
                    <el-skeleton style="margin-top: 2.5%;" v-show="is_on_search" :rows="5" animated />
                </Transition>
            </el-scrollbar>
        </div>

        <!-- 卑微的log box -->
        <div>
            <el-divider />
            <el-text type="info">{{ bottom_tip }}(共{{ search_res.length }}个结果)</el-text>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, inject, reactive } from 'vue'
import { info, warn } from '@/utils.js'
import { ElMessageBox, ElNotification } from 'element-plus'
import { server_api } from '@/storage'
import { server_err } from '@/dialogs'
import { useRouter } from 'vue-router'

const T = "Home page" // Log Tag
const search_tip = ref("搜一些什么吧...")
const search_value = ref("")
const bottom_tip = ref("「聚」合搜索")
const search_res = ref([])

const is_on_search = ref(false)

const store = inject('$store')
const axios = inject('axios')
const $router = useRouter()


onMounted(() => {
    info(T, 'Home Page mounted.')
})

const search_click = async () => {
    const start_time = new Date()

    // 开始搜索
    info(T, '开始搜索...')

    bottom_tip.value = "🔍 开始搜索喽!"

    // 长时间未返回
    const tid = setTimeout(() => {
        ElNotification({
            title: '...',
            message: "搜索时间好像有点久了.. 是不是出现了错误? 前去控制台查看吧!",
            position: 'bottom-right',
            type: 'info'
        })

        bottom_tip.value = "🔍 搜索时间过长, 去控制台看看有什么错误吧..."
    }, 3000);

    // 检查是否配置
    if (server_api.value == null || server_api.value == undefined) {
        ElMessageBox.alert('请先配置服务器地址!', '错误 :(')

        bottom_tip.value = "😵 服务器地址没有配置..."
        is_on_search.value = false // 一定一定要释放锁, 不然会造成无法搜索的情况

        $router.push('/firstuse')
        return
    }

    // 先检查是否完成服务器的检查
    if (!store.state.is_server_alive) {
        ElMessageBox.alert('请先等待服务器检查完成!', '错误 :(')

        is_on_search.value = false // 一定一定要释放锁, 不然会造成无法搜索的情况
        bottom_tip.value = "😵 先等待服务器配置完成, 好吗?...."


        $router.push('/error/server')
        return;
    }
    info(T, '服务器检查完毕')

    // 先关闭可否编辑
    is_on_search.value = true

    // 读取可以使用的matcher
    const res = (await axios.get(server_api.value + '/matcher/all')).data

    if (res.code != 0 && !store.state.is_server_alive) {
        server_err()

        clearTimeout(tid)
        is_on_search.value = false // 释放锁

        $router.push('/error/server')
        return
    }

    search_res.value = [] // Clear Old results

    var total_time = 0

    // 遍历matcher
    res.data.matchers.forEach(async matcher => {

        info(T, `Matcher -> ${matcher}`)
        let api_addr = server_api.value + '/matcher/' + matcher + '/query/' + search_value.value
        info(T, `Api Addr -> ${api_addr}`)

        var m_promise = axios.get(api_addr).then(async (matcher_res) => {
            info(T, 'Start Matcher -> ' + matcher)

            matcher_res.data.data.result.forEach(element => {
                if (element[2] == '' || element[2] == undefined || element[2] == null) {
                    element[2] = '搜索引擎并没有给出内容...'
                }

                if (element.includes(null)) {
                    warn(T, 'A null result in search result')
                    return
                }
                var jump = false;
                // 先去判断是否存在
                search_res.value.forEach(ele => {
                    if (element[1] == ele[1]) {
                        info(T, '重复, continue!')

                        ele[3].push(matcher)

                        jump = true
                        return
                    }
                });
                if (jump) {
                    return
                }

                // 搜索引擎信息
                element.push([matcher])

                search_res.value.push(element)
            });



        })

    });




    info(T, is_on_search.value)

    const end_time = new Date()
    total_time = (end_time.getTime() - start_time.getTime()) / 1000

    clearTimeout(tid)
    bottom_tip.value = `😎 Done! (在${total_time}秒内通过${res.data.matchers.length}不同的搜索引擎搜索了以上结果!)`
    is_on_search.value = false // 一定一定要释放锁, 不然会造成无法搜索的情况
}
</script>

<script>
import SearchResult from '@/components/SearchResult.vue'

export default {
    components: { SearchResult }
}
</script>