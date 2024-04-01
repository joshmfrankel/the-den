-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lanes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "board_id" TEXT NOT NULL,

    CONSTRAINT "lanes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lanes" ADD CONSTRAINT "lanes_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
