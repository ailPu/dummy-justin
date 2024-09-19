import { InterfaceDeclaration } from 'ts-morph';

export function createVueSchemaFromConfig(interfaceDeclaration: InterfaceDeclaration) {
	const schema :any= {};

	// Iterate over the properties of the interface
	interfaceDeclaration.getProperties().forEach(prop => {
		const name = prop.getName();
		const type = prop.getType().getText();
		const isOptional = prop.hasQuestionToken();

		// Map TypeScript types to JSON Schema types
		// extend to handle different types and adapt for vue-generator
		// https://github.com/vue-generators/vue-form-generator?tab=readme-ov-file#usage
		//              {
		//             type: 'input',
		//             inputType: 'text',
		//             label: 'Name',
		//             model: 'name',
		//             placeholder: 'Your name',
		//             featured: true,
		//             required: true
		//           },
		let fieldType = '';
		if (type === 'string' || type === 'string | undefined') {
			fieldType = 'string';
		} else if (type === 'string[]' || type === 'string[] | undefined') {
			fieldType = 'array';
		}

		// Add property to schema
		schema[name] = {
			type: fieldType,
			required: !isOptional
		};
	});

	// Output the schema. This could then be passed to https://github.com/vue-generators/vue-form-generator?tab=readme-ov-file
	return schema;
}
