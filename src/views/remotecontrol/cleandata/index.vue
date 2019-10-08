<template>
  <div class="routerbox point">
    <div class="cont" ref="cont">
      <h1>Electricity meter</h1>
      <div>
        <el-button type="success" @click="read">Clear All</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top:10px;"
        border
        height="10rem"
        :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
      >
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column prop="date" label="Index" width="100"></el-table-column>
        <el-table-column prop="name" label="Meter Name"></el-table-column>
        <el-table-column prop="name" label="Switch Status"></el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="eventDialog" width="40%" :before-close="eventClose">
      <p class="pre">Being Commnuication(00:04)</p>
      <el-progress :percentage="percent" :stroke-width="14"></el-progress>
      <p class="pre">Task:2 Success:1 Failure:0</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eventDialog = false">Cancel</el-button>
        <el-button type="primary" @click="eventDialog = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      tableData: [],
      title: "Read",
      eventDialog: false,
      percent: 0,
      formInline: {},
      configtype: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    read() {
      this.eventDialog = true;
    },
    write() {},

    eventClose() {
      this.eventDialog = false;
    },
    apply() {}
  }
};
</script>

<style  lang="scss" scoped>
.point {
  display: flex;
  .cont {
    width: 100%;
    box-sizing: border-box;
    padding: 0 9px;
    background: #fff;
  }
  .pre {
    font-weight: bold;
  }
  .bottom {
    background: #fafafa;
    border: 1px solid #eeeeee;
    padding: 20px;
  }
}
.tree {
  width: 4.69rem;
  min-height: 80vh;
  background: #fff;
  padding: 0 10px;
  border-right: 1px solid #eeeeee;
  position: relative;
  .place {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 33;
  }
  transition: width 0.5s;
}
.display {
  display: none;
  transition: 0.5s;
}
.treeActive {
  width: 0.4rem;
}
</style>
