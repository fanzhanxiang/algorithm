<template>
  <Page :total="totalPage*20" :page-size='20' show-elevator @on-change='changePages'></Page>
</template>
<script>
export default {
  props: ['total-page'],
  data() {
    return {
      total: 100
    }
  },
  methods: {
    changePages: function(data) {
      this.$emit('changePage', data)
    }
  },
  created: function() {}
}
</script>