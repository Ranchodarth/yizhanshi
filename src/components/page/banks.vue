<template>
    <div>
        <div class="crumbs"></div>
        <div class="searchMouder">
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
                <el-form-item label="银行名称" class="mr10">
                    <el-input v-model="form.bankName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                    <el-button type="primary" icon="el-icon-refresh" class="refresh">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr30 btn_hand" @click="addRole"
                    ><img src="../../assets/img/function_icon/add.png" alt="" style="vertical-align: middle; margin-right: 5px" /><span
                        style="vertical-align: middle"
                        >新增</span
                    ></el-button
                >
                <el-switch class="btn_hand mr30" v-model="switchFlag" active-text="启用" inactive-text=""> </el-switch>
                <!-- <el-switch
          class="btn_hand mr30"
          v-model="switchCloseFlag"
          active-text="冻结"
          inactive-text=""
        >
        </el-switch> -->
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="bankName" label="银行名称" align="center"></el-table-column>
                <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
                <el-table-column prop="phoneNum" label="联系方式" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '启用' ? 'success' : scope.row.state === '禁用' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="creater" label="创建人" align="center"></el-table-column>
                <el-table-column prop="date" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addFlag" width="30%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="银行名称" class="mb20">
                    <el-input v-model="form.bankName"></el-input>
                </el-form-item>

                <el-form-item label="联系人" class="mb20">
                    <el-input v-model="form.contacts"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" class="mb20">
                    <el-input v-model="form.phoneNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addFlag = false" class="mr30">确 定</el-button>
                <el-button @click="addFlag = false">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="银行名称" class="mb20">
                    <el-input v-model="form.bankName"></el-input>
                </el-form-item>

                <el-form-item label="联系人" class="mb20">
                    <el-input v-model="form.contacts"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" class="mb20">
                    <el-input v-model="form.phoneNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit" class="mr30">确 定</el-button>
                <el-button @click="editVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
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
            addFlag: false,
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
                this.tableData = res.banksList;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 新增操作
        addRole() {
            this.addFlag = true;
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
</style>
