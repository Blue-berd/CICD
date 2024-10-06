pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    dir('/var/lib/jenkins/projects/CICD') {
                        sh 'ls' 
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    dir('/var/lib/jenkins/projects/CICD') {
                        sh 'yarn install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir('/var/lib/jenkins/projects/CICD') {
                        sh 'yarn test'
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    dir('/var/lib/jenkins/projects/CICD') {
                        sh './deploy.sh'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment finished!'
        }
    }
}
