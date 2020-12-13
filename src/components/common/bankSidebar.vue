<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#fff"
            text-color="#bfcbd9"
            active-text-color="#52a3ff"
            unique-opened
            router
            
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <!-- <img style="width: 16px; height: 16px; margin-right: 10px" :src="item.icon" alt="" /> -->
                            <i :class="item.icon"></i>
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
                        <!-- <img style="width: 16px; height: 16px; margin-right: 10px" :src="item.icon" alt="" /> -->
                        <i :class="item.icon"></i>
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
                    icon: "el-icon-lroleyouhuizhengce",
                    index: 'discount',
                    title: '优惠政策'
                },
                {
                    icon: "el-icon-lrolebanqia",
                    index: 'makeCard',
                    title: '办卡处理'
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            console.log("adwawidjalwjdlaj")
            return this.$route.path.replace('/bank/', '');
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
/deep/.el-menu-item{
    padding-left: 40px !important;
    height: 52px;
    line-height: 52px;
    background: #fff!important;
}
/deep/.el-menu-item.is-active {
   background: #f1f8ff !important;
}
</style>
