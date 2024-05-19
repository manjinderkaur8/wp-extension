const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/whatsapp_extension', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const ContactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    notes: String,
    customFilter: String
});

const Contact = mongoose.model('Contact', ContactSchema);

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        const { name, phoneNumber, notes, customFilter } = req.body;
        const contact = new Contact({ name, phoneNumber, notes, customFilter });
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
