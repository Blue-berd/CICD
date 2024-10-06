pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Blue-berd/CICD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '/var/lib/jenkins/.nvm/versions/node/v20.18.0/bin/yarn install'
            }
        }

        stage('Run Tests') {
            steps {
                sh '/var/lib/jenkins/.nvm/versions/node/v20.18.0/bin/yarn test'
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    dir('/projects/CICD') {
                        sh ''' 
                        git pull origin main
                        npm install --production
                        pm2 restart backend
                        '''
                    }
                }
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
        always {
            echo 'Deployment process finished!'
        }
    }
}
