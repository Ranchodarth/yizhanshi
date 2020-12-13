<template>
  <div>
    <div class="container">
      <p class="title">政策详情</p>
      <el-input
        class="textarea"
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 10}"
        placeholder=""
        v-model="discountTxt"
      >
      </el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addFlag = false"
          class="mr30"
        ><i class="el-icon-s-promotion"></i> 确 定</el-button>
        <el-button style="background:#dcecff" @click="addFlag = false"><i class="el-icon-document-delete"></i> 取 消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            discountTxt: ''
        };
    },
    created() {},
    methods: {}
};
</script>

<style scoped>
.title {
    text-align: center;
    color: #52a3ff;
    margin-bottom: 10px;
}
/deep/.el-textarea__inner {
    background: #f2f6fb;
}
.dialog-footer{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.container{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.textarea{
  flex: 1;
}
</style>
