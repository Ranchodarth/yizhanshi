<template>
  <div>
    <div class="crumbs"></div>
    <div class="searchMouder">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="84px"
      >
        <el-form-item
          label="申请人姓名"
          class="mr10"
        >
          <el-input
            v-model="form.bankName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="身份证号"
          class="mr10"
        >
          <el-input
            v-model="form.bankName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
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
          @click="exportExcel"
        ><img
            src="../../assets/img/bank/daochu.png"
            alt=""
            style="vertical-align: middle; margin-right: 5px"
          /><span style="vertical-align: middle">导出</span></el-button>
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
          prop="bankName"
          label="银行名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="contacts"
          label="申请人姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phoneNum"
          label="联系方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="idNum"
          label="身份证号"
          align="center"
        ></el-table-column>
        <el-table-column
          label="办卡状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === '启用' ? 'success' : scope.row.state === '禁用' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="creater"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="startDate"
          label="申请时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="creater"
          label="处理人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="FinisfDate"
          label="处理时间"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="handle-del mr30 btn_hand"
              @click="handleSee(scope.$index, scope.row)"
            ><img
                src="../../assets/img/bank/fenpei.png"
                alt=""
                style="vertical-align: middle; margin-right: 5px"
              /><span style="vertical-align: middle">分配</span></el-button>
            <el-button
              type="primary"
              class="handle-del mr30 btn_hand"
              @click="handleBanjie(scope.$index, scope.row)"
            ><img
                src="../../assets/img/bank/banjie.png"
                alt=""
                style="vertical-align: middle; margin-right: 5px"
              /><span style="vertical-align: middle">办结</span></el-button>
            <el-button
              type="primary"
              class="handle-del mr30 btn_hand"
              @click="handleTuihui(scope.$index, scope.row)"
            ><img
                src="../../assets/img/bank/tuihui.png"
                alt=""
                style="vertical-align: middle; margin-right: 5px"
              /><span style="vertical-align: middle">退回</span></el-button>
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

    <!-- 分配 -->
    <el-dialog
      title="分配"
      :visible.sync="seeanle"
      width="30%"
    >

      <el-form
        ref="form"
        :model="form"
        label-width=""
      >
        <div class="mb20 seeItem">
          <span>申请人姓名</span>
          <span>{{ form.contacts }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>身份证号</span>
          <span>{{ form.idNum }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>联系方式</span>
          <span>{{ form.phoneNum }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>申请状态</span>
          <span>{{ form.state }}</span>
        </div>

        <el-form-item
          label="客户经理"
          class="mb20 flex"
        >
          <el-input v-model="form.street"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码"
          class="mb20 flex"
        >
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <div class="mb20 seeItem">
          <span>分配日期</span>
          <span>2020-04-01 12:12:12</span>
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

    <!-- 办结 -->
    <el-dialog
      title="办结"
      :visible.sync="banjie"
      width="30%"
    >

      <el-form
        ref="form"
        :model="form"
        label-width=""
      >
        <div class="mb20 seeItem">
          <span>申请人姓名</span>
          <span>{{ form.contacts }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>身份证号</span>
          <span>{{ form.idNum }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>联系方式</span>
          <span>{{ form.phoneNum }}</span>
        </div>
        <div class="mb20 seeItem">
          <span>申请状态</span>
          <span>{{ form.state }}</span>
        </div>

        <el-form-item
          label="银行卡号"
          class="mb20 flex"
        >
          <el-input v-model="card"></el-input>
        </el-form-item>
        <div class="mb20 seeItem">
          <span>客户经理</span>
          <span>王珊</span>
        </div>
        <div class="mb20 seeItem">
          <span>手机号码</span>
          <span>13124232323</span>
        </div>
        <div class="mb20 seeItem">
          <span>办结日期</span>
          <span>2020-04-01 12:12:12</span>
        </div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="banjie = false"
          class="mr30"
        >确 定</el-button>
        <el-button @click="banjie = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 退回 -->
    <el-dialog
      title="退回"
      :visible.sync="tuihuiFlag"
      width="35%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width=""
        class="flex"
      >
        <span style="width:100px;">退回理由</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        >
        </el-input>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="tuihuiFlag = false"
          class="mr30"
        >确 定</el-button>
        <el-button @click="tuihuiFlag = false">取 消</el-button>
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
            banjie: false,
            tuihuiFlag: false,
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
            pswAgain: '',
            card: '622312141242141'
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then((res) => {
                this.tableData = res.cardsList;
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

        // 分配操作
        handleSee(index, row) {
            this.idx = index;
            this.form = row;
            this.seeanle = true;
        },
        // 办结操作
        handleBanjie(index, row) {
            this.idx = index;
            this.form = row;
            this.banjie = true;
        },
        // 退回操作
        handleTuihui(index, row) {
            this.idx = index;
            this.form = row;
            this.tuihuiFlag = true;
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
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
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
.flex {
    display: flex;
}
</style>
