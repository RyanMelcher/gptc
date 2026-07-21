import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_width" AS ENUM('third', 'half');
  CREATE TYPE "public"."enum_pages_blocks_button_group_items_style" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_button_group_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum_pages_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_width" AS ENUM('third', 'half');
  CREATE TYPE "public"."enum__pages_v_blocks_button_group_items_style" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_button_group_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('grid', 'masonry');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_theme_built_ins_text_on" AS ENUM('ink', 'paper');
  CREATE TYPE "public"."enum_theme_custom_colors_text_on" AS ENUM('ink', 'paper');
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"image_side" "enum_pages_blocks_image_text_image_side" DEFAULT 'left',
  	"image_width" "enum_pages_blocks_image_text_image_width" DEFAULT 'half',
  	"color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_button_group_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"color" varchar DEFAULT 'ink',
  	"style" "enum_pages_blocks_button_group_items_style" DEFAULT 'solid'
  );
  
  CREATE TABLE "pages_blocks_button_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_pages_blocks_button_group_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_gallery_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"image_side" "enum__pages_v_blocks_image_text_image_side" DEFAULT 'left',
  	"image_width" "enum__pages_v_blocks_image_text_image_width" DEFAULT 'half',
  	"color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_group_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"color" varchar DEFAULT 'ink',
  	"style" "enum__pages_v_blocks_button_group_items_style" DEFAULT 'solid',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__pages_v_blocks_button_group_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_gallery_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "theme_built_ins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"hex" varchar NOT NULL,
  	"text_on" "enum_theme_built_ins_text_on" DEFAULT 'ink' NOT NULL
  );
  
  CREATE TABLE "theme_custom_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar,
  	"hex" varchar NOT NULL,
  	"text_on" "enum_theme_custom_colors_text_on" DEFAULT 'ink' NOT NULL
  );
  
  CREATE TABLE "theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brutal_shadow" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_color" ALTER COLUMN "color" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt';
  ALTER TABLE "_pages_v_blocks_color" ALTER COLUMN "color" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt';
  ALTER TABLE "news_blocks_color" ALTER COLUMN "color" SET DATA TYPE varchar;
  ALTER TABLE "news_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt';
  ALTER TABLE "_news_v_blocks_color" ALTER COLUMN "color" SET DATA TYPE varchar;
  ALTER TABLE "_news_v_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt';
  ALTER TABLE "site_nav_links" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "color" varchar;
  ALTER TABLE "pages_blocks_two_up" ADD COLUMN "color" varchar;
  ALTER TABLE "pages_blocks_media" ADD COLUMN "color" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "color" varchar;
  ALTER TABLE "_pages_v_blocks_two_up" ADD COLUMN "color" varchar;
  ALTER TABLE "_pages_v_blocks_media" ADD COLUMN "color" varchar;
  ALTER TABLE "news_blocks_rich_text" ADD COLUMN "color" varchar;
  ALTER TABLE "news_blocks_two_up" ADD COLUMN "color" varchar;
  ALTER TABLE "news_blocks_media" ADD COLUMN "color" varchar;
  ALTER TABLE "_news_v_blocks_rich_text" ADD COLUMN "color" varchar;
  ALTER TABLE "_news_v_blocks_two_up" ADD COLUMN "color" varchar;
  ALTER TABLE "_news_v_blocks_media" ADD COLUMN "color" varchar;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_group_items" ADD CONSTRAINT "pages_blocks_button_group_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_group" ADD CONSTRAINT "pages_blocks_button_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_items" ADD CONSTRAINT "pages_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_group_items" ADD CONSTRAINT "_pages_v_blocks_button_group_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_group" ADD CONSTRAINT "_pages_v_blocks_button_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_items" ADD CONSTRAINT "_pages_v_blocks_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_items" ADD CONSTRAINT "_pages_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_nav_links_children" ADD CONSTRAINT "site_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theme_built_ins" ADD CONSTRAINT "theme_built_ins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theme"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theme_custom_colors" ADD CONSTRAINT "theme_custom_colors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theme"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_button_group_items_order_idx" ON "pages_blocks_button_group_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_group_items_parent_id_idx" ON "pages_blocks_button_group_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_group_order_idx" ON "pages_blocks_button_group" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_group_parent_id_idx" ON "pages_blocks_button_group" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_group_path_idx" ON "pages_blocks_button_group" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_items_order_idx" ON "pages_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_items_parent_id_idx" ON "pages_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_items_image_idx" ON "pages_blocks_gallery_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_button_group_items_order_idx" ON "_pages_v_blocks_button_group_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_group_items_parent_id_idx" ON "_pages_v_blocks_button_group_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_group_order_idx" ON "_pages_v_blocks_button_group" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_group_parent_id_idx" ON "_pages_v_blocks_button_group" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_group_path_idx" ON "_pages_v_blocks_button_group" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_items_order_idx" ON "_pages_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_items_parent_id_idx" ON "_pages_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_items_image_idx" ON "_pages_v_blocks_gallery_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "site_nav_links_children_order_idx" ON "site_nav_links_children" USING btree ("_order");
  CREATE INDEX "site_nav_links_children_parent_id_idx" ON "site_nav_links_children" USING btree ("_parent_id");
  CREATE INDEX "theme_built_ins_order_idx" ON "theme_built_ins" USING btree ("_order");
  CREATE INDEX "theme_built_ins_parent_id_idx" ON "theme_built_ins" USING btree ("_parent_id");
  CREATE INDEX "theme_custom_colors_order_idx" ON "theme_custom_colors" USING btree ("_order");
  CREATE INDEX "theme_custom_colors_parent_id_idx" ON "theme_custom_colors" USING btree ("_parent_id");
  DROP TYPE "public"."enum_pages_blocks_color_color";
  DROP TYPE "public"."enum__pages_v_blocks_color_color";
  DROP TYPE "public"."enum_news_blocks_color_color";
  DROP TYPE "public"."enum__news_v_blocks_color_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__pages_v_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_news_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__news_v_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  ALTER TABLE "pages_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_group_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_group" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_group_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_group" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_nav_links_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theme_built_ins" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theme_custom_colors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theme" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_button_group_items" CASCADE;
  DROP TABLE "pages_blocks_button_group" CASCADE;
  DROP TABLE "pages_blocks_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_button_group_items" CASCADE;
  DROP TABLE "_pages_v_blocks_button_group" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "site_nav_links_children" CASCADE;
  DROP TABLE "theme_built_ins" CASCADE;
  DROP TABLE "theme_custom_colors" CASCADE;
  DROP TABLE "theme" CASCADE;
  ALTER TABLE "pages_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt'::"public"."enum_pages_blocks_color_color";
  ALTER TABLE "pages_blocks_color" ALTER COLUMN "color" SET DATA TYPE "public"."enum_pages_blocks_color_color" USING "color"::"public"."enum_pages_blocks_color_color";
  ALTER TABLE "_pages_v_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt'::"public"."enum__pages_v_blocks_color_color";
  ALTER TABLE "_pages_v_blocks_color" ALTER COLUMN "color" SET DATA TYPE "public"."enum__pages_v_blocks_color_color" USING "color"::"public"."enum__pages_v_blocks_color_color";
  ALTER TABLE "news_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt'::"public"."enum_news_blocks_color_color";
  ALTER TABLE "news_blocks_color" ALTER COLUMN "color" SET DATA TYPE "public"."enum_news_blocks_color_color" USING "color"::"public"."enum_news_blocks_color_color";
  ALTER TABLE "_news_v_blocks_color" ALTER COLUMN "color" SET DEFAULT 'bolt'::"public"."enum__news_v_blocks_color_color";
  ALTER TABLE "_news_v_blocks_color" ALTER COLUMN "color" SET DATA TYPE "public"."enum__news_v_blocks_color_color" USING "color"::"public"."enum__news_v_blocks_color_color";
  ALTER TABLE "site_nav_links" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "color";
  ALTER TABLE "pages_blocks_two_up" DROP COLUMN "color";
  ALTER TABLE "pages_blocks_media" DROP COLUMN "color";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "color";
  ALTER TABLE "_pages_v_blocks_two_up" DROP COLUMN "color";
  ALTER TABLE "_pages_v_blocks_media" DROP COLUMN "color";
  ALTER TABLE "news_blocks_rich_text" DROP COLUMN "color";
  ALTER TABLE "news_blocks_two_up" DROP COLUMN "color";
  ALTER TABLE "news_blocks_media" DROP COLUMN "color";
  ALTER TABLE "_news_v_blocks_rich_text" DROP COLUMN "color";
  ALTER TABLE "_news_v_blocks_two_up" DROP COLUMN "color";
  ALTER TABLE "_news_v_blocks_media" DROP COLUMN "color";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_side";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_width";
  DROP TYPE "public"."enum_pages_blocks_button_group_items_style";
  DROP TYPE "public"."enum_pages_blocks_button_group_align";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_columns";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_width";
  DROP TYPE "public"."enum__pages_v_blocks_button_group_items_style";
  DROP TYPE "public"."enum__pages_v_blocks_button_group_align";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_columns";
  DROP TYPE "public"."enum_theme_built_ins_text_on";
  DROP TYPE "public"."enum_theme_custom_colors_text_on";`)
}
