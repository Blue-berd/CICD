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
        stage('Check Processes') {
            steps {
            sh 'lsof -i:3001 || echo "No process using port 3001"'
            }
        }
       stage('Kill Previous Process before Tests') { 
            steps {
                sh 'fuser -k 3001/tcp || true'
            }
        }
        stage('Run Tests') {
            steps {
                withEnv(['PORT=3001']) {
                    script {
                        def process = sh(script: 'yarn test', returnStatus: true)
                        if (process != 0) {
                            error("Tests failed") 
                        }
                    }
                }
            }
        }
        stage('Kill Previous Process After Tests') { 
            steps {
                sh 'fuser -k 3001/tcp || true'
            }
        }
        stage('Deploy to Production') {
            steps {
                script {
                    dir('/var/lib/jenkins/projects/CICD') {
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
