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
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/Blue-berd/CICD.git']]])
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
                    script {
                        def process = sh(script: 'yarn test', returnStatus: true)
                        if (process != 0) {
                            error("Tests failed")
                        }
                    }
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