// Incrémente automatiquement la version (x.y.Z) et inscrit la date du jour.
// Lancé par GitHub Actions à chaque envoi sur la branche principale.
const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const m = idx.match(/const APP_VERSION='v(\d+)\.(\d+)\.(\d+)';const APP_DATE='[^']*';/);
if (!m) { console.error('APP_VERSION introuvable dans index.html'); process.exit(1); }

const version = `v${m[1]}.${m[2]}.${Number(m[3]) + 1}`;
const date = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', year: 'numeric'
}).format(new Date());

fs.writeFileSync('index.html',
  idx.replace(m[0], `const APP_VERSION='${version}';const APP_DATE='${date}';`));

let sw = fs.readFileSync('sw.js', 'utf8');
sw = sw.replace(/^\/\/ Visite sécurité - .*$/m, `// Visite sécurité - ${version} - ${date}`)
       .replace(/const VERSION='[^']*';/, `const VERSION='${version}';`);
fs.writeFileSync('sw.js', sw);

console.log(`Version : ${version} (${date})`);
