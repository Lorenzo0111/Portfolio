-- CreateTable
CREATE TABLE "DriveFile" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT,
    "fileUrl" TEXT,

    CONSTRAINT "DriveFile_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "link" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("_id")
);
