<template>
<div style="width:90%;margin-left:5%;">
    <a-comment>
        <div slot="content">
            <a-form-item>
                <a-textarea :rows="2" :value="value" @change="handleChange" placeholder="评论内容..." />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                    Add Comment
                </a-button>
            </a-form-item>
        </div>
    </a-comment>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';
export default {
    data() {
        return {
            submitting: false,
            value: '',
        };
    },
    methods: {
        getDate(format) {
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            var day = now.getDay(); //得到周几
            var hour = now.getHours(); //得到小时
            var minu = now.getMinutes(); //得到分钟
            var sec = now.getSeconds(); //得到秒
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            if (hour < 10) hour = "0" + hour;
            if (minu < 10) minu = "0" + minu;
            if (sec < 10) sec = "0" + sec;
            var time = "";
            //精确到天
            if (format == 1) {
                time = year + "-" + month + "-" + date;
            }
            //精确到分
            else if (format == 2) {
                time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
            }
            return time;
        },
        handleSubmit() {
            console.log(this.getDate(2))
            if (this.value != '') {
                axios({
                    url: '/comment/insertBaseComment',
                    method: 'post',
                    data: {
                        bTime: this.getDate(1),
                        bComment: this.value
                    }
                }).then(res => {
                    console.log(res.data)
                    window.parent.test(event, 'A');
                })

                console.log(this.value)
                this.submitting = true;

                setTimeout(() => {
                    this.submitting = false;
                    this.value = '';
                }, 1000);
            }else{
                this.$message.error('请输入内容')
            }
        },
        handleChange(e) {
            this.value = e.target.value;
        },
    },
};
</script>
