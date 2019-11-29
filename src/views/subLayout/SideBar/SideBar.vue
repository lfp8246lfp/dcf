<template>
  <el-aside width="50px;" class="el-aside">
    <el-menu
      default-active="index"
      :unique-opened="true"
      background-color="#20252B"
      text-color="rgb(179,181,182)"
      active-text-color="#b3b5b6"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :router="true">
      <el-menu-item
        v-for="item in list"
        :index="item.path"
        :key="item.path">
          <i :class="item.data.menu.icon"></i>
          <span slot="title">{{item.data.menu.title.split('.')[1] | titleFilter}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'SideBar',
    data () {
        return {
            list: [
              // {path: 'home', name: '首页'},
              // {path: 'archivesManage', name: '档案管理'},
              // {path: 'incomeManage', name: '收入管理'},
              // {path: 'incomeStatistics', name: '收入统计'},
              // {path: 'powerStatistics', name: '用能统计'},
              // {path: 'billManage', name: '账单管理'},
              // {path: 'valueAddService', name: '增值服务'},
              // {path: 'priceManage', name: '价格管理'},
            ]
        };
    },
    props: ['isCollapse'],
    computed: {
    // 点击菜单事件 返回路由
        activeMenu () {
            const route = this.$route;
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }
    },
    mounted () {
        this.getMenuList();
    },
    methods: {
        getMenuList () {
            this.$request('getMenuList', {HTTP_ACCESS_TOKEN: localStorage.getItem('HTTP_ACCESS_TOKEN')}).then(res => {
                // console.log('getMenuList', res)
                this.list = res.data.children[0].children
                localStorage.setItem('menu', JSON.stringify(this.list))
            })
        }
    },
    filters: {
      titleFilter(title) {
        switch (title) {
          case 'index':
            return '首页';
            break;
          case 'archivesmanage':
            return '档案管理';
            break;
          case 'incomemanage':
            return'收入管理';
            break;
          case 'incomestatistics':
            return '收入统计';
            break;
          case 'powerstatistics':
            return '历史数据';
            break;
          case 'billmanage':
            return '账单管理';
            break;
          case 'valueaddservice':
            return '增值服务';
            break;
          case 'pricemanage':
            return '价格管理';
            break;
          case 'manageunit':
            return '管理单位';
            break;
          case 'withdrawmanage':
            return '提现管理';
            break;
        }
      }
    }
};
</script>


<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
}
.el-aside {
  height: 100%;
  background-color: #20252B;
  padding-top: 30px;
  box-sizing: border-box;
}
.el-menu {
  border-right: 0;
}
.el-menu-item {
  font-size: 14px;
  height: 50px!important;
  line-height: 50px!important;
  padding-left: 14px;
  box-sizing: border-box;
  i {
    margin-left: -5px;
  }
}
.is-active {
  border-left: 2px solid rgb(45, 134,225);
  background-color: rgb(32,36,38);
}
// .active{
//   background:#0D141B;
// }
</style>