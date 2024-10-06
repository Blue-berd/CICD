pipeline {
agent any
tools {
nodejs "NodeJS 20.x"
}
stages {
stage('Checkout') {
steps {
git branch: 'main', url:
'https://github.com/Blue-berd/CICD.git'
}
}
stage('Install Dependencies') {
steps {
sh 'npm install'
}
}
stage('Run Tests') {
steps {
sh 'npm test'
}
}
stage('Build') {
steps {
sh 'npm run build'
}
}
stage('Deploy to Production') {
steps {
sh '''
ssh -o StrictHostKeyChecking=no ec2-user@<EC2-Public-IP> <<EOF
cd /var/www/html
git pull origin master
npm install --production
pm2 restart all
EOF
'''
}
}
}
post {
success {
echo 'Deployment successful!'
}
failure {
echo 'Deployment failed!'
}
}
}
