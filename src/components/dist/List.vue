<template>
<div class="list">
  <a-list :bordered="true"  item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <div style="float:right">
        <a-rate :default-value="item.rate" allow-half disabled  />
        <br>
          <div>
          <a-button class="btn"  @click="showDrawer(item.jobId)">
            评论
          </a-button>
          <a-drawer
            placement="right"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
          >
            <div style="margin:-10px;">
            <a-list
                class="comment-list"
                :header="`${jobComment.length} 条评论`"
                item-layout="horizontal"
                :data-source="jobComment"
              >
                <a-list-item slot="renderItem" slot-scope="item" style="padding:0">
                  <a-comment :author="item.name" avatar="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg">
                    <template slot="actions">
                    </template>
                    <p slot="content">
                      {{ item.content }}
                    </p>
                  </a-comment>
                </a-list-item>
              </a-list>  
              <a-affix :offset-bottom="bottom" style="padding-left:60%">
                <a-button @click="addComment()" type="primary">
                  添加评论
                </a-button>
              </a-affix>
            </div>
          </a-drawer>
        </div>
      </div>
      <a-list-item-meta
        :description="'职位：'+item.position"
      >
        <a slot="title" @click="inEmp(item.empId)">雇主：{{ item.empName }}</a>
        <a-avatar
          slot="avatar"
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg"
        />
      </a-list-item-meta>
      <br>
      要求：{{item.require}}
      <br>
      时间：{{item.time}}
      <br>
      薪资：{{item.money}}
      <br>
      地点：{{item.place}}
      <div style="float:right">
        联系方式：{{item.phone}}
      </div>
    </a-list-item>
  </a-list>
  <emp ref="emp"></emp>
  <a-modal v-model="commentVisible" title="请添加评论" @ok="handleComment">
      <a-rate v-model="commentMessage.rate" />
      <br><br>
      <a-textarea placeholder="请输入评论内容" v-model="commentMessage.comment" allow-clear  />
  </a-modal>
</div>
</template>
<script>
import axios from 'axios'
import bus from '../../util/bus'
import Emp from '../dist/Emp'
const data = [];
export default {
  components:{
    Emp
  },
  data() {
    return {
      jobId:'',
      data,
      visible: false,
      commentVisible:false,
      jobComment:[],
      bottom: 10,
      commentMessage:{
        rate:0,
        comment:''
      },
      token: window.sessionStorage.getItem("token")
    };
  },
  methods:{
      handleComment(){
        //发请求
          //用户id
          //工作id
          //评分
          //评论内容
        if(this.commentMessage.comment!=''){
          axios({
            url:'/comment/addComment',
            method:'post',
            data:{
                stuId:window.sessionStorage.getItem("uid"),
                jobId:this.jobId,
                rate:this.commentMessage.rate,
                content:this.commentMessage.comment
            }
          }).then(res => {
              if(res.status==200){
                this.$message.success('请求成功')
                this.commentVisible = false
                this.getComment(this.jobId);
                this.getJobList()
                this.commentMessage = {
                  rate:0,
                  comment:''
                }
              }else{
                this.$message.error('请求失败')
              }
          })
        }else{
          this.$message.error('评论内容不能为空')
        }
      },
      addComment(){
        if(this.token!=null){
          this.commentVisible = true
        }else{
          this.$message.error('请先登录')
        }
        
      },
      getJobList(){
          axios({
              url:'/list/jobList'
          }).then(res => {
              this.data = res.data
          })
      },
      inEmp(id){
        console.log(id)
          this.$refs.emp.showModal(id);
      },
      afterVisibleChange(id) {
      },
      showDrawer(id) {
        if(this.token!=null){
          this.jobId = id
          this.visible = true;
          this.getComment(id);
        }else{
          this.$message.error('请先登录')
        }
      },
      onClose() {
        this.visible = false;
      },
      getComment(id){
          axios({
            url:'/comment/jobComment/'+id
          }).then(res => {
            this.jobComment = res.data;
          })
      }
  },
  created:function(){
      this.getJobList()
  },
  mounted:function(){
    bus.$on('resData',val=>{
      console.log('resData',val);
      this.data = val
    })
  }
};
</script>
<style>
.list{
    width: 70%;
    margin-left: 15%;
    margin-top:20px;
    color: white;
    background-color: white;
}
.btn{
  height:30px;
  width: 100px;
  margin-top: 25%;
}
</style>