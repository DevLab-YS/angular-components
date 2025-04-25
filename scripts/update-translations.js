const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/lib/assets/i18n');
const destDir = path.join(__dirname, '../dist/src/lib/assets/i18n');

async function copyI18nFiles() {
    try {
        await fs.copy(sourceDir, destDir);
        console.log('Archivos copiados exitosamente de /src/lib/assets/i18n a /dist/src/lib/assets/i18n');
    } catch (error) {
        console.error('Error al copiar archivos:', error);
    }
}

copyI18nFiles();
