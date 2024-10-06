pipeline {
    agent any

  

    stages {
        stage('Checkout') {
            steps {
                sh '''
                cd projects/CICD
                git pull origin main
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '/home/ubuntu/.nvm/versions/node/v20.18.0/bin/yarn install' 
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
                yarn install --production
                cd src
                pm2 start app.js
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
