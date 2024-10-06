pipeline {
    agent any

    tools {
        nodejs "NodeJS 20.x" 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Blue-berd/CICD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install' 
            }
        }

        stage('Run Tests') {
            steps {
                sh 'yarn test' 
            }
        }

        stage('Deploy to Production') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@ip-172-31-2-148 <<EOF
                cd projects/CICD
                git pull origin main
                yarn install --production
                cd src
                pm2 start app.js
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
