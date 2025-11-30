<!--
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:12:56
 * @LastEditTime: 2025-11-29 23:00:27
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
							<span>Preferences View</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer2">
							<span style="margin: auto;">Shops</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer3">
							<span style="margin: auto;">Genres</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="vuecomponent grid-content ep-bg-purple" @click="openDrawer4">
							<span style="margin: auto;">Shops Near By</span>
						</div>
					</el-col>
				</el-row>

				<!-- Dynamically loading components -->
				<component
					:is="PreferencesView"
					v-if="drawer1"
					v-model:visible="drawer1"
					:ref="PreferencesView"
				/>
				<component
					:is="Shops"
					v-if="drawer2"
					v-model:visible="drawer2"
					:ref="Shops"
				/>
				<component
					:is="Genres"
					v-if="drawer3"
					v-model:visible="drawer3"
					:ref="Genres"
				/>
				<component
					:is="ShopsNearBy"
					v-if="drawer4"
					v-model:visible="drawer4"
					:ref="ShopsNearBy"
				/>
			</el-main>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

const drawer1 = ref(false)
const PreferencesView = ref(null)

const drawer2 = ref(false)
const Shops = ref(null)

const drawer3 = ref(false)
const Genres = ref(null)

const drawer4 = ref(false)
const ShopsNearBy = ref(null)

const openDrawer1 = async () => {
  drawer1.value = true
  if (!PreferencesView.value) {
    PreferencesView.value = defineAsyncComponent(() => 
      import('@/components/PreferencesView.vue')
    )
  }
}

const openDrawer2 = async () => {
  drawer2.value = true
  if (!Shops.value) {
    Shops.value = defineAsyncComponent(() => 
      import('@/components/Shops.vue')
    )
  }
}

const openDrawer3 = async () => {
  drawer3.value = true
  if (!Genres.value) {
    Genres.value = defineAsyncComponent(() => 
      import('@/components/Genres.vue')
    )
  }
}

const openDrawer4 = async () => {
  drawer4.value = true
  if (!ShopsNearBy.value) {
    ShopsNearBy.value = defineAsyncComponent(() => 
      import('@/components/ShopsNearBy.vue')
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
