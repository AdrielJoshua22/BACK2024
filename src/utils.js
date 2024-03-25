/* LA ARCHIVO UTILS ES ALGO QUE YA ES POR DEFAULT, ES PARA GENERAR UNA DIRECCION ESTATICA GLOBAL  */
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
