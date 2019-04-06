<template>
 <div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1" @click="jumpToUser">用户</el-menu-item>
    <el-menu-item index="2" @click="jumpToAnswer">回答</el-menu-item>
    <el-menu-item index="3" @click="jumpToRace">排名</el-menu-item>
  </el-menu>
  <router-view/>
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    jumpToUser () {
      this.$router.push({path: '/user'})
    },
    jumpToRace () {
      this.$router.push({path: '/race'})
    },
    jumpToAnswer () {
      this.$router.push({path: '/answer'})
    }
  }
}
</script>
