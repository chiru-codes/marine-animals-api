const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener a todos los animales marinos
router.get('/', (req, res) => {
  db.all('SELECT * FROM marine_animals', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener a un animal marino por ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM marine_animals WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'No encontrado' });
    res.json(row);
  });
});

// Crear un nuevo animal marino
router.post('/', express.json(), (req, res) => {
  const { name, species, habitat } = req.body;
  db.run(
    `INSERT INTO marine_animals (name, species, habitat) VALUES (?, ?, ?)`,
    [name, species, habitat],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Actualizar un animal marino
router.put('/:id', express.json(), (req, res) => {
  const { name, species, habitat } = req.body;
  db.run(
    `UPDATE marine_animals SET name = ?, species = ?, habitat = ? WHERE id = ?`,
    [name, species, habitat, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Eliminar un animal marino
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM marine_animals WHERE id = ?`, req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
