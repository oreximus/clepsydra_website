import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_URL?.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
});

async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function initUsersTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

export async function initPostsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT DEFAULT '',
      content TEXT DEFAULT '',
      tags TEXT DEFAULT '[]',
      cover_image TEXT DEFAULT '',
      published INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

export async function initTables() {
  await initUsersTable();
  await initPostsTable();
}

export async function findUserByEmail(email: string) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

export async function findUserById(id: number) {
  const result = await query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0] || null;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  await query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
  );
}

export async function updateUserName(id: number, name: string) {
  await query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
}

export async function updateUserPassword(id: number, password: string) {
  await query("UPDATE users SET password = $1 WHERE id = $2", [password, id]);
}

export async function getPostsByUserId(userId: number) {
  const result = await query(
    "SELECT * FROM posts WHERE user_id = $1 ORDER BY updated_at DESC",
    [userId],
  );
  return result.rows;
}

export async function getPostBySlug(slug: string) {
  const result = await query("SELECT * FROM posts WHERE slug = $1", [slug]);
  return result.rows[0] || null;
}

export async function createPost(
  userId: number,
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  tags: string,
  coverImage: string,
) {
  await query(
    "INSERT INTO posts (user_id, slug, title, excerpt, content, tags, cover_image) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [userId, slug, title, excerpt, content, tags, coverImage],
  );
}

export async function updatePost(
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  tags: string,
  coverImage: string,
  published: number,
) {
  await query(
    "UPDATE posts SET title = $1, excerpt = $2, content = $3, tags = $4, cover_image = $5, published = $6, updated_at = NOW() WHERE slug = $7",
    [title, excerpt, content, tags, coverImage, published, slug],
  );
}

export async function deletePost(slug: string, userId: number) {
  await query("DELETE FROM posts WHERE slug = $1 AND user_id = $2", [
    slug,
    userId,
  ]);
}
