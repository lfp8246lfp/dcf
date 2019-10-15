<template>

<div class="login">
  <div class="head">
    <img src="../../../static/images/logoImg.png" alt="">
  </div>
  <div class="lgbox">
    <router-view></router-view>
  </div>
</div>

</template>

<script>

export default {
    data () {
      return {}
    },
    methods: {

    }
};
</script>


<style lang="scss" scoped>

.login{
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background: url("../../../static/images/loginbg.jpg") no-repeat;
  background-size: 100% 100%;
  .head {
    position: absolute;
    left: 2.61rem;
    top: 1.36rem;
  }
  .lgbox{
    width: 9.4rem;
    margin: 2.6rem 2.4rem;
    box-sizing: border-box;
    padding: 0.78rem;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
  }
}

</style>

