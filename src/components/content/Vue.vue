<template>
  <div class="content">
    <div class="content-tab">
      <Layout :style="{ height: '450px'}">
        <div>{{msg}}</div>
      </Layout>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  created() {
    // this.msg = 'aa'
  }
};
</script>