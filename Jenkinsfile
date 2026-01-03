pipeline {
  agent any

  environment {
    IMAGE_BACKEND = "garvg4278/sweetshop-backend"
    IMAGE_FRONTEND = "garvg4278/sweetshop-frontend"
    DOCKER_CREDS = credentials('dockerhub-creds')
    TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Backend Tests') {
      steps {
        sh """
        docker run --rm \
          -v \$PWD/backend:/app \
          -w /app \
          node:20-alpine \
          sh -c "npm ci && npm test"
        """
      }
    }

    stage('Build Docker Images') {
      steps {
        sh """
        docker build -t $IMAGE_BACKEND:$TAG backend
        docker build -t $IMAGE_FRONTEND:$TAG frontend
        """
      }
    }

    stage('Docker Login') {
      steps {
        sh '''
        echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
        '''
      }
    }

    stage('Push Images') {
      steps {
        sh """
        docker push $IMAGE_BACKEND:$TAG
        docker push $IMAGE_FRONTEND:$TAG
        docker tag $IMAGE_BACKEND:$TAG $IMAGE_BACKEND:latest
        docker tag $IMAGE_FRONTEND:$TAG $IMAGE_FRONTEND:latest
        docker push $IMAGE_BACKEND:latest
        docker push $IMAGE_FRONTEND:latest
        """
      }
    }
  }
}
