import {Project} from "ts-morph";
import {createVueSchemaFromConfig} from "@dummy-hoki/integration-helpers";
import * as path from "node:path";

export const PostJobModuleFactory = () => {
    console.log("DUMMING AROUND HERE!")
}


export const generateVueSchema =()=> {
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
