<template>
  <div class="content">
    <div class="content-tab">
      <Layout :style="{ height: '450px'}">
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
            <Button type="primary" icon="ios-search" @click="searchESSubmit('esSearch')">Search</Button>
          </FormItem>
          <FormItem v-if="esSearch.button">
            <Button type="primary" icon="ios-search" @click="sysPosition('esSearch')">SysPosition</Button>
          </FormItem>
        </Form>
        <Card>
          <div style="white-space:normal; word-break:break-all; word-wrap:break-word; ">
            <pre>{{esResult.value}}</pre>
          </div>
        </Card>
      </Layout>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      esSearch: {
        key: "",
        type: ""
      },
      esResult: {
        value: ""
      },
      esRule: {
        type: [
          { required: true, message: "Please enter type", trigger: "change" }
        ],
        key: [
          { required: true, message: "Please enter key", trigger: "change" }
        ]
      }
    };
  },
  methods: {
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
    }
  }
};
</script>