pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Đảm bảo NodeJS đã được cấu hình trong Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code từ source control
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install các dependencies
                sh 'npm ci'
                sh 'npx playwright install'
                sh 'npx cucumber-js'
            }
        }

        stage('Run Tests') {
            steps {
                // Chạy tests
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Clean workspace sau khi chạy xong
            cleanWs()
        }
        
        success {
            echo 'Pipeline executed successfully!'
        }
        
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}