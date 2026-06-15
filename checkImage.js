const fs = require('fs');
const path = 'mi-foto.png';
try {
  const b = fs.readFileSync(path);
  console.log('HEADER=' + b.slice(0, 8).join(','));
  console.log('LENGTH=' + b.length);
  console.log('EXISTS=' + fs.existsSync(path));
} catch (error) {
  console.error('ERROR', error.message);
  process.exit(1);
}
