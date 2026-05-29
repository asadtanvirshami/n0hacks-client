const { spawn } = require('child_process');
const path = require('path');

const cwd = process.cwd();
const workdir = path.resolve(cwd);

const args = [
  'run',
  '--rm',
  '--network',
  'host',
  '-v',
  `${workdir}:/zap/wrk`,
  '-t',
  'owasp/zap2docker-stable',
  'zap-baseline.py',
  '-t',
  'http://localhost:3000',
  '-r',
  '/zap/wrk/owasp-zap-report.html',
  '-j',
  '-I',
];

const docker = spawn('docker', args, { stdio: 'inherit' });

docker.on('close', (code) => {
  process.exit(code);
});

docker.on('error', (error) => {
  console.error('Failed to start Docker:', error);
  process.exit(1);
});
