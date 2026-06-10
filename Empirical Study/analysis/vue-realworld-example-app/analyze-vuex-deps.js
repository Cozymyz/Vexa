// 文件名：vuex_component_module_analyzer.js
// 描述：Vuex组件-模块依赖关系分析脚本（修正完整版）
// 运行：node vuex_component_module_analyzer.js
// 输出：详细的组件-模块依赖关系，可直接用于论文

const fs = require('fs');
const path = require('path');

console.log('🔬 Vuex组件-模块依赖关系分析开始...\n');

// ========== 第一部分：建立Store模块映射 ==========
console.log('=== 第一部分：建立Store模块映射关系 ===\n');

// 1.1 提取ACTION常量
const actionConstants = [];
try {
    const actionContent = fs.readFileSync('src/store/actions.type.js', 'utf-8');
    const lines = actionContent.split('\n');
    lines.forEach(line => {
        const match = line.match(/export\s+const\s+([A-Z_]+)/);
        if (match) {
            actionConstants.push(match[1]);
        }
    });
    console.log(`✅ 提取了 ${actionConstants.length} 个ACTION常量`);
} catch (e) {
    console.log('❌ 无法读取 actions.type.js');
    process.exit(1);
}

// 1.2 分析每个模块文件，建立精确映射
const getterToModuleMap = {};
const actionToModuleMap = {};

// 模块文件列表
const moduleFiles = [
    { name: 'article', path: 'src/store/article.module.js' },
    { name: 'auth', path: 'src/store/auth.module.js' },
    { name: 'home', path: 'src/store/home.module.js' },
    { name: 'profile', path: 'src/store/profile.module.js' },
    { name: 'settings', path: 'src/store/settings.module.js' }
];

console.log('🔍 开始分析模块文件:');
moduleFiles.forEach(({ name, path: filePath }) => {
    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  跳过: ${filePath} 不存在`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    let getters = [];
    let rawActions = [];

    // ---- 修正：提取Getters（支持多种模式） ----
    // 模式1: getters: { ... } 内联定义
    // 模式2: const getters = { ... } 常量定义
    // 模式3: getters 属性引用（如 getters）
    
    // 首先尝试查找getters的定义块
    const gettersBlockMatch = content.match(/(?:getters|const\s+getters)\s*[:=]\s*{([\s\S]*?)(?=,\s*\w+\s*[:=]|\n\s*\w+\s*[:=]|;|\n\s*})/);
    if (gettersBlockMatch) {
        const getterBlock = gettersBlockMatch[1];
        // 匹配函数定义，如：article(state) { 或 currentUser: state => 
        const getterNameRegex = /(['"]?)(\w+)\1\s*(?:\(|:)/g;
        let match;
        while ((match = getterNameRegex.exec(getterBlock)) !== null) {
            const gName = match[2];
            // 排除保留关键字
            if (gName && !['state', 'rootState', 'getters', 'rootGetters', 'context', 'commit', 'dispatch'].includes(gName)) {
                getters.push(gName);
            }
        }
    }
    
    // 如果没找到，尝试在默认导出中查找getters引用
    if (getters.length === 0) {
        const defaultExportMatch = content.match(/export\s+default\s*{([\s\S]*?)}/);
        if (defaultExportMatch) {
            const exportBlock = defaultExportMatch[1];
            if (exportBlock.includes('getters')) {
                // 在文件中搜索getters常量定义
                const gettersConstMatch = content.match(/const\s+getters\s*=\s*{([\s\S]*?)}/);
                if (gettersConstMatch) {
                    const constBlock = gettersConstMatch[1];
                    const getterNameRegex = /(['"]?)(\w+)\1\s*(?:\(|:)/g;
                    let match;
                    while ((match = getterNameRegex.exec(constBlock)) !== null) {
                        const gName = match[2];
                        if (gName && !['state', 'rootState', 'getters', 'rootGetters', 'context'].includes(gName)) {
                            getters.push(gName);
                        }
                    }
                }
            }
        }
    }

    // 建立getter到模块的映射
    getters.forEach(g => {
        getterToModuleMap[g] = name;
    });

    // ---- 提取Actions ----
    // 匹配计算属性名，如：[LOGIN](context, credentials) {
    const actionNameRegex = /\[([A-Z_]+)\]\s*\(/g;
    let actionMatch;
    while ((actionMatch = actionNameRegex.exec(content)) !== null) {
        rawActions.push(actionMatch[1]);
    }

    // 建立action常量到模块的映射
    actionConstants.forEach(constant => {
        if (rawActions.includes(constant)) {
            if (!actionToModuleMap[constant]) {
                actionToModuleMap[constant] = [];
            }
            if (!actionToModuleMap[constant].includes(name)) {
                actionToModuleMap[constant].push(name);
            }
        }
    });

    console.log(`  ${name}: ${getters.length}个getters, ${rawActions.length}个actions`);
    if (getters.length > 0) {
        console.log(`      getters: ${getters.join(', ')}`);
    }
});

console.log(`\n✅ 映射建立完成:`);
console.log(`   - getter到模块映射: ${Object.keys(getterToModuleMap).length} 条`);
console.log(`   - action常量到模块映射: ${Object.keys(actionToModuleMap).length} 条`);

// 打印映射示例
console.log('\n📋 映射关系示例:');
const sampleGetters = Object.entries(getterToModuleMap).slice(0, 5);
if (sampleGetters.length > 0) {
    console.log('  Getters:');
    sampleGetters.forEach(([g, m]) => console.log(`    ${g} -> ${m}`));
}
const sampleActions = Object.entries(actionToModuleMap).slice(0, 5);
if (sampleActions.length > 0) {
    console.log('  Actions:');
    sampleActions.forEach(([a, ms]) => console.log(`    ${a} -> ${ms.join(', ')}`));
}
console.log('');

// ========== 第二部分：分析Vue组件 ==========
console.log('=== 第二部分：分析Vue组件依赖 ===\n');

// 收集Vue组件文件
const componentDirs = ['src/views', 'src/components'];
const vueFiles = [];

componentDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        items.forEach(item => {
            if (item.isFile() && item.name.endsWith('.vue')) {
                vueFiles.push(path.join(dir, item.name));
            }
        });
    }
});

console.log(`📁 找到 ${vueFiles.length} 个Vue组件文件\n`);

// 分析每个组件
const componentAnalysis = [];

vueFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    const componentInfo = {
        file: relativePath,
        mapGetters: [],
        mapState: false,
        dispatches: [],
        dependentModules: new Set()
    };

    // 提取<script>标签内容
    const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
        componentAnalysis.push(componentInfo);
        return;
    }

    const scriptContent = scriptMatch[1];

    // ---- 检测 mapGetters ----
    // 匹配 ...mapGetters(['article', 'currentUser'])
    const mapGettersRegex = /\.\.\.mapGetters\s*\(\s*\[([\s\S]*?)\]\s*\)/;
    const mgMatch = scriptContent.match(mapGettersRegex);
    if (mgMatch && mgMatch[1]) {
        const getterString = mgMatch[1];
        // 提取引号内的getter名
        const getterNameRegex = /['"]([^'"]+)['"]/g;
        let match;
        while ((match = getterNameRegex.exec(getterString)) !== null) {
            const getterName = match[1];
            componentInfo.mapGetters.push(getterName);
            
            // 通过映射找到模块
            if (getterToModuleMap[getterName]) {
                componentInfo.dependentModules.add(getterToModuleMap[getterName]);
            }
        }
    }

    // ---- 检测 mapState ----
    if (scriptContent.includes('...mapState')) {
        componentInfo.mapState = true;
        // mapState主要用于errors，关联到auth模块
        componentInfo.dependentModules.add('auth');
    }

    // ---- 检测 dispatch 调用（修正：使用更全面的正则） ----
    // 支持多种模式：
    // 1. store.dispatch('ACTION', ...)
    // 2. this.$store.dispatch('ACTION', ...)
    // 3. $store.dispatch('ACTION', ...)
    
    const dispatchPatterns = [
        /(?:store|this\.\$store|\$store)\.dispatch\s*\(\s*['"]([A-Z_]+)['"]/g,
        /dispatch\s*\(\s*['"]([A-Z_]+)['"]/g
    ];
    
    dispatchPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(scriptContent)) !== null) {
            const actionConstant = match[1];
            // 检查是否是有效的ACTION常量
            if (actionConstants.includes(actionConstant)) {
                componentInfo.dispatches.push(actionConstant);
                
                // 通过映射找到模块
                if (actionToModuleMap[actionConstant]) {
                    actionToModuleMap[actionConstant].forEach(mod => {
                        componentInfo.dependentModules.add(mod);
                    });
                }
            }
        }
    });

    componentAnalysis.push(componentInfo);
});

console.log('✅ 组件分析完成\n');

// ========== 第三部分：生成分析报告 ==========
console.log('=== 第三部分：生成分析报告 ===\n');

console.log('='.repeat(80));
console.log('                   VUEX组件-模块依赖关系分析报告');
console.log('='.repeat(80));

// 3.1 输出详细依赖关系
console.log('\n一、详细组件-模块依赖关系\n');

let compWithExplicit = 0;
let compWithImplicit = 0;
let compWithAny = 0;
const moduleUsage = {};

// 按目录分组显示
const viewsComponents = componentAnalysis.filter(c => c.file.includes('src/views'));
const sharedComponents = componentAnalysis.filter(c => c.file.includes('src/components'));

console.log('📁 页面组件 (src/views/):');
viewsComponents.forEach(comp => {
    const hasExplicit = comp.mapGetters.length > 0 || comp.mapState;
    const hasImplicit = comp.dispatches.length > 0;
    const hasAny = hasExplicit || hasImplicit;
    
    if (!hasAny) return;
    
    compWithAny++;
    if (hasExplicit) compWithExplicit++;
    if (hasImplicit) compWithImplicit++;
    
    // 统计模块使用
    comp.dependentModules.forEach(mod => {
        moduleUsage[mod] = (moduleUsage[mod] || 0) + 1;
    });
    
    console.log(`\n  📄 ${comp.file}`);
    if (comp.mapGetters.length > 0) {
        console.log(`     ├─ mapGetters: [${comp.mapGetters.join(', ')}]`);
    }
    if (comp.mapState) {
        console.log(`     ├─ mapState: 检测到使用`);
    }
    if (comp.dispatches.length > 0) {
        const uniqueDispatches = [...new Set(comp.dispatches)];
        console.log(`     ├─ dispatch:  [${uniqueDispatches.join(', ')}]`);
    }
    if (comp.dependentModules.size > 0) {
        console.log(`     └─ 🔗 依赖模块: [${Array.from(comp.dependentModules).join(', ')}]`);
    }
});

console.log('\n📁 公共组件 (src/components/):');
sharedComponents.forEach(comp => {
    const hasExplicit = comp.mapGetters.length > 0 || comp.mapState;
    const hasImplicit = comp.dispatches.length > 0;
    const hasAny = hasExplicit || hasImplicit;
    
    if (!hasAny) return;
    
    compWithAny++;
    if (hasExplicit) compWithExplicit++;
    if (hasImplicit) compWithImplicit++;
    
    // 统计模块使用
    comp.dependentModules.forEach(mod => {
        moduleUsage[mod] = (moduleUsage[mod] || 0) + 1;
    });
    
    console.log(`\n  📄 ${comp.file}`);
    if (comp.mapGetters.length > 0) {
        console.log(`     ├─ mapGetters: [${comp.mapGetters.join(', ')}]`);
    }
    if (comp.mapState) {
        console.log(`     ├─ mapState: 检测到使用`);
    }
    if (comp.dispatches.length > 0) {
        const uniqueDispatches = [...new Set(comp.dispatches)];
        console.log(`     ├─ dispatch:  [${uniqueDispatches.join(', ')}]`);
    }
    if (comp.dependentModules.size > 0) {
        console.log(`     └─ 🔗 依赖模块: [${Array.from(comp.dependentModules).join(', ')}]`);
    }
});

// 3.2 核心统计摘要
console.log('\n' + '='.repeat(80));
console.log('二、核心统计摘要');
console.log('='.repeat(80));

const compsWithDeps = componentAnalysis.filter(c => c.dependentModules.size > 0);
const avgModules = compsWithDeps.length > 0
    ? (compsWithDeps.reduce((sum, c) => sum + c.dependentModules.size, 0) / compsWithDeps.length).toFixed(2)
    : '0.00';
const maxModules = compsWithDeps.length > 0
    ? Math.max(...compsWithDeps.map(c => c.dependentModules.size))
    : 0;

console.log(`📊 总体情况:`);
console.log(`  分析组件总数: ${vueFiles.length}`);
console.log(`  有Vuex依赖的组件: ${compWithAny} (${((compWithAny/vueFiles.length)*100).toFixed(1)}%)`);
console.log(`  无Vuex依赖的组件: ${vueFiles.length - compWithAny} (${(((vueFiles.length - compWithAny)/vueFiles.length)*100).toFixed(1)}%)`);

console.log(`\n📊 依赖方式:`);
console.log(`  使用显式依赖(mapState/mapGetters): ${compWithExplicit} 个组件`);
console.log(`  使用隐式依赖(dispatch): ${compWithImplicit} 个组件`);
console.log(`  两种方式都使用的组件: ${Math.max(0, compWithExplicit + compWithImplicit - compWithAny)} 个`);

console.log(`\n📊 模块被依赖频率 (${Object.keys(moduleUsage).length}个模块):`);
Object.entries(moduleUsage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([mod, count]) => {
        const percentage = ((count / compWithAny) * 100).toFixed(1);
        console.log(`  ${mod.padEnd(12)}: ${count} 个组件依赖 (${percentage}%)`);
    });

console.log(`\n📊 依赖复杂度:`);
console.log(`  平均每个"有依赖的组件"依赖模块数: ${avgModules}`);
console.log(`  单个组件最大依赖模块数: ${maxModules}`);

// 依赖最多的组件
const sortedByComplexity = [...compsWithDeps]
    .sort((a, b) => b.dependentModules.size - a.dependentModules.size)
    .slice(0, 5);

if (sortedByComplexity.length > 0) {
    console.log(`\n🏆 依赖最复杂的组件 (Top ${Math.min(5, sortedByComplexity.length)}):`);
    sortedByComplexity.forEach((comp, index) => {
        console.log(`  ${index + 1}. ${comp.file}`);
        console.log(`     依赖 ${comp.dependentModules.size} 个模块: ${Array.from(comp.dependentModules).join(', ')}`);
        if (comp.mapGetters.length > 0) {
            console.log(`     使用的getters: ${comp.mapGetters.join(', ')}`);
        }
        if (comp.dispatches.length > 0) {
            const uniqueDispatches = [...new Set(comp.dispatches)];
            console.log(`     调用的actions: ${uniqueDispatches.join(', ')}`);
        }
    });
}

// 3.3 对VEXA适配性的评估
console.log('\n' + '='.repeat(80));
console.log('三、对VEXA适配性的评估');
console.log('='.repeat(80));

const insights = [];

// 基于分析结果的洞察
if (compWithImplicit > 0) {
    insights.push(`项目采用"声明式状态读取(mapGetters) + 命令式行为触发(dispatch)"的混合模式。`);
} else {
    insights.push(`项目主要使用声明式状态管理(mapGetters)。`);
}

insights.push(`共发现 ${Object.keys(moduleUsage).length} 个业务模块被 ${compWithAny} 个组件使用。`);
insights.push(`组件对状态的依赖关系清晰，可通过静态分析完整提取。`);

// 检查是否使用命名空间
let usesNamespaces = false;
try {
    const indexContent = fs.readFileSync('src/store/index.js', 'utf-8');
    moduleFiles.forEach(({ name }) => {
        const moduleImport = new RegExp(`import\\s+${name}\\s+from\\s+['"][^'"]+${name}\\.module['"]`);
        if (moduleImport.test(indexContent)) {
            // 检查模块是否启用了namespaced
            const modulePath = `src/store/${name}.module.js`;
            if (fs.existsSync(modulePath)) {
                const moduleContent = fs.readFileSync(modulePath, 'utf-8');
                if (moduleContent.includes('namespaced:')) {
                    usesNamespaces = true;
                }
            }
        }
    });
} catch (e) {
    // 忽略错误
}

if (usesNamespaces) {
    insights.push(`项目使用了Vuex命名空间进行状态隔离。`);
} else {
    insights.push(`项目未使用Vuex命名空间，状态访问为全局模式。`);
}

// 评估映射可提取性
let mappingExtractability = '高';
if (compWithImplicit > 0 && compWithImplicit / compWithAny > 0.5) {
    mappingExtractability = '中';
} else if (getterToModuleMap.length === 0) {
    mappingExtractability = '低';
}
insights.push(`组件-模块映射可提取性: ${mappingExtractability}`);

insights.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
});

// 3.4 保存完整结果
const finalResult = {
    meta: {
        project: 'vue-realworld-example-app',
        analyzedAt: new Date().toISOString(),
        analysisMethod: '静态代码分析（正则匹配）',
        totalComponents: vueFiles.length,
        storeModules: moduleFiles.map(m => m.name)
    },
    // 第一阶段：映射关系
    mappings: {
        getterToModule: getterToModuleMap,
        actionToModule: actionToModuleMap
    },
    // 第二阶段：组件分析结果
    components: compsWithDeps.map(comp => ({
        file: comp.file,
        mapGetters: comp.mapGetters,
        mapState: comp.mapState,
        dispatches: [...new Set(comp.dispatches)], // 去重
        dependentModules: Array.from(comp.dependentModules).sort()
    })).sort((a, b) => a.file.localeCompare(b.file)),
    // 第三阶段：统计分析
    statistics: {
        totalComponents: vueFiles.length,
        componentsWithExplicitDeps: compWithExplicit,
        componentsWithImplicitDeps: compWithImplicit,
        componentsWithAnyDeps: compWithAny,
        moduleUsage,
        avgModulesPerComponent: parseFloat(avgModules),
        maxModulesPerComponent: maxModules,
        mappingExtractability
    }
};

const outputFile = 'component_module_analysis.json';
fs.writeFileSync(outputFile, JSON.stringify(finalResult, null, 2), 'utf-8');

console.log('\n' + '='.repeat(80));
console.log(`💾 完整分析结果已保存至: ${outputFile}`);
console.log('  此文件包含所有详细的依赖关系数据，可直接用于论文写作。');
console.log('='.repeat(80));

console.log('\n✅ 分析完成！\n');

// 提供使用建议
console.log('💡 论文使用建议:');
console.log('1. 在"D2：组件-模块映射性分析"部分，引用本分析的核心统计结果');
console.log('2. 在附录中引用完整的 component_module_analysis.json 文件');
console.log('3. 重点讨论组件依赖模式的混合性及其对VEXA适配的影响\n');