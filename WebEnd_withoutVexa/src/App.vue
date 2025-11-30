<!--
 * @Author: Meiyizhi
 * @Date: 2025-11-28 15:59:06
 * @LastEditTime: 2025-11-29 22:59:35
 * @Description: 
-->
<template>
      <router-view />
</template>

<script>
	export default {
	    name: 'App',
	    components: {},
	    setup(){ // 系统创建完成
	      let that = this;
	      console.log("=setup");
	      return {
	 
	      };
	    },
	    mounted() { // 组件初始化完成
	      let that = this;
	      console.log("=mounted");
	      //console.log(that.$refs.page_must.); // 访问子组件
	    },
	    updated() { // 视图更新
	      let that = this;
	      console.log("=updated");
	    },
	    unmounted() {
	      let that = this;
	      console.log("=unmounted");
	    },
	    methods: {
	 
	    }
	  }
	

// import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
	html, body{
		width: 100%;
		height: 100%;
		margin: 0;
	}
	#app {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  height: 100%;
	  /* margin-top: 60px; */
	}
</style>
