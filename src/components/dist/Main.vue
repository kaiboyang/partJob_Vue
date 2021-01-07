<template>
  <div>
    <a-row>
      <a-col :span="14">
        <div style="margin-left: 5%; margin-top: 20px">
          <a-carousel arrows>
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px; zindex: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div @click="studentRegister"><h3>学生注册</h3></div>
            <div @click="inEmploy"><h3>商家入驻</h3></div>
          </a-carousel>
        </div>
          <div style="margin-left:5%;margin-top:20px">
    <a-collapse @change="changeActivekey">
      <a-collapse-panel key="1" header="2021/1/5：日程规划">
        <a-collapse default-active-key="4">
          <a-collapse-panel key="4" header="2021/1/5：日程规划">
            <p>去校医院兼职一小时</p>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="2020/12/5：日程规划" :disabled="false">
        <p>去唐久兼职半小时</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="2020/11/11：日程规划">
        <p>去田园劳动</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
      </a-col>
      <a-col :span="8">
        <div
          :style="{
            margin: '20px',
            width: '400px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
          }"
        >
          <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
        </div>
      </a-col>
    </a-row>

    <a-modal
      title="注册"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      姓名：<a-input placeholder="姓名" v-model="regusterDate.name" class="register" />
      电话：<a-input placeholder="电话" v-model="regusterDate.phone" class="register" />
      年龄：<a-input placeholder="年龄" v-model="regusterDate.age" class="register" />
      性别：<a-select default-value="男" v-model="regusterDate.sex" class="register">
        <a-select-option value="男"> 男 </a-select-option>
        <a-select-option value="女"> 女 </a-select-option>
      </a-select>
      密码：<a-input-password
        placeholder="密码"
        v-model="regusterDate.pwd"
        class="register"
      />
      确认：<a-input-password
        placeholder="确认密码"
        v-model="regusterDate.checkPwd"
        class="register"
      />
    </a-modal>
    <a-modal
      title="注册成功，您的密码为"
      :visible="alertId"
      :confirm-loading="confirmLoading"
      @ok="idOk"
      @cancel="idOk"
    >
      <p>{{ zhuceId }}</p>
    </a-modal>
  </div>
</template>
<script>
import Axios from "axios";
export default {};
</script>
<style scoped>
/* For demo */
.register {
  margin-top: 5px;
  width: 90%;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: rgb(224, 224, 224);
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      regusterDate: {
        name: "",
        phone: "",
        pwd: "",
        checkPwd: "",
        age: "",
        sex: "",
      },
      alertId: false,
      zhuceId: "",
    };
  },
  methods: {
    idOk() {
      this.alertId = false;
    },
    inEmploy() {
      axios({
        url: "/index",
      }).then((res) => {
        console.log(res);
        window.location.href = "http://localhost:8081/index";
      });
    },
    studentRegister() {
      console.log("register");
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      console.log(this.regusterDate);
      if (this.regusterDate.pwd == this.regusterDate.checkPwd) {
        axios({
          url: "/doRegister",
          data: {
            name: this.regusterDate.name,
            phone: this.regusterDate.phone,
            pwd: this.regusterDate.pwd,
            age: this.regusterDate.age,
            sex: this.regusterDate.sex,
          },
          method: "post",
        }).then((res) => {
          this.zhuceId = res.data;
          this.visible = false;
          this.alertId = true;
        });
      } else {
        this.$message.error("两次密码不一致");
      }
    },
  },
};
</script>
