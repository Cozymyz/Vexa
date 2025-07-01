<!--
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:12:56
 * @LastEditTime: 2025-07-01 17:20:39
 * @Description: 
-->
<template>
	<div class="app-container">
		<el-container>
			<!-- 侧边栏 -->
			<el-aside style="width: 100%;">
				<!-- <div class="toggle-button" @click="toggleCollapse">|||</div> -->
				<!-- 侧边栏菜单区域 -->
				<el-menu
					background-color="#2d3a4b"
					text-color="#fff"
					active-text-color="#409EFF"
					unique-opened
 					router
					mode="horizontal"
				>
					<el-menu-item>
						<el-icon color="#fff"><Menu /></el-icon>
						<span @click="openDrawer">ALL</span>
					</el-menu-item>
					<el-menu-item index="/test">test</el-menu-item>
					<el-menu-item index="/admin">Help Center</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 右侧内容主体 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
				<!-- <el-drawer
					v-model="drawer"
					title="Menu"
					direction="ltr"
					:with-header="false"
				>
					<el-menu
						text-color="#000"
						active-text-color="#409EFF"
						unique-opened
						router
					>
						<el-menu-item
							v-for="group in menuGroups" 
							:key="group.groupId"
          					:index="group.groupId.toString()"
						>
						 	<span>{{ group.groupName }}</span>
						</el-menu-item>
					</el-menu>
				</el-drawer> -->
				
				<!-- Dynamically loading components -->
				<component
					:is="menuGroupComponent"
					v-if="drawer"
					v-model:visible="drawer"
					:ref="menuGroupComponentRef"
				/>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

const drawer = ref(false)
const menuGroupComponent = ref(null)
const menuGroupComponentRef = ref(null)

const openDrawer = async () => {
  drawer.value = true
  if (!menuGroupComponent.value) {
    menuGroupComponent.value = defineAsyncComponent(() => 
      import('@/components/MenuGroup.vue')
    )
  }
  await nextTick()
  if (menuGroupComponentRef.value?.fetchMenuGroups) {
    menuGroupComponentRef.value.fetchMenuGroups()
  }
}
</script>

<style>
	.el-main{
		padding: 0 20px 0 20px;
		height: 100%;
	}
	.app-container{
		height: 100%;
		overflow: hidden;
	}
	.el-container{
		height: 100%;
	}
</style>
