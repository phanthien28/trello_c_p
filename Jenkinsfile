pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Run in Playwright Container') {
            steps {
                script {
                    docker.image('mcr.microsoft.com/playwright:v1.41.0-focal').inside {
                        sh 'npm install'
                        sh 'npx playwright install chromium'
                        sh 'npx cucumber-js --require-module ts-node/register --require "./steps/**/*.ts" --format progress'
                    }
                }
            }
        }

    }
    post {
        always {
            cleanWs()
        }
        failure {
            echo 'Build failed! Check the logs.'
        }
    }
}