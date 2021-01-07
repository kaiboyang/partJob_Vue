<template>
<div>
    <div style=" margin-left:10%;;margin-top:20px">
        <a-card title="个人信息" :bordered="false" style="width: 90%">
            <a style="float:right" @click="() => (modal2Visible = true)">修改信息</a>
            <p> ID：{{userinfo.id}}</p>
            <p>姓名：{{userinfo.name}}</p>
            <p>性别：{{userinfo.sex}}</p>
            <p>电话：{{userinfo.phone}}</p>
            <p>年龄：{{userinfo.age}}</p>
        </a-card>
    </div>
    <a-modal v-model="modal2Visible" title="个人信息" centered @ok="ok">
        <a-row type="flex" class="textrea">
            <a-col :flex="1" class="textCenter">ID</a-col>
            <a-col :flex="9">
                <a-input placeholder="Basic usage" v-model="userinfo.id" disabled />
            </a-col>
        </a-row>
        <a-row type="flex" class="textrea">
            <a-col :flex="1" class="textCenter">姓名</a-col>
            <a-col :flex="9">
                <a-input placeholder="Basic usage" v-model="userinfo.name" />
            </a-col>
        </a-row>
        <a-row type="flex" class="textrea">
            <a-col :flex="1" class="textCenter">性别</a-col>
            <a-col :flex="9">
                <a-input placeholder="Basic usage" v-model="userinfo.sex" />
            </a-col>
        </a-row>
        <a-row type="flex" class="textrea">
            <a-col :flex="1" class="textCenter">电话</a-col>
            <a-col :flex="9">
                <a-input placeholder="Basic usage" v-model="userinfo.phone" />
            </a-col>
        </a-row>
        <a-row type="flex" class="textrea">
            <a-col :flex="1" class="textCenter">年龄</a-col>
            <a-col :flex="9">
                <a-input placeholder="Basic usage" v-model="userinfo.age" />
            </a-col>
        </a-row>
    </a-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            userinfo: {},
            modal2Visible: false,
        }
    },
    methods: {
        ok() {
            this.modal2Visible = false
            axios({
                url: '/doStuUpdate',
                method: 'post',
                data: {
                    id: this.userinfo.id,
                    name: this.userinfo.name,
                    sex: this.userinfo.sex,
                    phone: this.userinfo.phone,
                    age: this.userinfo.age
                }
            }).then(res => {
                console.log("更新数据", res)
            })
        },
        getUserInfo() {
            axios({
                url: '/findStuAll/'+window.sessionStorage.getItem("uid"),
                method: 'get',
            }).then(res => {
                console.log("获取用户信息", res.data)
                this.userinfo = res.data
            })
        }
    },
    created: function () {
        console.log("created")
        this.getUserInfo()
    }
}
</script>

<style>
.textCenter {
    margin-top: 4px
}

.textrea {
    margin-top: 5px;
}
</style>
