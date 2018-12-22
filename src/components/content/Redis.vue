<template>
  <div class="content">
    <div class="content-tab">
      <Layout>
        <Form ref="redisSearch" :model="redisSearch" :label-width="80" :rules="ruleInline" inline>
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
          <FormItem>
            <Button type="error" icon="ios-search" @click="deleteRedisSubmit('redisSearch')">Delete</Button>
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
                    <Input placeholder="Enter Key" v-model="redisResult.redisValue" type="text"/>
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
                    <Input placeholder="Enter Key" v-model="redisInsert.redisKey" type="text"/>
                  </FormItem>
                  <FormItem label="RedisValue:" prop="redisValue">
                    <Input placeholder="Enter Key" v-model="redisInsert.redisValue" type="text"/>
                  </FormItem>
                  <FormItem label="RedisExpireSeconds:" prop="redisExpireSeconds">
                    <InputNumber :min="1" v-model="redisInsert.redisExpireSeconds"></InputNumber>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" icon="ios-add" @click="insertRedis('redisInsert')">Insert</Button>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </Row>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      redisSearch: {
        redisKey: "",
        button: ""
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
          _this.$Message.success("Success!");
        } else {
          _this.$Message.error("Fail!");
        }
      });
    },
    deleteRedisSubmit(name) {
      let _this = this;
      _this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .get("/development/redis/delete", {
              params: {
                redisKey: _this.redisSearch.redisKey
              }
            })
            .then(function(response) {
              _this.$Message.success(
                "删除key:" +
                  response.data.data.redisKey +
                  ";result:" +
                  response.data.data.redisValue
              );
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          _this.$Message.error("Fail!");
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
