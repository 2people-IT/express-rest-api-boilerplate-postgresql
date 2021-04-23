docker run -d \
    --name some-postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=postgres \
    -p 5432:5432 \
    postgres:12
