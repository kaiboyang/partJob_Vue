<template>
<div style="background-color:white;width:80%;margin-left:10%">
<div style="width:80%;margin:auto;margin-top:20px;">
        <a-list class="comment-list" :header="`${data.length} 条留言`" item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
                <a-comment :author="item.uname" avatar="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg">
                    <p slot="content">
                        {{ item.bcomment }}
                    </p>
                    <a-tooltip slot="datetime" :title="item.btime">
                        <span>Time</span>
                    </a-tooltip>
                </a-comment>
            </a-list-item>
        </a-list>
</div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            data: [],

        };
    },
    methods: {
        searchComment() {
            axios({
                url: '/comment/selectBaseComment',
                method: 'get',
            }).then(res => {
                this.data = res.data
                console.log(res.data)
            })
        }
    },
    mounted() {
        var that = this;
        window['test'] = (event, name) => {
            that.searchComment(event, name)
        }
    },
    created: function () {
        this.searchComment()
    }
};
</script>
