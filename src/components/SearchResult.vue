<template>
    <el-card shadow="hover">
        <template #header>
            <el-link type="primary" :href="url" target="_blank">
                <h1 style="margin: 0; padding: 0;">{{ title }}</h1>
            </el-link>
        </template>
        <el-text size="large">{{ content }}</el-text>
        <template #footer>
            <el-link type="info" :href="url" target="_blank">
                {{ url }}
            </el-link>
            <div style="text-align: right;">
                <el-space>
                    <el-tag v-for="name in matchers" round>{{ name.charAt(0).toUpperCase()
                + name.slice(1) }}</el-tag></el-space>
            </div>
        </template>
    </el-card>
    <div style="margin: 2.5%;"></div>
</template>

<script>
export default {
    props: {
        title: { required: true, type: String },
        url: { required: true, type: String },
        content: { required: true, type: String },
        matchers: { required: true, type: Array },
    }
};
</script>