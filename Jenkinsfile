pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.41.0-focal'  // Khớp với phiên bản Playwright trong package.json
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Lấy mã nguồn từ repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Cài đặt dependencies Node.js
                sh 'npm install'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                // Cài đặt trình duyệt cho Playwright
                sh 'npx playwright install chromium'
            }
        }
        stage('Run Tests') {
            steps {
                // Chạy test Cucumber
                sh 'npx cucumber-js'
            }
        }
    }
    post {
        always {
            // Xóa workspace sau khi hoàn thành (tuỳ chọn)
            cleanWs()
        }
        failure {
            // Gửi thông báo nếu thất bại (tuỳ chọn)
            echo 'Build failed! Check the logs.'
        }
    }
}