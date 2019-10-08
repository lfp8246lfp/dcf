<template>
  <div>
    <el-dialog :title="title" :visible.sync="eventDialog" width="40%" :before-close="eventClose">
      <p class="pre">
        Being Commnuication({{time}})
        <span class="color:red;">{{warnMsg}}</span>
      </p>
      <el-progress :percentage="percent" :stroke-width="14"></el-progress>
      <p class="pre">{{$t('common.task')}}:{{dialogInfo.task}} {{$t('sitemanage.success')}}:{{dialogInfo.success}} {{$t('common.failure')}}:{{dialogInfo.error}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eventClose" size="small">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="eventClose" size="small">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "eventDialog", "percent", "warnMsg","dialogInfo","time"],
  components: {},
  data() {
    return {
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    eventClose() {
      this.$emit("changeDialog", false);
    },
    
  }
};
</script>

<style scoped lang="scss">
</style>
