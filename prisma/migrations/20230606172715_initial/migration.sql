-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_campus" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campus" (
    "id" TEXT NOT NULL,
    "campus_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_thread" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threads" (
    "id" TEXT NOT NULL,
    "id_campus" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thread" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Threads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_id_user_key" ON "Admins"("id_user");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_id_campus_fkey" FOREIGN KEY ("id_campus") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_id_thread_fkey" FOREIGN KEY ("id_thread") REFERENCES "Threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_id_campus_fkey" FOREIGN KEY ("id_campus") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
