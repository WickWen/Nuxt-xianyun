<template>
  <div>机票页</div>
</template>

<script>
export default {
  mounted() {
    this.getFlightsList();
  },
  methods: {
    getFlightsList() {
      // 能够获取到 url 上面带过来的参数
      console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
      });
      
    }
  }
};
</script>

<style>
</style>