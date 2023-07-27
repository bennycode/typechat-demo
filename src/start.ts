import 'dotenv/config';

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {createJsonTranslator, createLanguageModel, processRequests} from 'typechat';
import {Travel} from './schema';
import {getDistanceReport} from './getDistanceReport.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, 'input.txt');
const schemaFile = path.join(__dirname, 'schema.ts');
const schema = fs.readFileSync(schemaFile, 'utf8');

const model = createLanguageModel({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: 'gpt-3.5-turbo',
});

const translator = createJsonTranslator<Travel>(model, schema, 'Travel');

await processRequests('Question: ', inputFile, async (request: string) => {
  const response = await translator.translate(request);

  if (!response.success) {
    throw new Error(response.message);
  }

  const travel = response.data;

  console.log(travel);
  console.log(await getDistanceReport(travel));
});
