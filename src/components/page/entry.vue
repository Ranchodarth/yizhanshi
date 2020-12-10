<template>
  <div>
    <div class="crumbs">
      <div class="inter_row">
        <p class="moudleTitle">快速入口</p>
        <div class="row_main">
          <div
            class="main_item mr10"
            v-for="(item,index) in interList"
            :key="index"
          >
            <img
              class="mr10"
              :src="item.img"
              alt=""
            >
            <span>{{item.txt}}</span>
          </div>
        </div>
      </div>
      <div class="inter_row">
        <p class="moudleTitle">补贴平台</p>
        <div class="row_main">
          <div
            class="main_list mr10"
            v-for="(item,index) in subsidyList"
            :key="index"
          >
            <div class="list_top">
              <span>{{item.title}}</span>
              <img
                :src="item.img"
                alt=""
              >
            </div>
            <!-- <p style="font-size:14px;">{{item.desc}}</p> -->
          </div>
          <div
            class="main_list mr10"
            style="height:0;width:290px;background:#f2f6fb;"
          ></div>
          <div
            class="main_list mr10"
            style="height:0;width:290px;background:#f2f6fb;"
          ></div>
          <div
            class="main_list mr10"
            style="height:0;width:290px;background:#f2f6fb;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            interList: [
                {
                    img: require('../../assets/img/interSearch.png'),
                    txt: '申报查询'
                },
                {
                    img: require('../../assets/img/interBank.png'),
                    txt: '银行管理'
                },
                {
                    img: require('../../assets/img/interCard.png'),
                    txt: '银行卡汇总'
                },
                {
                    img: require('../../assets/img/interSubsidy.png'),
                    txt: '补贴发放'
                }
            ],
            subsidyList: [
                {
                    title: '人才项目需求库及网上申报',
                    img: require('../../assets/img/interField.png'),
                    desc:
                        '人才项目需求库及网上申报是一种很好的网上申报，具体是怎么好的申报这个就是很好，到底怎么好我实在编不下去了。为了凑够三行只能再打几个字了……'
                },
                {
                    title: '大学生见实习补贴',
                    img: require('../../assets/img/interSx.png'),
                    desc: ''
                },
                {
                    title: '姑苏重点产业紧缺人才计划',
                    img: require('../../assets/img/interGs.png'),
                    desc: ''
                },
                {
                    title: '乐居工程',
                    img: require('../../assets/img/interLj.png'),
                    desc: ''
                },
                {
                    title: '优秀人才贡献奖',
                    img: require('../../assets/img/interYx.png'),
                    desc: ''
                },
                {
                    title: '高等院校、科研院所引财补贴',
                    img: require('../../assets/img/interYj.png'),
                    desc: ''
                },
                {
                    title: '企业通过人才中介机构招财引智的引财补贴',
                    img: require('../../assets/img/interQy.png'),
                    desc: ''
                }
            ]
        };
    },
    created() {},
    methods: {}
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
.inter_row {
}
.row_main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.main_item {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    width: 240px;
    flex: 0 0 20%;
}
.main_item span {
    color: #323b6e;
    font-weight: 700;
}
.main_list {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 240px;
    margin-bottom: 20px;
    flex: 0 0 20%;
}
.list_top {
    display: flex;
    align-items: center;
}
.list_top span {
    text-align: center;
    color: 838ea5;
    font-weight: 600;
    margin-right: 20px;
    /* font-size: 14px; */
}
.list_top img {
}
.moudleTitle {
    /* border-bottom: 5px solid #d2e2f8; */
    font-weight: 700;
    font-style: 18px;
    margin: 30px 0 30px 20px;
    position: relative;
    display: inline-block;
    padding: 0 6px;
}
.moudleTitle::after {
    content: '';
    background: RGBA(210, 226, 248, 0.8);
    position: absolute;
    left: 0;
    height: 6px;
    bottom: 0;
    width: 100%;
}
</style>
