<template>
    <div>
        <div class="crumbs"></div>
        <div class="searchMouder">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-col :span="4">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
                    </el-col>
                    <el-col :span="4" class="fr">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                        <el-button type="primary" icon="el-icon-refresh" class="refresh">重置</el-button>
                    </el-col>
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
                <el-button type="primary" @click="delAllSelection" class="btn_hand"
                    ><img src="../../assets/img/function_icon/delete.png" alt="" style="vertical-align: middle; margin-right: 5px" /><span
                        style="vertical-align: middle"
                        >删除</span
                    ></el-button
                >
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                :row-class-name="tableRowClassName"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                <el-table-column label="角色描述" align="center">
                    <template slot-scope="scope">{{ scope.row.desc }}</template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '启用' ? 'success' : scope.row.state === '禁用' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="creater" label="创建人" align="center"></el-table-column>
                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleSee(scope.$index, scope.row)">查看</el-button>
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
                <el-form-item label="角色名称" class="mb20">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" class="mb20">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="状态" class="mb20">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="禁用" value="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建人" class="mb20">
                    <el-input v-model="form.creater"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" class="mb20">
                    <el-input v-model="form.date"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addFlag = false" class="mr30">确 定</el-button>
                <el-button @click="addFlag = false">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 查看弹出框 -->
        <el-dialog title="查看" :visible.sync="seeanle" width="30%">
            <el-form ref="form" :model="form" label-width="130px">
                <div class="mb20 seeItem">
                    <span>角色名称</span>
                    <span>{{ form.name }}</span>
                </div>
                <div class="mb20 seeItem">
                    <span>角色描述</span>
                    <span>{{ form.desc }}</span>
                </div>
                <div class="mb20 seeItem">
                    <span>状态</span>
                    <span>{{ form.state }}</span>
                </div>
                <div class="mb20 seeItem">
                    <span>创建人</span>
                    <span>{{ form.creater }}</span>
                </div>
                <div class="mb20 seeItem">
                    <span>注册时间</span>
                    <span>{{ form.date }}</span>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="seeanle = false" class="mr30">确 定</el-button>
                <el-button @click="seeanle = false">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="角色名称" class="mb20">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" class="mb20">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="状态" class="mb20">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="禁用" value="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建人" class="mb20">
                    <el-input v-model="form.creater"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" class="mb20">
                    <el-input v-model="form.date"></el-input>
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
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then((res) => {
                this.tableData = res.roleList;
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
        // 新增操作
        addRole() {
            this.addFlag = true;
        },
        // 添加索引
        tableRowClassName(row, index) {
            // 给每条数据添加一个索引
            row.row.index = row.rowIndex;
        },
        // 删除操作
        delAllSelection() {
            //拿到选中的数据
            let val = this.multipleSelection;
            //如果选中数据存在
            if (val) {
                //将选中数据遍历
                val.forEach((val, index) => {
                    //遍历源数据
                    this.tableData.forEach((v, i) => {
                        //如果选中数据和源数据的某一条唯一标识符相等，删除对应的源数据
                        if (val.index === v.index) {
                            this.tableData.splice(i, 1);
                            this.$message.error(`删除了${val.name}`);
                        }
                    });
                });
            }
            //清除选中状态
            this.$refs.multipleTable.clearSelection();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 查看操作
        handleSee(index, row) {
            this.idx = index;
            this.form = row;
            this.seeanle = true;
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
    margin-right: 10px;
}
.mr30 {
    margin-right: 30px;
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
