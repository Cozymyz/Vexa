// File: ts-structure-analyzer.ts
// Description: Vuex module structure similarity analysis tool based on ts-morph
// Run: npx ts-node --transpile-only ts-structure-analyzer.ts
// Dependencies: npm install ts-morph ts-node

import { Project, SyntaxKind, Node, ObjectLiteralExpression } from 'ts-morph';
import * as path from 'path';

// Configuration
const VUEX_MODULES_DIR = './src/store/';

// Store analysis results
interface FileStructureMetrics {
  file: string;
  fileName: string; // File name without path
  moduleName: string; // Module name (note/user)
  totalFunctions: number;
  actionCount: number;
  mutationCount: number;
  getterCount: number;
  importCount: number;
  exportCount: number;
  hasNamespaced: boolean;
  structureVector: number[]; // Feature vector
}

interface FileComparisonResult {
  file1: string;
  file2: string;
  similarity: number;
  fileName: string; // Common file name being compared
}

class VuexStructureAnalyzer {
  private project: Project;
  private fileMetrics: FileStructureMetrics[] = [];

  constructor() {
    this.project = new Project({
      // Use the existing tsconfig.json
      tsConfigFilePath: './tsconfig.json',
    });
  }

  /**
   * Main analysis function
   */
  async analyze(): Promise<void> {
    // 1. Analyze each file
    const sourceFiles = this.project.getSourceFiles(`${VUEX_MODULES_DIR}/**/*.ts`);
    
    for (const sourceFile of sourceFiles) {
      const filePath = sourceFile.getFilePath();
      
      // Extract file-level structure features
      const metrics = this.extractFileMetrics(sourceFile);
      this.fileMetrics.push(metrics);
    }
    
    // 2. Analyze similarity between files with the same name
    this.analyzeSameNameFileSimilarity();
  }

  /**
   * Extract file-level structure features
   */
  private extractFileMetrics(sourceFile: any): FileStructureMetrics {
    const filePath = sourceFile.getFilePath();
    const fileName = path.basename(filePath);
    
    // Extract module name from path
    const pathParts = filePath.split(path.sep);
    const moduleIndex = pathParts.indexOf('store') + 1;
    const moduleName = moduleIndex < pathParts.length ? pathParts[moduleIndex] : 'unknown';
    
    // Calculate various metrics
    const functionCount = sourceFile.getFunctions().length;
    const importCount = sourceFile.getImportDeclarations().length;
    const exportCount = sourceFile.getExportDeclarations().length;
    
    // Find Vuex related features
    let actionCount = 0;
    let mutationCount = 0;
    let getterCount = 0;
    let hasNamespaced = false;
    
    // Check for namespaced: true
    const propertyAssignments = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment);
    for (const prop of propertyAssignments) {
      if (prop.getName() === 'namespaced') {
        hasNamespaced = true;
      } else if (prop.getName() === 'actions') {
        const obj = prop.getInitializer();
        if (Node.isObjectLiteralExpression(obj)) {
          actionCount = obj.getProperties().length;
        }
      } else if (prop.getName() === 'mutations') {
        const obj = prop.getInitializer();
        if (Node.isObjectLiteralExpression(obj)) {
          mutationCount = obj.getProperties().length;
        }
      } else if (prop.getName() === 'getters') {
        const obj = prop.getInitializer();
        if (Node.isObjectLiteralExpression(obj)) {
          getterCount = obj.getProperties().length;
        }
      }
    }
    
    // Build feature vector
    const structureVector = [
      functionCount,
      actionCount,
      mutationCount,
      getterCount,
      importCount,
      exportCount,
      hasNamespaced ? 1 : 0,
    ];
    
    return {
      file: filePath,
      fileName,
      moduleName,
      totalFunctions: functionCount,
      actionCount,
      mutationCount,
      getterCount,
      importCount,
      exportCount,
      hasNamespaced,
      structureVector,
    };
  }

  /**
   * Analyze similarity between files with the same name
   */
  private analyzeSameNameFileSimilarity(): void {
    // Group files by their base name
    const filesByName = new Map<string, FileStructureMetrics[]>();
    for (const metric of this.fileMetrics) {
      if (!filesByName.has(metric.fileName)) {
        filesByName.set(metric.fileName, []);
      }
      filesByName.get(metric.fileName)!.push(metric);
    }
    
    // Compare files with the same name
    for (const [fileName, metrics] of filesByName) {
      if (metrics.length < 2) {
        continue;
      }
      
      console.log(`Comparing files named: ${fileName}`);
      console.log();
      
      // Compare all pairs of files with this name
      for (let i = 0; i < metrics.length; i++) {
        for (let j = i + 1; j < metrics.length; j++) {
          const file1 = metrics[i];
          const file2 = metrics[j];
          const similarity = this.cosineSimilarity(file1.structureVector, file2.structureVector);
          
          console.log(`${file1.file}:`);
          console.log(`${file2.file}:`);
          console.log();
          console.log(`Structural similarity: ${similarity.toFixed(3)}`);
          console.log();
          
          if (similarity > 0.8) {
            console.log("✅ Highly similar structure");
          } else if (similarity > 0.5) {
            console.log("⚠ Moderately similar structure");
          } else {
            console.log("❌ Significantly different structure");
          }
          
          console.log();
        }
      }
    }
  }

  /**
   * Calculate cosine similarity
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    if (normA === 0 || normB === 0) return 0;
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

// Main execution function
async function main() {
  try {
    const analyzer = new VuexStructureAnalyzer();
    await analyzer.analyze();
  } catch (error) {
    console.error('Error during analysis:', error);
  }
}

// Execute analysis
main();