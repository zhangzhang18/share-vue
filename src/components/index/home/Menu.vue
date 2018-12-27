/* eslint-disable */
<template>
  <div>
    <Sider hide-trigger :style="{background: '#fff'}">
      <Menu theme="light" width="auto" @on-select="menuSelect">
        <Submenu name="RdTool">
          <template slot="title">
            <Icon type="md-construct"/>RdTool
          </template>
          <MenuItem name="Redis">Redis</MenuItem>
          <MenuItem name="ES">ES</MenuItem>
        </Submenu>
        <Submenu name="Example">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>Item 2
          </template>
          <MenuItem name="Vue">VUE分享</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-paper"></Icon>Item 4
          </template>
          <MenuItem name="4-1">Option 1</MenuItem>
          <MenuItem name="4-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      tabs: {
        Redis: "",
        ES: ""
      }
    };
  },
  methods: {
    menuSelect(name) {
      this.$router.push({ path: name });
    }
  }
};
</script>