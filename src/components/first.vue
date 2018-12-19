/* eslint-disable */
<style scoped>
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
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="layout-logo"></div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" @on-select="menuSelect">
            <Submenu name="RdTool">
              <template slot="title">
                <Icon type="md-construct"/>RdTool
              </template>
              <MenuItem name="Redis">Redis</MenuItem>
              <MenuItem name="ES">ES</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
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
        <Layout :style="{padding: '0 10px 10px'}">
          <Content :style="{padding: '10px', minHeight: '280px', background: '#fff'}">
                <router-view></router-view>
            <Layout v-if="tabs.Redis">
              <Form
                ref="redisSearch"
                :model="redisSearch"
                :label-width="80"
                :rules="ruleInline"
                inline
              >
                <FormItem label="RedisKey:" prop="redisKey">
                  <Input placeholder="Enter Key" v-model="redisSearch.redisKey" type="text"/>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    icon="ios-search"
                    @click="searchRedisSubmit('redisSearch')"
                  >Search</Button>
                </FormItem>
              </Form>
              <template>
                <Row :style="{ height: '450px'}">
                  <Col span="10">
                    <Card>
                      <Form
                        ref="redisUpdate"
                        :model="redisResult"
                        :label-width="150"
                        :rules="redisResultRule"
                        inline
                      >
                        <FormItem label="RedisKey:" prop="redisKey">
                          <Input
                            placeholder="Enter Key"
                            v-model="redisResult.redisKey"
                            disabled
                            type="text"
                          />
                        </FormItem>
                        <FormItem label="RedisValue:" prop="redisValue">
                          <Input
                            placeholder="Enter Key"
                            v-model="redisResult.redisValue"
                            type="text"
                          />
                        </FormItem>
                        <FormItem label="RedisExpireSeconds:" prop="redisExpireSeconds">
                          <InputNumber :min="1" v-model="redisResult.redisExpireSeconds"></InputNumber>
                        </FormItem>
                        <FormItem>
                          <Button
                            type="primary"
                            icon="ios-compass-outline"
                            @click="updateRedis('redisUpdate')"
                          >Update</Button>
                        </FormItem>
                      </Form>
                    </Card>
                  </Col>
                  <Col span="10" offset="2">
                    <Card>
                      <Form
                        ref="redisInsert"
                        :model="redisInsert"
                        :label-width="150"
                        :rules="redisResultRule"
                        inline
                      >
                        <FormItem label="RedisKey:" prop="redisKey">
                          <Input
                            placeholder="Enter Key"
                            v-model="redisInsert.redisKey"
                            type="text"
                          />
                        </FormItem>
                        <FormItem label="RedisValue:" prop="redisValue">
                          <Input
                            placeholder="Enter Key"
                            v-model="redisInsert.redisValue"
                            type="text"
                          />
                        </FormItem>
                        <FormItem label="RedisExpireSeconds:" prop="redisExpireSeconds">
                          <InputNumber :min="1" v-model="redisInsert.redisExpireSeconds"></InputNumber>
                        </FormItem>
                        <FormItem>
                          <Button
                            type="primary"
                            icon="ios-add"
                            @click="insertRedis('redisInsert')"
                          >Insert</Button>
                        </FormItem>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </template>
            </Layout>
            <Layout v-if="tabs.ES">
              <Form ref="esSearch" :model="esSearch" :label-width="80" :rules="esRule" inline>
                <FormItem label="ESKey:" prop="type">
                  <Select v-model="esSearch.type" style="width:200px" @on-change="esTypeChange">
                    <Option value="searchBusinessInfo">商家</Option>
                    <Option value="searchPositionInfo">职位</Option>
                  </Select>
                </FormItem>
                <FormItem label="ESKey:" prop="key">
                  <Input placeholder="Enter Key" v-model="esSearch.key" type="text"/>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    icon="ios-search"
                    @click="searchESSubmit('esSearch')"
                  >Search</Button>
                </FormItem>
                <FormItem v-if="esSearch.button">
                  <Button
                    type="primary"
                    icon="ios-search"
                    @click="sysPosition('esSearch')"
                  >SysPosition</Button>
                </FormItem>
              </Form>
              <Card>
                <div style="white-space:normal; word-break:break-all; word-wrap:break-word; ">
                  <pre>{{esResult.value}}</pre>
                </div>
              </Card>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </Layout>
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
      },
      esSearch: {
        key: "",
        type: ""
      },
      redisSearch: {
        redisKey: "",
        button: ""
      },
      esResult: {
        value: ""
      },
      redisResult: {
        redisKey: "",
        redisValue: "",
        redisExpireSeconds: 3600
      },
      redisInsert: {
        redisKey: "",
        redisValue: "",
        redisExpireSeconds: 3600
      },
      ruleInline: {
        redisKey: [
          {
            required: true,
            message: "Please enter redisKey",
            trigger: "change"
          }
        ]
      },
      esRule: {
        type: [
          { required: true, message: "Please enter type", trigger: "change" }
        ],
        key: [
          { required: true, message: "Please enter key", trigger: "change" }
        ]
      },
      redisResultRule: {
        redisKey: [
          { required: true, message: "Please enter redisKey", trigger: "blur" }
        ],
        redisValue: [
          {
            required: true,
            message: "Please enter redisValue",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    menuSelect(name) {
       this.$router.push({ path: name })
    },
    esTypeChange(name) {
      if (name == "searchPositionInfo") {
        this.esSearch.button = true;
      } else {
        this.esSearch.button = false;
      }
    },
    searchESSubmit(name) {
      let _this = this;
      _this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .get("/development/es/" + _this.esSearch.type, {
              params: {
                key: _this.esSearch.key
              }
            })
            .then(function(response) {
              _this.esResult.value = response.data.data;
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    sysPosition(name) {
      let _this = this;
      _this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .get("/development/es/synPositionInfo", {
              params: {
                positionId: _this.esSearch.key
              }
            })
            .then(function(response) {
              _this.esResult.value = response.data.data;
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    searchRedisSubmit(name) {
      let _this = this;
      _this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .get("/development/redis/search", {
              params: {
                redisKey: _this.redisSearch.redisKey
              }
            })
            .then(function(response) {
              _this.redisResult.redisValue = response.data.data.redisValue;
              _this.redisResult.redisKey = response.data.data.redisKey;
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    updateRedis(name) {
      let _this = this;
      _this.$refs[name].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append("redisKey", _this.redisResult.redisKey);
          params.append("redisValue", _this.redisResult.redisValue);
          params.append(
            "redisExpireSeconds",
            _this.redisResult.redisExpireSeconds
          );
          this.$http({
            method: "post",
            url: "/development/redis/update",
            data: params
          })
            .then(function(response) {
              if (response.status === 200) {
                _this.redisResult.redisValue = response.data.data.redisValue;
                _this.redisResult.redisKey = response.data.data.redisKey;
                _this.$Message.success("修改成功");
              } else {
                _this.$Message.error("修改失败");
              }

              console.log(response);
            })
            .catch(function(error) {
              _this.$Message.error("修改失败");
              console.log(error);
            });
        } else {
          _this.$Message.error("修改失败");
        }
      });
    },
    insertRedis(name) {
      let _this = this;
      _this.$refs[name].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append("redisKey", _this.redisInsert.redisKey);
          params.append("redisValue", _this.redisInsert.redisValue);
          params.append(
            "redisExpireSeconds",
            _this.redisInsert.redisExpireSeconds
          );
          this.$http({
            method: "post",
            url: "/development/redis/insert",
            data: params
          })
            .then(function(response) {
              if (response.status === 200) {
                _this.redisInsert.redisValue = response.data.data.redisValue;
                _this.redisInsert.redisKey = response.data.data.redisKey;
                _this.$Message.success("新增成功");
              } else {
                _this.$Message.error("新增失败");
              }

              console.log(response);
            })
            .catch(function(error) {
              _this.$Message.error("新增失败");
              console.log(error);
            });
        } else {
          _this.$Message.error("新增失败");
        }
      });
    }
  }
};
</script>