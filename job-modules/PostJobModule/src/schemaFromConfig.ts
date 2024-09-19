import {Project} from "ts-morph";
import * as path from "node:path";
import {createVueSchemaFromConfig} from "@dummy-hoki/integration-helpers";

export function generateVueSchema() {
    const project = new Project({
        compilerOptions: {
            strictNullChecks: true
        }
    });

    let sourceFile;
    try{
        sourceFile = project.addSourceFileAtPath(path.join(__dirname, 'types', 'PostConfig.d.ts'));
    }
    catch(error:any){
        if(error.code === 'ENOENT'){
            sourceFile = project.addSourceFileAtPath(path.join(__dirname, 'types', 'PostConfig.ts'));
        }
    }

    if(sourceFile){
        const interfaceDeclaration = sourceFile.getInterfaceOrThrow(`IPostSourceConfig`);
        return createVueSchemaFromConfig(interfaceDeclaration);
    }

    throw new Error('failed to get interfaceFile')
}
