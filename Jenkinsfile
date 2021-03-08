node{


        stage('SCM Checkout')
        {

                git credentialsId: 'Git_Cred', url: 'https://github.com/MariposaDigital0/isapce-admin.git'
                echo 'Website Successfully Clone From Git Hub'
        }
        stage('Build Docker Image')
        {

                sh 'docker build -t mariposa/ispace-admin .'
                 echo 'Website Successfully Build'

        }

        stage('Run Docker Container On Staging Server')
        {
                sh 'docker rm -f ispace-admin'
                sh 'docker run -it -p 88:80 -d --name ispace-admin mariposa/ispace-admin'
                echo 'Congrats! Website Successfully Deploy'

        }
        stage('Run Container On Production Server')
        {
                //sh 'sudo docker rm -f biku8293/mariposa'
                //sh 'sudo docker rm -f mariposa'
                //sh 'sudo docker run -it -p 82:80 -d --name mariposa biku8293/mariposa'
                echo 'successfully deploy'

        }

}
