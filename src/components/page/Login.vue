<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">用户登录</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item
          prop="username"
          class="mb30"
        >
          <el-input
            v-model="param.username"
            placeholder="username"
          >
            <el-button
              slot="prepend"
              icon="el-icon-lx-people"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          class="mb30"
        >
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button
              slot="prepend"
              icon="el-icon-lx-lock"
            ></el-button>
          </el-input>
        </el-form-item>
        <div class="mb30 flex">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <span>忘记密码？</span>
        </div>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm()"
          >登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            param: {
                username: 'admin',
                password: '123123'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            checked: true
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/login/login_bg.png) no-repeat;
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #0068f0;
}
.ms-login {
    position: absolute;
    left: 0;
    right: 0;
    top: 45%;
    width: 350px;
    margin: auto;
    border-radius: 5px;
    /* background: rgba(255, 255, 255, 0.3); */
    /* overflow: hidden; */
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.mb30 {
    margin-bottom: 10%;
}
.flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #0068f0;
}
/deep/.el-checkbox {
    color: #0068f0;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #0068f0;
}
</style>