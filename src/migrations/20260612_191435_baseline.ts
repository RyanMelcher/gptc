import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_background" AS ENUM('marigold', 'bolt', 'leaf', 'magenta', 'paper', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_pages_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_pages_blocks_color_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_media_size" AS ENUM('inset', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_pages_blocks_embed_kind" AS ENUM('youtube', 'vimeo', 'iframe');
  CREATE TYPE "public"."enum_pages_blocks_embed_aspect" AS ENUM('16x9', '4x3', '1x1');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_background" AS ENUM('marigold', 'bolt', 'leaf', 'magenta', 'paper', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__pages_v_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__pages_v_blocks_color_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_media_size" AS ENUM('inset', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_kind" AS ENUM('youtube', 'vimeo', 'iframe');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_aspect" AS ENUM('16x9', '4x3', '1x1');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_artists_roles" AS ENUM('playwright', 'director', 'actor', 'staff');
  CREATE TYPE "public"."enum_plays_lifecycle" AS ENUM('in_development', 'produced', 'published');
  CREATE TYPE "public"."enum_plays_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__plays_v_version_lifecycle" AS ENUM('in_development', 'produced', 'published');
  CREATE TYPE "public"."enum__plays_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_productions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__productions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_type" AS ENUM('reading', 'workshop', 'festival', 'fundraiser', 'other');
  CREATE TYPE "public"."enum_news_blocks_hero_background" AS ENUM('marigold', 'bolt', 'leaf', 'magenta', 'paper', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_news_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_news_blocks_color_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_news_blocks_media_size" AS ENUM('inset', 'wide', 'full');
  CREATE TYPE "public"."enum_news_blocks_cta_tone" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_news_blocks_embed_kind" AS ENUM('youtube', 'vimeo', 'iframe');
  CREATE TYPE "public"."enum_news_blocks_embed_aspect" AS ENUM('16x9', '4x3', '1x1');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_blocks_hero_background" AS ENUM('marigold', 'bolt', 'leaf', 'magenta', 'paper', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__news_v_blocks_color_color" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__news_v_blocks_color_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__news_v_blocks_media_size" AS ENUM('inset', 'wide', 'full');
  CREATE TYPE "public"."enum__news_v_blocks_cta_tone" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum__news_v_blocks_embed_kind" AS ENUM('youtube', 'vimeo', 'iframe');
  CREATE TYPE "public"."enum__news_v_blocks_embed_aspect" AS ENUM('16x9', '4x3', '1x1');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_status_pills_tone" AS ENUM('ink', 'bolt', 'leaf', 'marigold', 'magenta', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_site_whats_on_tone" AS ENUM('paper', 'marigold', 'leaf', 'bolt', 'magenta', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TYPE "public"."enum_site_sponsors_items_tier" AS ENUM('lead', 'sponsor', 'individual');
  CREATE TYPE "public"."enum_site_socials_platform" AS ENUM('facebook', 'instagram', 'twitter', 'youtube', 'tiktok');
  CREATE TYPE "public"."enum_homepage_callout_tone" AS ENUM('bolt', 'leaf', 'marigold', 'magenta', 'ink', 'sage', 'mint', 'sky', 'periwinkle', 'butter');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"background" "enum_pages_blocks_hero_background" DEFAULT 'marigold',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_color" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"color" "enum_pages_blocks_color_color" DEFAULT 'bolt',
  	"align" "enum_pages_blocks_color_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"left_heading" varchar,
  	"left_body" varchar,
  	"left_image_id" integer,
  	"left_href" varchar,
  	"right_heading" varchar,
  	"right_body" varchar,
  	"right_image_id" integer,
  	"right_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"asset_id" integer,
  	"caption" varchar,
  	"size" "enum_pages_blocks_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"tone" "enum_pages_blocks_cta_tone" DEFAULT 'magenta',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_embed_kind" DEFAULT 'youtube',
  	"url" varchar,
  	"aspect" "enum_pages_blocks_embed_aspect" DEFAULT '16x9',
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"background" "enum__pages_v_blocks_hero_background" DEFAULT 'marigold',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_color" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"color" "enum__pages_v_blocks_color_color" DEFAULT 'bolt',
  	"align" "enum__pages_v_blocks_color_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"left_heading" varchar,
  	"left_body" varchar,
  	"left_image_id" integer,
  	"left_href" varchar,
  	"right_heading" varchar,
  	"right_body" varchar,
  	"right_image_id" integer,
  	"right_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"asset_id" integer,
  	"caption" varchar,
  	"size" "enum__pages_v_blocks_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"tone" "enum__pages_v_blocks_cta_tone" DEFAULT 'magenta',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_embed_kind" DEFAULT 'youtube',
  	"url" varchar,
  	"aspect" "enum__pages_v_blocks_embed_aspect" DEFAULT '16x9',
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "artists_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_artists_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "artists_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "artists" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"bio" jsonb,
  	"headshot_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "plays_themes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "plays_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"asset_id" integer
  );
  
  CREATE TABLE "plays" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"playwright_id" integer,
  	"synopsis" varchar,
  	"lifecycle" "enum_plays_lifecycle" DEFAULT 'in_development',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_plays_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_plays_v_version_themes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_plays_v_version_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"asset_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_plays_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_playwright_id" integer,
  	"version_synopsis" varchar,
  	"version_lifecycle" "enum__plays_v_version_lifecycle" DEFAULT 'in_development',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__plays_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "productions_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"asset_id" integer
  );
  
  CREATE TABLE "productions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"play_id" integer,
  	"season" varchar,
  	"year" numeric,
  	"venue" varchar,
  	"director_id" integer,
  	"starts_on" timestamp(3) with time zone,
  	"ends_on" timestamp(3) with time zone,
  	"program_id" integer,
  	"ticket_u_r_l" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_productions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "productions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"artists_id" integer
  );
  
  CREATE TABLE "_productions_v_version_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"asset_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_productions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_play_id" integer,
  	"version_season" varchar,
  	"version_year" numeric,
  	"version_venue" varchar,
  	"version_director_id" integer,
  	"version_starts_on" timestamp(3) with time zone,
  	"version_ends_on" timestamp(3) with time zone,
  	"version_program_id" integer,
  	"version_ticket_u_r_l" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__productions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_productions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"artists_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_events_type" DEFAULT 'other' NOT NULL,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone,
  	"venue" varchar,
  	"description" jsonb,
  	"ticket_u_r_l" varchar,
  	"hero_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "news_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"background" "enum_news_blocks_hero_background" DEFAULT 'marigold',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_color" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"color" "enum_news_blocks_color_color" DEFAULT 'bolt',
  	"align" "enum_news_blocks_color_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"left_heading" varchar,
  	"left_body" varchar,
  	"left_image_id" integer,
  	"left_href" varchar,
  	"right_heading" varchar,
  	"right_body" varchar,
  	"right_image_id" integer,
  	"right_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"asset_id" integer,
  	"caption" varchar,
  	"size" "enum_news_blocks_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"tone" "enum_news_blocks_cta_tone" DEFAULT 'magenta',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_news_blocks_embed_kind" DEFAULT 'youtube',
  	"url" varchar,
  	"aspect" "enum_news_blocks_embed_aspect" DEFAULT '16x9',
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"hero_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_news_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"background" "enum__news_v_blocks_hero_background" DEFAULT 'marigold',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_color" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"color" "enum__news_v_blocks_color_color" DEFAULT 'bolt',
  	"align" "enum__news_v_blocks_color_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"left_heading" varchar,
  	"left_body" varchar,
  	"left_image_id" integer,
  	"left_href" varchar,
  	"right_heading" varchar,
  	"right_body" varchar,
  	"right_image_id" integer,
  	"right_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"asset_id" integer,
  	"caption" varchar,
  	"size" "enum__news_v_blocks_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"tone" "enum__news_v_blocks_cta_tone" DEFAULT 'magenta',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__news_v_blocks_embed_kind" DEFAULT 'youtube',
  	"url" varchar,
  	"aspect" "enum__news_v_blocks_embed_aspect" DEFAULT '16x9',
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_hero_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"source" varchar DEFAULT 'site',
  	"token" varchar NOT NULL,
  	"confirmed_at" timestamp(3) with time zone,
  	"unsubscribed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"artists_id" integer,
  	"plays_id" integer,
  	"productions_id" integer,
  	"events_id" integer,
  	"news_id" integer,
  	"subscribers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_status_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"tone" "enum_site_status_pills_tone" DEFAULT 'ink'
  );
  
  CREATE TABLE "site_whats_on" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"image_id" integer,
  	"href" varchar NOT NULL,
  	"tone" "enum_site_whats_on_tone" DEFAULT 'paper'
  );
  
  CREATE TABLE "site_sponsors_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"href" varchar,
  	"tier" "enum_site_sponsors_items_tier" DEFAULT 'sponsor'
  );
  
  CREATE TABLE "site_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "site_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_socials_platform" NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_text" varchar DEFAULT 'GPTC',
  	"sponsors_heading" varchar DEFAULT 'Our programs are made possible through the generosity of our sponsors and many individual supporters.',
  	"sponsors_subheading" varchar,
  	"tagline" varchar DEFAULT 'New plays. New voices. Great Plains.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar DEFAULT 'New plays. New voices. Great Plains.' NOT NULL,
  	"hero_subhead" varchar,
  	"hero_video_id" integer,
  	"hero_poster_id" integer,
  	"hero_primary_cta_label" varchar DEFAULT 'Plan Your Visit',
  	"hero_primary_cta_href" varchar DEFAULT '/visit',
  	"hero_secondary_cta_label" varchar DEFAULT 'See What''s On',
  	"hero_secondary_cta_href" varchar DEFAULT '/events',
  	"upcoming_show_eyebrow" varchar DEFAULT 'Upcoming Show',
  	"upcoming_show_event_id" integer,
  	"upcoming_show_poster_id" integer,
  	"upcoming_show_cta_label" varchar DEFAULT 'Get Tickets',
  	"featured_play_eyebrow" varchar DEFAULT 'Featured Play',
  	"featured_play_play_id" integer,
  	"featured_play_image_id" integer,
  	"callout_eyebrow" varchar,
  	"callout_headline" varchar,
  	"callout_body" varchar,
  	"callout_tone" "enum_homepage_callout_tone" DEFAULT 'magenta',
  	"callout_cta_label" varchar,
  	"callout_cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_color" ADD CONSTRAINT "pages_blocks_color_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_up" ADD CONSTRAINT "pages_blocks_two_up_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_up" ADD CONSTRAINT "pages_blocks_two_up_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_up" ADD CONSTRAINT "pages_blocks_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_color" ADD CONSTRAINT "_pages_v_blocks_color_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_up" ADD CONSTRAINT "_pages_v_blocks_two_up_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_up" ADD CONSTRAINT "_pages_v_blocks_two_up_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_up" ADD CONSTRAINT "_pages_v_blocks_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "artists_roles" ADD CONSTRAINT "artists_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artists_links" ADD CONSTRAINT "artists_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "artists" ADD CONSTRAINT "artists_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plays_themes" ADD CONSTRAINT "plays_themes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plays_media" ADD CONSTRAINT "plays_media_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plays_media" ADD CONSTRAINT "plays_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plays" ADD CONSTRAINT "plays_playwright_id_artists_id_fk" FOREIGN KEY ("playwright_id") REFERENCES "public"."artists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_plays_v_version_themes" ADD CONSTRAINT "_plays_v_version_themes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plays_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plays_v_version_media" ADD CONSTRAINT "_plays_v_version_media_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_plays_v_version_media" ADD CONSTRAINT "_plays_v_version_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plays_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plays_v" ADD CONSTRAINT "_plays_v_parent_id_plays_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."plays"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_plays_v" ADD CONSTRAINT "_plays_v_version_playwright_id_artists_id_fk" FOREIGN KEY ("version_playwright_id") REFERENCES "public"."artists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "productions_photos" ADD CONSTRAINT "productions_photos_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "productions_photos" ADD CONSTRAINT "productions_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."productions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "productions" ADD CONSTRAINT "productions_play_id_plays_id_fk" FOREIGN KEY ("play_id") REFERENCES "public"."plays"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "productions" ADD CONSTRAINT "productions_director_id_artists_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."artists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "productions" ADD CONSTRAINT "productions_program_id_media_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "productions_rels" ADD CONSTRAINT "productions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."productions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "productions_rels" ADD CONSTRAINT "productions_rels_artists_fk" FOREIGN KEY ("artists_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_productions_v_version_photos" ADD CONSTRAINT "_productions_v_version_photos_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_productions_v_version_photos" ADD CONSTRAINT "_productions_v_version_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_productions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_productions_v" ADD CONSTRAINT "_productions_v_parent_id_productions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."productions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_productions_v" ADD CONSTRAINT "_productions_v_version_play_id_plays_id_fk" FOREIGN KEY ("version_play_id") REFERENCES "public"."plays"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_productions_v" ADD CONSTRAINT "_productions_v_version_director_id_artists_id_fk" FOREIGN KEY ("version_director_id") REFERENCES "public"."artists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_productions_v" ADD CONSTRAINT "_productions_v_version_program_id_media_id_fk" FOREIGN KEY ("version_program_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_productions_v_rels" ADD CONSTRAINT "_productions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_productions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_productions_v_rels" ADD CONSTRAINT "_productions_v_rels_artists_fk" FOREIGN KEY ("artists_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_tags" ADD CONSTRAINT "news_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_hero" ADD CONSTRAINT "news_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_color" ADD CONSTRAINT "news_blocks_color_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_rich_text" ADD CONSTRAINT "news_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_two_up" ADD CONSTRAINT "news_blocks_two_up_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_two_up" ADD CONSTRAINT "news_blocks_two_up_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_two_up" ADD CONSTRAINT "news_blocks_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_media" ADD CONSTRAINT "news_blocks_media_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_media" ADD CONSTRAINT "news_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_cta" ADD CONSTRAINT "news_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_quote" ADD CONSTRAINT "news_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_embed" ADD CONSTRAINT "news_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_version_tags" ADD CONSTRAINT "_news_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_hero" ADD CONSTRAINT "_news_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_color" ADD CONSTRAINT "_news_v_blocks_color_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_rich_text" ADD CONSTRAINT "_news_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_two_up" ADD CONSTRAINT "_news_v_blocks_two_up_left_image_id_media_id_fk" FOREIGN KEY ("left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_two_up" ADD CONSTRAINT "_news_v_blocks_two_up_right_image_id_media_id_fk" FOREIGN KEY ("right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_two_up" ADD CONSTRAINT "_news_v_blocks_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_media" ADD CONSTRAINT "_news_v_blocks_media_asset_id_media_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_media" ADD CONSTRAINT "_news_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_cta" ADD CONSTRAINT "_news_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_quote" ADD CONSTRAINT "_news_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_embed" ADD CONSTRAINT "_news_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_hero_id_media_id_fk" FOREIGN KEY ("version_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artists_fk" FOREIGN KEY ("artists_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_plays_fk" FOREIGN KEY ("plays_id") REFERENCES "public"."plays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_productions_fk" FOREIGN KEY ("productions_id") REFERENCES "public"."productions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_nav_links" ADD CONSTRAINT "site_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_status_pills" ADD CONSTRAINT "site_status_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_whats_on" ADD CONSTRAINT "site_whats_on_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_whats_on" ADD CONSTRAINT "site_whats_on_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_sponsors_items" ADD CONSTRAINT "site_sponsors_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_sponsors_items" ADD CONSTRAINT "site_sponsors_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_columns_links" ADD CONSTRAINT "site_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_columns" ADD CONSTRAINT "site_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_socials" ADD CONSTRAINT "site_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_poster_id_media_id_fk" FOREIGN KEY ("hero_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_upcoming_show_event_id_events_id_fk" FOREIGN KEY ("upcoming_show_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_upcoming_show_poster_id_media_id_fk" FOREIGN KEY ("upcoming_show_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_featured_play_play_id_plays_id_fk" FOREIGN KEY ("featured_play_play_id") REFERENCES "public"."plays"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_featured_play_image_id_media_id_fk" FOREIGN KEY ("featured_play_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_color_order_idx" ON "pages_blocks_color" USING btree ("_order");
  CREATE INDEX "pages_blocks_color_parent_id_idx" ON "pages_blocks_color" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_color_path_idx" ON "pages_blocks_color" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_up_order_idx" ON "pages_blocks_two_up" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_up_parent_id_idx" ON "pages_blocks_two_up" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_up_path_idx" ON "pages_blocks_two_up" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_up_left_left_image_idx" ON "pages_blocks_two_up" USING btree ("left_image_id");
  CREATE INDEX "pages_blocks_two_up_right_right_image_idx" ON "pages_blocks_two_up" USING btree ("right_image_id");
  CREATE INDEX "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_asset_idx" ON "pages_blocks_media" USING btree ("asset_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_color_order_idx" ON "_pages_v_blocks_color" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_color_parent_id_idx" ON "_pages_v_blocks_color" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_color_path_idx" ON "_pages_v_blocks_color" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_up_order_idx" ON "_pages_v_blocks_two_up" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_up_parent_id_idx" ON "_pages_v_blocks_two_up" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_up_path_idx" ON "_pages_v_blocks_two_up" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_up_left_left_image_idx" ON "_pages_v_blocks_two_up" USING btree ("left_image_id");
  CREATE INDEX "_pages_v_blocks_two_up_right_right_image_idx" ON "_pages_v_blocks_two_up" USING btree ("right_image_id");
  CREATE INDEX "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_asset_idx" ON "_pages_v_blocks_media" USING btree ("asset_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "artists_roles_order_idx" ON "artists_roles" USING btree ("order");
  CREATE INDEX "artists_roles_parent_idx" ON "artists_roles" USING btree ("parent_id");
  CREATE INDEX "artists_links_order_idx" ON "artists_links" USING btree ("_order");
  CREATE INDEX "artists_links_parent_id_idx" ON "artists_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "artists_slug_idx" ON "artists" USING btree ("slug");
  CREATE INDEX "artists_headshot_idx" ON "artists" USING btree ("headshot_id");
  CREATE INDEX "artists_updated_at_idx" ON "artists" USING btree ("updated_at");
  CREATE INDEX "artists_created_at_idx" ON "artists" USING btree ("created_at");
  CREATE INDEX "plays_themes_order_idx" ON "plays_themes" USING btree ("_order");
  CREATE INDEX "plays_themes_parent_id_idx" ON "plays_themes" USING btree ("_parent_id");
  CREATE INDEX "plays_media_order_idx" ON "plays_media" USING btree ("_order");
  CREATE INDEX "plays_media_parent_id_idx" ON "plays_media" USING btree ("_parent_id");
  CREATE INDEX "plays_media_asset_idx" ON "plays_media" USING btree ("asset_id");
  CREATE UNIQUE INDEX "plays_slug_idx" ON "plays" USING btree ("slug");
  CREATE INDEX "plays_playwright_idx" ON "plays" USING btree ("playwright_id");
  CREATE INDEX "plays_updated_at_idx" ON "plays" USING btree ("updated_at");
  CREATE INDEX "plays_created_at_idx" ON "plays" USING btree ("created_at");
  CREATE INDEX "plays__status_idx" ON "plays" USING btree ("_status");
  CREATE INDEX "_plays_v_version_themes_order_idx" ON "_plays_v_version_themes" USING btree ("_order");
  CREATE INDEX "_plays_v_version_themes_parent_id_idx" ON "_plays_v_version_themes" USING btree ("_parent_id");
  CREATE INDEX "_plays_v_version_media_order_idx" ON "_plays_v_version_media" USING btree ("_order");
  CREATE INDEX "_plays_v_version_media_parent_id_idx" ON "_plays_v_version_media" USING btree ("_parent_id");
  CREATE INDEX "_plays_v_version_media_asset_idx" ON "_plays_v_version_media" USING btree ("asset_id");
  CREATE INDEX "_plays_v_parent_idx" ON "_plays_v" USING btree ("parent_id");
  CREATE INDEX "_plays_v_version_version_slug_idx" ON "_plays_v" USING btree ("version_slug");
  CREATE INDEX "_plays_v_version_version_playwright_idx" ON "_plays_v" USING btree ("version_playwright_id");
  CREATE INDEX "_plays_v_version_version_updated_at_idx" ON "_plays_v" USING btree ("version_updated_at");
  CREATE INDEX "_plays_v_version_version_created_at_idx" ON "_plays_v" USING btree ("version_created_at");
  CREATE INDEX "_plays_v_version_version__status_idx" ON "_plays_v" USING btree ("version__status");
  CREATE INDEX "_plays_v_created_at_idx" ON "_plays_v" USING btree ("created_at");
  CREATE INDEX "_plays_v_updated_at_idx" ON "_plays_v" USING btree ("updated_at");
  CREATE INDEX "_plays_v_latest_idx" ON "_plays_v" USING btree ("latest");
  CREATE INDEX "_plays_v_autosave_idx" ON "_plays_v" USING btree ("autosave");
  CREATE INDEX "productions_photos_order_idx" ON "productions_photos" USING btree ("_order");
  CREATE INDEX "productions_photos_parent_id_idx" ON "productions_photos" USING btree ("_parent_id");
  CREATE INDEX "productions_photos_asset_idx" ON "productions_photos" USING btree ("asset_id");
  CREATE UNIQUE INDEX "productions_slug_idx" ON "productions" USING btree ("slug");
  CREATE INDEX "productions_play_idx" ON "productions" USING btree ("play_id");
  CREATE INDEX "productions_year_idx" ON "productions" USING btree ("year");
  CREATE INDEX "productions_director_idx" ON "productions" USING btree ("director_id");
  CREATE INDEX "productions_program_idx" ON "productions" USING btree ("program_id");
  CREATE INDEX "productions_updated_at_idx" ON "productions" USING btree ("updated_at");
  CREATE INDEX "productions_created_at_idx" ON "productions" USING btree ("created_at");
  CREATE INDEX "productions__status_idx" ON "productions" USING btree ("_status");
  CREATE INDEX "productions_rels_order_idx" ON "productions_rels" USING btree ("order");
  CREATE INDEX "productions_rels_parent_idx" ON "productions_rels" USING btree ("parent_id");
  CREATE INDEX "productions_rels_path_idx" ON "productions_rels" USING btree ("path");
  CREATE INDEX "productions_rels_artists_id_idx" ON "productions_rels" USING btree ("artists_id");
  CREATE INDEX "_productions_v_version_photos_order_idx" ON "_productions_v_version_photos" USING btree ("_order");
  CREATE INDEX "_productions_v_version_photos_parent_id_idx" ON "_productions_v_version_photos" USING btree ("_parent_id");
  CREATE INDEX "_productions_v_version_photos_asset_idx" ON "_productions_v_version_photos" USING btree ("asset_id");
  CREATE INDEX "_productions_v_parent_idx" ON "_productions_v" USING btree ("parent_id");
  CREATE INDEX "_productions_v_version_version_slug_idx" ON "_productions_v" USING btree ("version_slug");
  CREATE INDEX "_productions_v_version_version_play_idx" ON "_productions_v" USING btree ("version_play_id");
  CREATE INDEX "_productions_v_version_version_year_idx" ON "_productions_v" USING btree ("version_year");
  CREATE INDEX "_productions_v_version_version_director_idx" ON "_productions_v" USING btree ("version_director_id");
  CREATE INDEX "_productions_v_version_version_program_idx" ON "_productions_v" USING btree ("version_program_id");
  CREATE INDEX "_productions_v_version_version_updated_at_idx" ON "_productions_v" USING btree ("version_updated_at");
  CREATE INDEX "_productions_v_version_version_created_at_idx" ON "_productions_v" USING btree ("version_created_at");
  CREATE INDEX "_productions_v_version_version__status_idx" ON "_productions_v" USING btree ("version__status");
  CREATE INDEX "_productions_v_created_at_idx" ON "_productions_v" USING btree ("created_at");
  CREATE INDEX "_productions_v_updated_at_idx" ON "_productions_v" USING btree ("updated_at");
  CREATE INDEX "_productions_v_latest_idx" ON "_productions_v" USING btree ("latest");
  CREATE INDEX "_productions_v_autosave_idx" ON "_productions_v" USING btree ("autosave");
  CREATE INDEX "_productions_v_rels_order_idx" ON "_productions_v_rels" USING btree ("order");
  CREATE INDEX "_productions_v_rels_parent_idx" ON "_productions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_productions_v_rels_path_idx" ON "_productions_v_rels" USING btree ("path");
  CREATE INDEX "_productions_v_rels_artists_id_idx" ON "_productions_v_rels" USING btree ("artists_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_starts_at_idx" ON "events" USING btree ("starts_at");
  CREATE INDEX "events_hero_idx" ON "events" USING btree ("hero_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "news_tags_order_idx" ON "news_tags" USING btree ("_order");
  CREATE INDEX "news_tags_parent_id_idx" ON "news_tags" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_hero_order_idx" ON "news_blocks_hero" USING btree ("_order");
  CREATE INDEX "news_blocks_hero_parent_id_idx" ON "news_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_hero_path_idx" ON "news_blocks_hero" USING btree ("_path");
  CREATE INDEX "news_blocks_color_order_idx" ON "news_blocks_color" USING btree ("_order");
  CREATE INDEX "news_blocks_color_parent_id_idx" ON "news_blocks_color" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_color_path_idx" ON "news_blocks_color" USING btree ("_path");
  CREATE INDEX "news_blocks_rich_text_order_idx" ON "news_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "news_blocks_rich_text_parent_id_idx" ON "news_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_rich_text_path_idx" ON "news_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "news_blocks_two_up_order_idx" ON "news_blocks_two_up" USING btree ("_order");
  CREATE INDEX "news_blocks_two_up_parent_id_idx" ON "news_blocks_two_up" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_two_up_path_idx" ON "news_blocks_two_up" USING btree ("_path");
  CREATE INDEX "news_blocks_two_up_left_left_image_idx" ON "news_blocks_two_up" USING btree ("left_image_id");
  CREATE INDEX "news_blocks_two_up_right_right_image_idx" ON "news_blocks_two_up" USING btree ("right_image_id");
  CREATE INDEX "news_blocks_media_order_idx" ON "news_blocks_media" USING btree ("_order");
  CREATE INDEX "news_blocks_media_parent_id_idx" ON "news_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_media_path_idx" ON "news_blocks_media" USING btree ("_path");
  CREATE INDEX "news_blocks_media_asset_idx" ON "news_blocks_media" USING btree ("asset_id");
  CREATE INDEX "news_blocks_cta_order_idx" ON "news_blocks_cta" USING btree ("_order");
  CREATE INDEX "news_blocks_cta_parent_id_idx" ON "news_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_cta_path_idx" ON "news_blocks_cta" USING btree ("_path");
  CREATE INDEX "news_blocks_quote_order_idx" ON "news_blocks_quote" USING btree ("_order");
  CREATE INDEX "news_blocks_quote_parent_id_idx" ON "news_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_quote_path_idx" ON "news_blocks_quote" USING btree ("_path");
  CREATE INDEX "news_blocks_embed_order_idx" ON "news_blocks_embed" USING btree ("_order");
  CREATE INDEX "news_blocks_embed_parent_id_idx" ON "news_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_embed_path_idx" ON "news_blocks_embed" USING btree ("_path");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_hero_idx" ON "news" USING btree ("hero_id");
  CREATE INDEX "news_published_at_idx" ON "news" USING btree ("published_at");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "_news_v_version_tags_order_idx" ON "_news_v_version_tags" USING btree ("_order");
  CREATE INDEX "_news_v_version_tags_parent_id_idx" ON "_news_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_hero_order_idx" ON "_news_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_hero_parent_id_idx" ON "_news_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_hero_path_idx" ON "_news_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_color_order_idx" ON "_news_v_blocks_color" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_color_parent_id_idx" ON "_news_v_blocks_color" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_color_path_idx" ON "_news_v_blocks_color" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_rich_text_order_idx" ON "_news_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_rich_text_parent_id_idx" ON "_news_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_rich_text_path_idx" ON "_news_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_two_up_order_idx" ON "_news_v_blocks_two_up" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_two_up_parent_id_idx" ON "_news_v_blocks_two_up" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_two_up_path_idx" ON "_news_v_blocks_two_up" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_two_up_left_left_image_idx" ON "_news_v_blocks_two_up" USING btree ("left_image_id");
  CREATE INDEX "_news_v_blocks_two_up_right_right_image_idx" ON "_news_v_blocks_two_up" USING btree ("right_image_id");
  CREATE INDEX "_news_v_blocks_media_order_idx" ON "_news_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_media_parent_id_idx" ON "_news_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_media_path_idx" ON "_news_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_media_asset_idx" ON "_news_v_blocks_media" USING btree ("asset_id");
  CREATE INDEX "_news_v_blocks_cta_order_idx" ON "_news_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_cta_parent_id_idx" ON "_news_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_cta_path_idx" ON "_news_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_quote_order_idx" ON "_news_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_quote_parent_id_idx" ON "_news_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_quote_path_idx" ON "_news_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_embed_order_idx" ON "_news_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_embed_parent_id_idx" ON "_news_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_embed_path_idx" ON "_news_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_hero_idx" ON "_news_v" USING btree ("version_hero_id");
  CREATE INDEX "_news_v_version_version_published_at_idx" ON "_news_v" USING btree ("version_published_at");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_token_idx" ON "subscribers" USING btree ("token");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_artists_id_idx" ON "payload_locked_documents_rels" USING btree ("artists_id");
  CREATE INDEX "payload_locked_documents_rels_plays_id_idx" ON "payload_locked_documents_rels" USING btree ("plays_id");
  CREATE INDEX "payload_locked_documents_rels_productions_id_idx" ON "payload_locked_documents_rels" USING btree ("productions_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_nav_links_order_idx" ON "site_nav_links" USING btree ("_order");
  CREATE INDEX "site_nav_links_parent_id_idx" ON "site_nav_links" USING btree ("_parent_id");
  CREATE INDEX "site_status_pills_order_idx" ON "site_status_pills" USING btree ("_order");
  CREATE INDEX "site_status_pills_parent_id_idx" ON "site_status_pills" USING btree ("_parent_id");
  CREATE INDEX "site_whats_on_order_idx" ON "site_whats_on" USING btree ("_order");
  CREATE INDEX "site_whats_on_parent_id_idx" ON "site_whats_on" USING btree ("_parent_id");
  CREATE INDEX "site_whats_on_image_idx" ON "site_whats_on" USING btree ("image_id");
  CREATE INDEX "site_sponsors_items_order_idx" ON "site_sponsors_items" USING btree ("_order");
  CREATE INDEX "site_sponsors_items_parent_id_idx" ON "site_sponsors_items" USING btree ("_parent_id");
  CREATE INDEX "site_sponsors_items_logo_idx" ON "site_sponsors_items" USING btree ("logo_id");
  CREATE INDEX "site_footer_columns_links_order_idx" ON "site_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_footer_columns_links_parent_id_idx" ON "site_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_footer_columns_order_idx" ON "site_footer_columns" USING btree ("_order");
  CREATE INDEX "site_footer_columns_parent_id_idx" ON "site_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_socials_order_idx" ON "site_socials" USING btree ("_order");
  CREATE INDEX "site_socials_parent_id_idx" ON "site_socials" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_video_idx" ON "homepage" USING btree ("hero_video_id");
  CREATE INDEX "homepage_hero_hero_poster_idx" ON "homepage" USING btree ("hero_poster_id");
  CREATE INDEX "homepage_upcoming_show_upcoming_show_event_idx" ON "homepage" USING btree ("upcoming_show_event_id");
  CREATE INDEX "homepage_upcoming_show_upcoming_show_poster_idx" ON "homepage" USING btree ("upcoming_show_poster_id");
  CREATE INDEX "homepage_featured_play_featured_play_play_idx" ON "homepage" USING btree ("featured_play_play_id");
  CREATE INDEX "homepage_featured_play_featured_play_image_idx" ON "homepage" USING btree ("featured_play_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_color" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_two_up" CASCADE;
  DROP TABLE "pages_blocks_media" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_color" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_two_up" CASCADE;
  DROP TABLE "_pages_v_blocks_media" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "artists_roles" CASCADE;
  DROP TABLE "artists_links" CASCADE;
  DROP TABLE "artists" CASCADE;
  DROP TABLE "plays_themes" CASCADE;
  DROP TABLE "plays_media" CASCADE;
  DROP TABLE "plays" CASCADE;
  DROP TABLE "_plays_v_version_themes" CASCADE;
  DROP TABLE "_plays_v_version_media" CASCADE;
  DROP TABLE "_plays_v" CASCADE;
  DROP TABLE "productions_photos" CASCADE;
  DROP TABLE "productions" CASCADE;
  DROP TABLE "productions_rels" CASCADE;
  DROP TABLE "_productions_v_version_photos" CASCADE;
  DROP TABLE "_productions_v" CASCADE;
  DROP TABLE "_productions_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "news_tags" CASCADE;
  DROP TABLE "news_blocks_hero" CASCADE;
  DROP TABLE "news_blocks_color" CASCADE;
  DROP TABLE "news_blocks_rich_text" CASCADE;
  DROP TABLE "news_blocks_two_up" CASCADE;
  DROP TABLE "news_blocks_media" CASCADE;
  DROP TABLE "news_blocks_cta" CASCADE;
  DROP TABLE "news_blocks_quote" CASCADE;
  DROP TABLE "news_blocks_embed" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "_news_v_version_tags" CASCADE;
  DROP TABLE "_news_v_blocks_hero" CASCADE;
  DROP TABLE "_news_v_blocks_color" CASCADE;
  DROP TABLE "_news_v_blocks_rich_text" CASCADE;
  DROP TABLE "_news_v_blocks_two_up" CASCADE;
  DROP TABLE "_news_v_blocks_media" CASCADE;
  DROP TABLE "_news_v_blocks_cta" CASCADE;
  DROP TABLE "_news_v_blocks_quote" CASCADE;
  DROP TABLE "_news_v_blocks_embed" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_nav_links" CASCADE;
  DROP TABLE "site_status_pills" CASCADE;
  DROP TABLE "site_whats_on" CASCADE;
  DROP TABLE "site_sponsors_items" CASCADE;
  DROP TABLE "site_footer_columns_links" CASCADE;
  DROP TABLE "site_footer_columns" CASCADE;
  DROP TABLE "site_socials" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_background";
  DROP TYPE "public"."enum_pages_blocks_color_color";
  DROP TYPE "public"."enum_pages_blocks_color_align";
  DROP TYPE "public"."enum_pages_blocks_media_size";
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_pages_blocks_embed_kind";
  DROP TYPE "public"."enum_pages_blocks_embed_aspect";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_color_color";
  DROP TYPE "public"."enum__pages_v_blocks_color_align";
  DROP TYPE "public"."enum__pages_v_blocks_media_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__pages_v_blocks_embed_kind";
  DROP TYPE "public"."enum__pages_v_blocks_embed_aspect";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_artists_roles";
  DROP TYPE "public"."enum_plays_lifecycle";
  DROP TYPE "public"."enum_plays_status";
  DROP TYPE "public"."enum__plays_v_version_lifecycle";
  DROP TYPE "public"."enum__plays_v_version_status";
  DROP TYPE "public"."enum_productions_status";
  DROP TYPE "public"."enum__productions_v_version_status";
  DROP TYPE "public"."enum_events_type";
  DROP TYPE "public"."enum_news_blocks_hero_background";
  DROP TYPE "public"."enum_news_blocks_color_color";
  DROP TYPE "public"."enum_news_blocks_color_align";
  DROP TYPE "public"."enum_news_blocks_media_size";
  DROP TYPE "public"."enum_news_blocks_cta_tone";
  DROP TYPE "public"."enum_news_blocks_embed_kind";
  DROP TYPE "public"."enum_news_blocks_embed_aspect";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_blocks_hero_background";
  DROP TYPE "public"."enum__news_v_blocks_color_color";
  DROP TYPE "public"."enum__news_v_blocks_color_align";
  DROP TYPE "public"."enum__news_v_blocks_media_size";
  DROP TYPE "public"."enum__news_v_blocks_cta_tone";
  DROP TYPE "public"."enum__news_v_blocks_embed_kind";
  DROP TYPE "public"."enum__news_v_blocks_embed_aspect";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_site_status_pills_tone";
  DROP TYPE "public"."enum_site_whats_on_tone";
  DROP TYPE "public"."enum_site_sponsors_items_tier";
  DROP TYPE "public"."enum_site_socials_platform";
  DROP TYPE "public"."enum_homepage_callout_tone";`)
}
