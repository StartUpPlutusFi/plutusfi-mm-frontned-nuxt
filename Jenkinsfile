pipeline {
  agent {
    node {
      label '16.17-alpine3.15'
    }

  }
  stages {
    stage('install yarn') {
      steps {
        sh 'npm install --global yarn'
      }
    }

  }
}