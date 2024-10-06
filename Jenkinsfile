pipeline {
    agent any
    environment {
        NODE_HOME = "/var/lib/jenkins/.nvm/versions/node/v20.18.0"
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('Cleanup') {
            steps {
                cleanWs() 
        }
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Blue-berd/CICD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install' 
            }
        }

        stage('Run Tests') {
            steps {
                withEnv(['PORT=3001']) {
                    sh 'yarn test' 
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    dir('/projects/CICD') {
                        sh ''' 
                        git pull origin main
                        yarn install --production
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
