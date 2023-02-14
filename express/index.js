var cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const { Client, RemoteAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const log = require('log-beautify');

var client = null;

async function start() {
    log.warn('Iniciando el servidor de express');
    await mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://admin:pinonfijo@192.168.0.170:17027/wapweb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin'
    });

    const store = new MongoStore({ mongoose: mongoose });
    log.warn('Iniciando el cliente de whatsapp');
    client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 60000
        })
    });

    client.on('authenticated', (session) => {
        try {
            log.success('Autenticado correctamente');
        } catch (error) {
            console.log(error);
        }
    });

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    client.on('message', (message) => {
        console.log(message);
        if (message.body.toLocaleLowerCase() === 'ping') {
            client.sendMessage(message.from, 'Hola hermosa mía... te amo.');

            // const productsList = new List(
            //   "Adivina cuanta guita vamos a hacer",
            //   "Ver opciones",
            //   [
            //     {
            //       title: "Guitarras",
            //       rows: [
            //         { id: "apple", title: "1Millon" },
            //         { id: "mango", title: "2Millones" },
            //         { id: "banana", title: "Crhes Miones diria maxi" },
            //       ],
            //     },
            //   ],
            //   "Seleccione una opcion"
            // );
            // client.sendMessage(message.from, productsList);
        }
    });

    client.initialize();
}

start();

app.get('/api/contacts', async (req, res) => {
    const contacts = await client.getContacts();
    var ccc = [];
    for await (contact of contacts) {
        if (contact.isMyContact) {
            const cc = {
                id: contact.id,
                isBlocked: contact.isBlocked,
                isBusiness: contact.isBusiness,
                isGroup: contact.isGroup,
                isMe: contact.isMe,
                isMyContact: contact.isMyContact,
                isUser: contact.isUser,
                isWAContact: contact.isWAContact,
                name: contact.name,
                number: contact.number,
                pushname: contact.pushname,
                shortName: contact.shortName,
                formattedNumber: await contact.getFormattedNumber(),
                profilePicUrl: await contact.getProfilePicUrl()
            };
            ccc.push(cc);
        }
    }

    return res.send(ccc);
});

app.listen(3001, () => {
    log.success('El servidor está escuchando en el puerto 3000');
});
