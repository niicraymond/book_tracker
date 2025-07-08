DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    google_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    authors TEXT[] NOT NULL,
    published_date DATE,
    info_link TEXT,
    description TEXT,
    page_count INT,
    thumbnail TEXT,
    categories TEXT[],
    tags TEXT,
    rating INT,
    comments TEXT,
    status TEXT,
    created_at     TIMESTAMPTZ  DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  DEFAULT NOW()
);