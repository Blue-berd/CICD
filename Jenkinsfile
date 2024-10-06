pipeline {
    agent any
    environment {
        NODE_HOME = "/var/lib/jenkins/.nvm/versions/node/v20.18.0"
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('Cleanup') {
            steps {
                cleanWs() // Cleans the workspace
            }
        }
        stage('Checkout') {
            steps {
                // Checkout the specified branch from the git repository
                git branch: 'main', url: 'https://github.com/Blue-berd/CICD.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install project dependencies using yarn
                sh 'yarn install' 
            }
        }
        stage('Run Tests') {
            steps {
                withEnv(['PORT=3001']) {
                    // Run tests and capture the exit status
                    script {
                        def process = sh(script: 'yarn test', returnStatus: true)
                        // Check the exit status of the test command
                        if (process != 0) {
                            error("Tests failed") // If tests fail, stop the pipeline
                        }
                    }
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                script {
                    dir('/projects/CICD') {
                        // Pull the latest code, install production dependencies, and restart the service
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
            echo 'Deployment successful!' // Log success message
        }
        failure {
            echo 'Deployment failed!' // Log failure message
        }
        always {
            echo 'Deployment process finished!' // Log that the process finished
        }
    }
}
