const db = require('../db');

const sectionsBySlugStmt = db.prepare(`
  SELECT section_key, heading, subheading, body, media, ctas, position
  FROM page_sections
  WHERE slug = ?
  ORDER BY position ASC
`);

function getPage(req, res) {
  const { slug } = req.params;
  const rows = sectionsBySlugStmt.all(slug);

  const sections = rows.map((row) => {
    let body;
    let media;
    let ctas;

    try {
      body = row.body ? JSON.parse(row.body) : null;
    } catch (err) {
      body = row.body;
    }

    try {
      media = row.media ? JSON.parse(row.media) : row.media;
    } catch (err) {
      media = row.media;
    }

    try {
      ctas = row.ctas ? JSON.parse(row.ctas) : null;
    } catch (err) {
      ctas = row.ctas;
    }

    return {
      key: row.section_key,
      heading: row.heading,
      subheading: row.subheading,
      body,
      media,
      ctas,
      position: row.position
    };
  });

  res.json({ slug, sections });
}

module.exports = {
  getPage
};
