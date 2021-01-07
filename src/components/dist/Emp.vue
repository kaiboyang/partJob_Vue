<template>
<div>
    <a-modal v-model="visible" title="该雇主的其他职位" @ok="handleOk">
    <a-list :bordered="true"  item-layout="horizontal" :data-source="list">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="'职位：'+item.position"
      >
      </a-list-item-meta>
      要求：{{item.require}}
      <br>
      时间：{{item.time}}
      <br>
      薪资：{{item.money}}
      <br>
      地点：{{item.place}}
        </a-list-item>
    </a-list>
    <emp ref="emp"></emp>
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
            empid:'',
            list:[]
        };
    },
    methods: {
        showModal(id) {
            this.empid = id
            this.getEmpList(id)
            this.visible = true;
        },
        getEmpList(id){
            axios({
                url: '/list/empJobList/'+id,
                method: 'get',
            }).then(res => {
                this.list = res.data
                console.log(res)
            })
        },
        handleOk(e) {
            this.visible = false
        },
    },
};
</script>
