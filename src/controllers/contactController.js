const crypto = require('crypto');
const contacts = require('../data/contacts');

const requiredFields = ['name', 'phone'];

const matchesSearch = (contact, search) => {
  const q = search.toLowerCase();
  return ['name', 'email', 'phone', 'city'].some((field) =>
    (contact[field] || '').toLowerCase().includes(q),
  );
};

const validateBody = (body) => {
  const missing = requiredFields.filter((field) => !body[field]);
  if (missing.length) {
    return `Отсутствуют обязательные поля: ${missing.join(', ')}`;
  }
  return null;
};

const getContacts = (req, res) => {
  const { search, city } = req.query;
  let result = [...contacts];

  if (city) {
    result = result.filter(
      (contact) => contact.city && contact.city.toLowerCase() === city.toLowerCase(),
    );
  }

  if (search) {
    result = result.filter((contact) => matchesSearch(contact, search));
  }

  res.json({
    count: result.length,
    data: result,
  });
};

const getContactById = (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ message: 'Контакт не найден' });
  }
  res.json(contact);
};

const createContact = (req, res) => {
  const error = validateBody(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const newContact = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email || '',
    phone: req.body.phone,
    city: req.body.city || '',
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const idx = contacts.findIndex((c) => c.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Контакт не найден' });
  }

  const updated = {
    ...contacts[idx],
    ...req.body,
    id,
  };
  contacts[idx] = updated;
  res.json(updated);
};

const deleteContact = (req, res) => {
  const { id } = req.params;
  const idx = contacts.findIndex((c) => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Контакт не найден' });
  }
  const [removed] = contacts.splice(idx, 1);
  res.json({ message: 'Контакт удален', removed });
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};


