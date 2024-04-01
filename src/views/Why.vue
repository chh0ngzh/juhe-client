<template>
    <Article title="为什么会开发「聚」合搜索?" author="chhongzh" :date="ddate">
        大家好这里是一个内容
    </Article>
</template>

<script setup>
const ddate = new Date('2024-3-30')

</script>

<script>
import Article from '../components/Article.vue';
export default {
    components: { Article }
}
</script>