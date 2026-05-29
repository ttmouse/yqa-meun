module.exports = {
  apps: [{
    name: 'yqa-meun',
    cwd: '/Users/douba/Projects/YQA-meun',
    script: 'node_modules/.bin/serve',
    args: 'dist -p 4130',
    watch: false,
    env: {
      NODE_ENV: 'production',
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    max_restarts: 10,
    restart_delay: 3000,
  }],
}
