<template>
 <div>
  这里是排名页面
 </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  mounted () {},
  created () {
    this.axios.get('http://localhost:8081/raceHot').then((res) => {
      // const raceHotData = res.data.data
    })
    this.axios.get('http://localhost:8081/raceList').then((res) => {
      // const raceListData = res.data.data
    })
  }
}
</script>
