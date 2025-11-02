import fs from 'fs/promises';
import path from 'path';
import Ajv from 'ajv';
import { createSchema } from 'genson-js';
import addFormats from 'ajv-formats';

const SCHEMA_BASE_PATH = './response-schemas';
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export async function validateSchema(dirName: string, fileName: string, responseBody: object, createSchemaFlag = false): Promise<void> {
    const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}_schema.json`);

    if (createSchemaFlag) await generateNewSchema(responseBody, schemaPath);

    const schema = await loadSchema(schemaPath);
    const validate = ajv.compile(schema);

    const valid = validate(responseBody);
    if (!valid) {
        throw new Error(
            `Schema validation ${fileName}_schema.json failed: \n` +
                `${JSON.stringify(validate.errors, null, 4)}\n\n` +
                `Actual response body: \n` +
                `${JSON.stringify(responseBody, null, 4)}`
        );
    }
}

async function loadSchema(schemaPath: string): Promise<any> {
    try {
        const schemaContent = await fs.readFile(schemaPath, 'utf-8');
        return JSON.parse(schemaContent);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to load schema file: ${error.message}`);
        }
        throw new Error(`Failed to load schema file: ${String(error)}`);
    }
}

async function generateNewSchema(responseBody: object, schemaPath: string): Promise<void> {
    try {
        const generatedSchema = createSchema(responseBody);
        await fs.mkdir(path.dirname(schemaPath), { recursive: true }); //recursive: true - will not create a folder if it's created
        await fs.writeFile(schemaPath, JSON.stringify(generatedSchema, null, 4));
    } catch (error) {
        throw new Error(`Failed to create a schema file: ${(error as Error).message}`);
    }
}
