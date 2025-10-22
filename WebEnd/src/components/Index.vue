<!--
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:12:56
 * @LastEditTime: 2025-10-23 01:34:43
 * @Description: 
-->
<template>
	<div class="app-container">
		<el-container>
			<!-- 右侧内容主体 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>

				<el-header>Vexa Demo</el-header>

				<el-row :gutter="30">
					<el-col :span="6" index="/test">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer1">
							<span>Vue Component 1</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer2">
							<span style="margin: auto;">Vue Component 2</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer3">
							<span style="margin: auto;">Vue Component 3</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer4">
							<span style="margin: auto;">Vue Component 4</span>
						</div>
					</el-col>
				</el-row>

				<!-- Dynamically loading components -->
				<component
					:is="vueComponent1"
					v-if="drawer1"
					v-model:visible="drawer1"
					:ref="vueComponent1"
				/>
				<component
					:is="vueComponent2"
					v-if="drawer2"
					v-model:visible="drawer2"
					:ref="vueComponent2"
				/>
				<component
					:is="vueComponent3"
					v-if="drawer3"
					v-model:visible="drawer3"
					:ref="vueComponent3"
				/>
				<component
					:is="vueComponent4"
					v-if="drawer4"
					v-model:visible="drawer4"
					:ref="vueComponent4"
				/>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

const drawer1 = ref(false)
const vueComponent1 = ref(null)

const drawer2 = ref(false)
const vueComponent2 = ref(null)

const drawer3 = ref(false)
const vueComponent3 = ref(null)

const drawer4 = ref(false)
const vueComponent4 = ref(null)

const openDrawer1 = async () => {
  drawer1.value = true
  if (!vueComponent1.value) {
    vueComponent1.value = defineAsyncComponent(() => 
      import('@/components/VueComponent1.vue')
    )
  }
}

const openDrawer2 = async () => {
  drawer2.value = true
  if (!vueComponent2.value) {
    vueComponent2.value = defineAsyncComponent(() => 
      import('@/components/VueComponent2.vue')
    )
  }
}

const openDrawer3 = async () => {
  drawer3.value = true
  if (!vueComponent3.value) {
    vueComponent3.value = defineAsyncComponent(() => 
      import('@/components/VueComponent3.vue')
    )
  }
}

const openDrawer4 = async () => {
  drawer4.value = true
  if (!vueComponent4.value) {
    vueComponent4.value = defineAsyncComponent(() => 
      import('@/components/vueComponent4.vue')
    )
  }
}

</script>

<style>
	.el-main{
		padding: 0 20px 0 20px;
		height: 100%;
	}
	.el-header{
		height: 12%;
		background-color: #2d3a4b;
		font-size: x-large;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.app-container{
		height: 100%;
		overflow: hidden;
	}
	.el-container{
		height: 100%;
	}
	.el-row {
		height: 35%;
		margin-top: 10%;
	}
	.el-row:last-child {
		margin-bottom: 0;
	}
	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.vuecomponent {
		height: 100%;
		margin: auto;
		box-shadow: var(--el-box-shadow-dark);
	}

	.vuecomponent>span {
		height: 50%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
</style>
