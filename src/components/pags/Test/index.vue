<template>
  <div>
    <input v-validate="'required|pwd'" name="密码" type="text">
    <span>{{errors.first('密码')}}</span>
  </div>
</template>

<script>

export default {
name:'Test',

methods:{

}
}
</script>

<style>

</style>