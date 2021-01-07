<template>
<div>
    <a-modal v-model="visible" title="请输入账号、密码" @ok="handleOk" v-if="token==null">
        <a-form-item>
            <a-input v-model="uid" v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]" placeholder="Username">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input v-model="upwd" v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]" type="password" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
    </a-modal>

    <a-modal v-model="visible" title="修改密码" @ok="changePwd" v-else>
        <a-input v-model="upwd" v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
        <a-input style="margin-top:30px" v-model="checkUpwd" v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]" type="password" placeholder="PleaseCheckPassword">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
    </a-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
    inject: ['reload'],
    data() {
        return {
            visible: false,
            uid: '',
            upwd: '',
            checkUpwd: '',
            token: window.sessionStorage.getItem("token"),
            registerStudent:false
        };
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            axios({
                url: '/login/student',
                method: 'post',
                data: {
                    id: this.uid,
                    pwd: this.upwd
                }
            }).then(res => {
                if (res.data==1) {
                    window.sessionStorage.setItem("token", this.uid)
                    window.sessionStorage.setItem("uid", this.uid)
                    this.visible = false;
                    this.reload();
                    this.$message.success('登录成功！');
                } else {
                    this.$message.error('登录失败！');
                }
            })
        },
        changePwd() {
            if (this.upwd == this.checkUpwd) {
                axios({
                    url: '/user/updateupwd',
                    method: 'post',
                    params: {
                        token: window.sessionStorage.getItem("token"),
                        upwd: this.upwd
                    }
                }).then(res => {
                    window.sessionStorage.clear()
                    this.visible = false;
                    this.reload();
                    this.$message.success('修改成功！');
                })
            } else {
                this.$message.error('两次密码不一致');
            }
        }
    },
};
</script>
