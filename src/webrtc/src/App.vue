<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item
          v-for="(item, i) in menuItems"
          :key="i"
          :index="i + ''"
          @click="handleMenuClick(item)">{{item.text}}</el-menu-item>
      </el-menu>
      <a href="https://github.com/capricorncd/webrtc" target="_blank" class="github-link">
        <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" fill="#fff" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
      </a>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      const menuItems = [
        { path: '/', text: 'Home' },
        { path: '/peer-connection', text: 'PeerConnection' },
        { path: '/live', text: 'Live' },
        { path: '/chat-room', text: 'ChatRoom' }
      ]
      const path = this.$route.path
      return {
        activeIndex: menuItems.findIndex(item => item.path === path) + '',
        menuItems
      }
    },
    methods: {
      handleMenuClick(item) {
        this.$router.push(item.path)
      }
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .el-header {
    position: relative;
    background: #545c64;
    .github-link {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      opacity: 0.6;
      font-size: 0;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>
