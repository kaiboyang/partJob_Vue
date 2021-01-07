<template>
<div>
    <div style=" margin-left:10%;margin-top:20px;margin-bottom:20px">
        <a-card title="我的评论" :bordered="false" style="width: 90%">
            <a-list item-layout="horizontal" :data-source="blog">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta :description="item.content">
                        <a slot="title" @click="inBlog(item.id)">兼职名称：{{ item.name }}</a>
                        <a slot="title" @click="showDeleteBlog(item.id)" style="color:red;float:right">删除</a>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </a-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            blog: []
        }
    },
    methods: {
        getUserBlog() {
            axios({
                url: '/comment/selectJobCommentById/'+window.sessionStorage.getItem("uid"),
                method: 'get',
            }).then(res => {
                this.blog = res.data
                console.log("获取该用户评论", res.data)
            })
        },
        inBlog(id) {
            console.log("进入le某博客" + id)
            this.$router.push(`/UserBlog/${id}`);
        },
        showDeleteBlog(id) {
            let that = this
            this.$confirm({
                title: '确认删除此条评论？',
                content: '删除后将无法恢复',
                onOk() {
                    // 此处请求删除博客
                    console.log(id)
                    that.deleteBlog(id)
                    return new Promise((resolve, reject) => {
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {},
            });
        },
        deleteBlog(id) {
            console.log("id", id)
            axios({
                url: '/comment/deleteJobCommentById/'+id,
                method: 'delete',
            }).then(res => {
                this.getUserBlog()
                console.log("删除数据", res)
            })
        }
    },
    created: function () {
        this.getUserBlog()
    }
}
</script>

<style></style>
