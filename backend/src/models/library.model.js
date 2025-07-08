const pool = require("../connection");

// GET all books (optionally filter)
exports.selectBooks = async ({
  status,
  genre,
  sort_by = "title",
  order = "asc",
} = {}) => {
  const validSort = ["title", "author", "page_count", "published_date"];
  const validOrder = ["asc", "desc"];
  if (!validSort.includes(sort_by)) sort_by = "title";
  if (!validOrder.includes(order.toLowerCase())) order = "asc";

  const clauses = [];
  const values = [];
  if (status) {
    values.push(status);
    clauses.push(`status = $${values.length}`);
  }
  if (genre) {
    values.push(genre);
    clauses.push(`$${values.length} = ANY(categories)`);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const sql = `
    SELECT *
      FROM books
    ${where}
    ORDER BY ${sort_by} ${order.toUpperCase()};
  `;

  const { rows } = await pool.query(sql, values);
  return rows;
};

// GET one book by id
exports.selectBookById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
  if (!rows.length) throw { status: 404, msg: "Book not found" };
  return rows[0];
};

// POST a new book
exports.insertBook = async (data) => {
  const {
    google_id,
    title,
    authors,
    published_date,
    info_link,
    description,
    page_count,
    thumbnail,
    categories = [],
    tags = [],
    status = null,
    rating = null,
    comments = null,
    start_date = null,
    finish_date = null,
  } = data;

  const sql = ` 
    INSERT INTO books
      (google_id,title,authors,published_date,info_link,description,
       page_count,thumbnail,categories,tags,status,rating,comments,
       start_date,finish_date)
    VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    RETURNING *;`;

  const values = [
    google_id,
    title,
    authors,
    published_date,
    info_link,
    description,
    page_count,
    thumbnail,
    categories,
    tags,
    status,
    rating,
    comments,
    start_date,
    finish_date,
  ];

  try {
    const { rows } = await pool.query(sql, values);
    return rows[0];
  } catch (err) {
    if (err.code === "23505") throw { status: 409, msg: "Book already exists" };
    throw err;
  }
};
// PATCH existing book
exports.updateBook = async (id, fields) => {
  const keys = Object.keys(fields);
  if (!keys.length) throw { status: 400, msg: "No fields to update" };
  const clauses = keys.map((k, i) => `${k} = $${i + 1}`);
  const values = keys.map((k) => fields[k]);
  values.push(id);

  const sql = `
    UPDATE books
    SET ${clauses.join(", ")}, updated_at = NOW()
    WHERE id = $${values.length}
    RETURNING *;
  `;

  const { rows } = await pool.query(sql, values);
  if (!rows.length) throw { status: 404, msg: "Book not found" };
  return rows[0];
};
// DELETE a book
exports.removeBook = async (id) => {
    const result = await pool.query('DELETE FROM books WHERE id = $1;', [id]);
    if (!result.rowCount) throw { status: 404, msg: 'Book not found' };
  };