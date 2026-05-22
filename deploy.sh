#!/bin/bash

# --- 配置区 ---
SERVER_IP="38.55.192.139"
SERVER_USER="root"
SERVER_PASS="Pf-^lM3Y=G"
REMOTE_DIR="/root/twitter-hot/yqa-meun"   # 已挂载到容器内 /usr/share/nginx/html/yqa-meun/
LOCAL_DIST="dist"
# --------------

cd "$(dirname "$0")"

echo "🧹 清理旧依赖..."
rm -rf node_modules package-lock.json dist

echo "📦 重新安装依赖..."
npm install

echo "🚀 构建项目..."
npx vite build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查代码。"
    exit 1
fi

echo "📦 打包文件..."
tar -czf dist.tar.gz $LOCAL_DIST

echo "🚚 上传前端代码到服务器..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -o PreferredAuthentications=password dist.tar.gz $SERVER_USER@$SERVER_IP:/root/

echo "🛠️ 服务器解压并更新（写入已挂载目录）..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -o PreferredAuthentications=password $SERVER_USER@$SERVER_IP "
  mkdir -p $REMOTE_DIR
  tar -xzf /root/dist.tar.gz -C $REMOTE_DIR
  rm /root/dist.tar.gz
  # 重启 nginx 容器使配置生效
  docker restart twitter-hot-frontend-1
"

echo "✨ 清理本地临时文件..."
rm dist.tar.gz

echo "✅ 部署已完成！"
echo "🌐 访问地址: https://ttmouse.com/yqa-meun/"
