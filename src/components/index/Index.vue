
<template>
 <Layout>
      <Header>
        <div class="layout-logo"></div>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu></Menu>
        </Sider>
        <Content>
          <router-view></router-view>
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
</template>

<script>
import Menu from "../index/home/Menu.vue";
export default {
  components: {
    Menu
  }
};
</script>

<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
</style>
