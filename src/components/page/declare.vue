<template>
  <div>
    <div class="crumbs"></div>
    <div class="searchMouder">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item
          label="人员姓名"
          class="mr10"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="身份证号"
          class="mr10"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业名称"
          class="mr10"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业社保账号"
          class="mr10"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item
          label="补贴类型"
          class="mr10"
        >
          <el-select
            v-model="formInline.region"
            placeholder="请选择"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="申请状态"
          class="mr10"
        >
          <el-select
            v-model="formInline.region"
            placeholder="请选择"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="发放状态"
          class="mr10"
        >
          <el-select
            v-model="formInline.region"
            placeholder="请选择"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="fr">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            class="refresh"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          class="handle-del mr30 btn_hand"
          @click="delAllSelection"
        ><img
            src="../../assets/img/function_icon/daoru.png"
            alt=""
            style="vertical-align: middle; margin-right: 5px"
          /><span style="vertical-align: middle">导入</span></el-button>
        <el-button
          type="primary"
          class="handle-del mr30 btn_hand"
          @click="exportExcel"
        ><img
            src="../../assets/img/function_icon/daochu.png"
            alt=""
            style="vertical-align: middle; margin-right: 5px"
          /><span style="vertical-align: middle">导出</span></el-button>
        <el-button
          type="primary"
          class="handle-del mr30 btn_hand"
          @click="xiugaiAll"
        ><img
            src="../../assets/img/function_icon/xiugai.png"
            alt=""
            style="vertical-align: middle; margin-right: 5px"
          /><span style="vertical-align: middle">修改总发放批次</span></el-button>
        <el-button
          type="primary"
          class="handle-del mr30 btn_hand"
          @click="fafangNow"
        ><img
            src="../../assets/img/function_icon/fafang.png"
            alt=""
            style="vertical-align: middle; margin-right: 5px"
          /><span style="vertical-align: middle">发放</span></el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
        id="outTable"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="序号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="idNum"
          label="身份证号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="busName"
          label="企业名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="补贴类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="补贴金额"
          align="center"
        ></el-table-column>
        <el-table-column
          label="申请状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.applyState === '启用' ? 'success' : scope.row.applyState === '禁用' ? 'danger' : ''">{{
                            scope.row.applyState
                        }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="allCount"
          label="总发放批次"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="grantCount"
          label="当前已发放"
          align="center"
        ></el-table-column>
        <el-table-column
          label="发放状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.grantState === '启用' ? 'success' : scope.row.grantState === '禁用' ? 'danger' : ''">{{
                            scope.row.grantState
                        }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="interTime"
          label="导入时间"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleSee(scope.$index, scope.row)"
            >查看</el-button>
            <!-- <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 查看弹出框 -->
    <el-dialog
      title="查看"
      :visible.sync="seeanle"
      width="30%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <div class="mb20 seeItem">
          <span>姓名</span>
          <span>{{ form.name }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>身份证号</span>
          <span>{{ form.idNum }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>企业名称</span>
          <span>{{ form.busName }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>补贴类型</span>
          <span>{{ form.type }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>补贴金额</span>
          <span>{{ form.money }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>所属类型</span>
          <span>{{ form.type }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>申请状态</span>
          <span>{{ form.applyState }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>总发放批次</span>
          <span>{{ form.allCount }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>当前已发放</span>
          <span>{{ form.grantCount }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>发放状态</span>
          <span>{{ form.grantState }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>导入时间</span>
          <span>{{ form.interTime }}</span>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="seeanle = false"
          class="mr30"
        >确 定</el-button>
        <el-button @click="seeanle = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 修改总发放批次 -->
    <el-dialog
      title="修改总发放批次"
      :visible.sync="allFlag"
      width="30%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <el-form-item
          label="补贴类型"
          class="mb20"
        >
          <el-select
            v-model="form.type"
            placeholder="请选择"
          >
            <el-option
              label="启用"
              value="启用"
            ></el-option>
            <el-option
              label="禁用"
              value="禁用"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="发放批次"
          class="mb20"
        >
          <el-input v-model="form.allCount"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="allFlag = false"
          class="mr30"
        >确 定</el-button>
        <el-button @click="allFlag = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 发放 -->
    <el-dialog
      title="发放"
      :visible.sync="doFlag"
      width="70%"
    >
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
        id="outTable"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="序号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="idNum"
          label="身份证号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="补贴类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="补贴金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="已发放金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="银行名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cardNum"
          label="人才卡卡号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="grantCount"
          label="发放金额"
          align="center"
        ></el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="doFlag = false"
          class="mr30"
        >发  放</el-button>
        <el-button @click="doFlag = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            seeanle: false,
            allFlag: false,
            doFlag:false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            formInline: {
                user: '',
                region: ''
            },
            switchFlag: true,
            switchCloseFlag: false,
            psw: '',
            pswAgain: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then((res) => {
                this.tableData = res.declareList;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },

        // 查看操作
        handleSee(index, row) {
            this.idx = index;
            this.form = row;
            this.seeanle = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 导出操作
        exportExcel() {
            var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
            var wb = XLSX.utils.table_to_book(document.querySelector('#outTable'), xlsxParam); //outTable为列表id
            var wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream;charset=utf-8' }), 'sheetjs.xlsx');
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout);
            }
            return wbout;
        },
        // 修改总批次
        xiugaiAll() {
            this.allFlag = true;
        },
        fafangNow(){
            this.doFlag = true;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px !important;
}
.mr30 {
    margin-right: 30px !important;
}
.mb20 {
    margin-bottom: 20px !important;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.searchMouder {
    background: #fff;
    padding: 30px;
    margin-bottom: 10px;
}

/deep/ .el-form-item--small.el-form-item {
    margin: 0;
}
/deep/ .el-dialog__header {
    background: #eee;
}
/deep/ .el-dialog__footer {
    background: #eee;
    text-align: center;
}
/deep/ .el-select {
    display: block;
}
/deep/.el-switch__core {
    width: 30px !important;
    height: 16px;
}
/deep/.el-switch__core:after {
    width: 12px;
    height: 12px;
}
/deep/.el-switch.is-checked .el-switch__core::after {
    margin-left: -13px;
}
/deep/.el-switch__label--right {
    color: #7d7e81;
}
/deep/.el-switch {
    height: 17px;
    border-radius: 3px;
}
/deep/.el-input--suffix .el-input__inner {
    padding: 0 15px;
}
.fr {
    float: right;
}
.refresh {
    background: #d3e2fb;
    border-color: #d3e2fb;
    color: #000;
}
.btn_hand {
    background: #e8eefc;
    color: #7d7e81;
    padding: 6px 12px;
    border: none;
}
.seeItem {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}
</style>
