-- AlterTable
ALTER TABLE "projects" ADD COLUMN "folder_url" VARCHAR(500);

-- CreateTable (if not already present from previous manual setup)
CREATE TABLE IF NOT EXISTS "memos" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "memos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey (ignore if exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'memos_project_id_fkey'
    ) THEN
        ALTER TABLE "memos" ADD CONSTRAINT "memos_project_id_fkey"
        FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
