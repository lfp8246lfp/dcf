<template>
  <div class="tree" ref="tree">
    <i class="el-icon-s-fold place" style="font-size:0.375rem;" @click="change" ref="icon"></i>
    <transition name="fade">
      <el-tabs v-show="show" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Distribution" name="first">
          <el-input
            placeholder="Search"
            suffix-icon="el-icon-search"
            v-model="searchValue"
            size="mini"
            @keyup.enter.native="onSubmit"
            style="width:100%;"
          ></el-input>
          <el-tree
            style="width:100%;margin-top:10px;"
            :props="defaultProps"
            ref="treeNodes"
            :data="treeData"
            @node-click="nodeClick"
            :expand-on-click-node="false"
            :highlight-current="true"
            :default-expand-all="true"
          >
            <span slot-scope="{ node, data }" class="treecont">
              <img :src="data|getPostTypeIcon" alt />
              <span style="padding-left: 4px;" class="active" @insertAfter="node">{{node.label}}</span>
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="Search" name="second">
          <el-input
            placeholder="Search"
            suffix-icon="el-icon-search"
            v-model="searchValue"
            size="mini"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-tab-pane>
      </el-tabs>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      activeName: "first",
      show: true,
      defaultProps: {
        children: "children",
        label: "disc"
      },
      searchValue: "",
      treeData: [],
      nodekey: 0,
      addCode: false
    };
  },
  computed: {
    // ...mapGetters('tree',['treeData'])
  },
  created() {},
  mounted() {
    this.getArchiveList();
    this.addTree();
  },
  methods: {
    // 标签切换
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    // tree点击
    nodeClick(data, node) {
      this.$store.commit("tree/CHANGEINDEX", node.data.objtype);
      this.$store.commit("tree/CHANGEID", node.data.objid);
      this.$store.commit("tree/CHANGENODEDATA", JSON.parse(JSON.stringify(node.data)));
      localStorage.setItem("nodeData", JSON.stringify(node.data));
      this.nodekey = node;
      this.nodeExpand(data, node);
    },
    // tree展开
    nodeExpand(data, node) {
      if (!data.children) {
        // console.log('nochildren')
        this.$set(data, "children", []);
        this.$request("getChildrenByObject", {
          params: {
            objid: node.data.objid,
            objtype: node.data.objtype,
            treetype: 1
          }
        }).then(res => {
          if (res.data.listitem) {
            for (let i in res.data.listitem) {
              data.children.push(res.data.listitem[i]);
            }
          }
        });
      } else {
        // console.log('haschildren')
        if(this.addCode){
          this.$request("getChildrenByObject", {
            params: {
              objid: node.data.objid,
              objtype: node.data.objtype,
              treetype: 1
            }
          }).then(res => {
            if (res.data.listitem) {
                data.children = [];
              for (let i in res.data.listitem) {
                data.children.push(res.data.listitem[i]);
              }
              this.addCode=false;
            }
          });
        }else{
          this.$request("getChildrenByObject", {
            params: {
              objid: node.data.objid,
              objtype: node.data.objtype,
              treetype: 1
            }
          }).then(res => {
            if (res.data.listitem) {
              for (let i in res.data.listitem) {
                if ((data.children[i].objid+data.children[i].objtype) != (res.data.listitem[i].objid+res.data.listitem[i].objtype)) {
                  data.children.push(res.data.listitem[i]);
                }
              }
            }
        });
        }
      }
    },
    // icon点击
    change() {
      if (this.show) {
        this.$refs.tree.classList.add("treeActive");
        this.$refs.icon.classList.remove("el-icon-s-fold");
        this.$refs.icon.classList.add("el-icon-s-unfold");
      } else {
        this.$refs.tree.classList.remove("treeActive");
        this.$refs.icon.classList.add("el-icon-s-fold");
        this.$refs.icon.classList.remove("el-icon-s-unfold");
      }
      this.show = !this.show;
    },
    getArchiveList() {
      this.$request("getChildrenByObject", {
        params: {
          objid: 1,
          objtype: 98,
          treetype: 1
        }
      }).then(res => {
        this.treeData=res.data.listitem;
      });
    },
    addTree() {
      addTree.$on("addTree", data => {
        this.addCode=true;
        this.nodeClick(this.nodekey.data,this.nodekey)
      });
    },
  }
};
</script>

<style scoped lang="scss">
.tree {
  min-width: 4.69rem;
  min-height: 80vh;
  background: #fff;
  padding: 0 10px;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  .place {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 33;
  }
  transition: width 0.5s;
  .treecont {
    line-height: 100%;
    img {
      vertical-align: middle;
    }
  }
}
.treeActive {
  min-width: 0.7rem;
}
</style>
