<template>
    <el-card>
        <!-- Header of article -->
        <h1 style="padding: 0%; margin: 0%;">{{ title }}</h1>
        <div style="text-align: right;padding: 0%; margin: 0%;">
            <el-text size="large">作者: {{ author }} 发布日期: {{ date == null || date == undefined ? "暂无" :
            date.toISOString().split('T')[0] }}</el-text>
        </div>
        <el-divider />

        <!-- Main Content -->
        <el-text size="large">
            <slot></slot>
        </el-text>

        <!-- End of article -->
        <template #footer>
            <div style="text-align: right;padding: 0%; margin: 0%;">
                <el-link size="large" @click="$router.push('/')" v-show="show_back">返回</el-link>
            </div>
        </template>
    </el-card>
</template>

<script>
export default {
    props: {
        title: { required: true, type: String },
        date: { type: Date },
        author: { required: true, type: String },
        show_back: { default: true, type: Boolean },
    }
};
</script>