<template>
<!--这是 View-->
  <div>
      <h1>
       {{ message }}
      </h1>
     <input type="text" v-model="message"/>
  </div>

</template>

<script>
export default {

  data () {
       return {
          message: 'Hello World!'
      }
  },
}
</script>