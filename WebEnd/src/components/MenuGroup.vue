<!--
 * @Author: Meiyizhi
 * @Date: 2025-06-10 20:03:19
 * @LastEditTime: 2025-06-10 22:39:04
 * @Description: 
-->
<template>
    <el-drawer
        :model-value="internalVisible"
        @update:model-value="handleDrawerChange"
        title="Menu"
        direction="ltr"
        :with-header="false"
        :before-close="handleBeforeClose"
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
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface MenuGroup {
  groupId: number
  groupName: string
  displayOrder: number
}

defineOptions({
    vuexModule: {
        name: 'MenuGroup',
        extent: 'session'
    }
})

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    menuGroups: {
        type: Array as () => MenuGroup[],
        default: () => []
    }
})

const emit = defineEmits(['update:visible', 'refresh'])

// 创建一个可写的内部状态
const internalVisible = ref(props.visible)

// 当 prop 变化时，同步到内部状态
watch(() => props.visible, (newVal) => {
    internalVisible.value = newVal
})

// 处理抽屉状态变化
const handleDrawerChange = (newValue: boolean) => {
    internalVisible.value = newValue
    emit('update:visible', newValue)
}

// 关闭前的回调
const handleBeforeClose = (done: () => void) => {
    done()
    internalVisible.value = false
    emit('update:visible', false)
}
</script>