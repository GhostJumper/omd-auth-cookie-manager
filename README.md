# omd-auth-cookie-manager


## Build container
`docker image build -t unrea1/omd-auth-cookie-manager:latest .`


## Run container
`docker run -it --name test -p 3000:3000 -e port='3000' -e DB_NAME='omd' -e DB_USER='auth_cookie_manager' -e DB_PASS='db_pass' -e DB_ADDR='dp_addr' -e DB_PORT='27017' unrea1/omd-auth-cookie-manager:latest`
