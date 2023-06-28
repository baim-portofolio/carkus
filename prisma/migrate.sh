#!/bin/sh

echo "Waiting for database to be ready..."
until nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running Prisma migration..."
npx prisma migrate deploy --preview-feature

echo "Migration completed!"
