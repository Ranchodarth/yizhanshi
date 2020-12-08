<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#fff"
            text-color="#bfcbd9"
            active-text-color="#fff"
            unique-opened
            router
            
        >
            <template v-for="item in items">
                <template v-if="item.subs" @click.native="keyi">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <img style="width: 16px; height: 16px; margin-right: 10px" :src="item.icon" alt="" />
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <img style="width: 16px; height: 16px; margin-right: 10px" :src="item.icon" alt="" />
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: require('../../assets/img/tab_icn/role.png'),
                    index: 'table',
                    title: '角色管理'
                },
                {
                    icon: require('../../assets/img/tab_icn/user.png'),
                    index: 'tabs',
                    title: '用户管理'
                },
                {
                    icon: require('../../assets/img/tab_icn/entry.png'),
                    index: '3',
                    title: '统一入口'
                },
                {
                    icon: require('../../assets/img/tab_icn/query.png'),
                    index: '4041',
                    title: '申报查询及处理'
                },
                {
                    icon: require('../../assets/img/tab_icn/talent.png'),
                    index: '4042',
                    title: '人才库'
                },
                {
                    icon: require('../../assets/img/tab_icn/bank.png'),
                    index: '6',
                    title: '银行管理'
                },
                {
                    icon: require('../../assets/img/tab_icn/card.png'),
                    index: '4043',
                    title: '银行卡汇总'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods:{
        keyi(){
            console.log("???")
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}

/deep/.el-menu-item.is-active {
   background-color: #1d6cec !important;
}
</style>
