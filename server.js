// console.log("--- [1] Server script starting ---");

// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();
// const { Client } = require('pg');

// console.log("--- [2] Dependencies loaded ---");

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(express.json());

// const dbConfig = {
//   user: process.env.PG_USER,
//   host: '127.0.0.1',
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// };

// console.log("--- [3] Database config loaded ---");

// // === API ENDPOINTS ===

// // --- Children Endpoints ---
// app.get('/children', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const result = await client.query('SELECT * FROM children ORDER BY id DESC');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('--- ERROR fetching children:', error.stack);
//         res.status(500).json({ message: 'Failed to fetch children.' });
//     } finally {
//         await client.end();
//     }
// });
// app.post('/children', async (req, res) => {
//   const client = new Client(dbConfig);
//   try {
//     await client.connect();
//     const { childName, childDob, childGender } = req.body;
//     const result = await client.query(
//       'INSERT INTO children (child_name, dob, gender) VALUES ($1, $2, $3) RETURNING *',
//       [childName, childDob, childGender]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('--- ERROR adding child:', error.stack);
//     res.status(500).json({ message: 'Database operation failed.' });
//   } finally {
//     await client.end();
//   }
// });
// app.put('/children/:id', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const { id } = req.params;
//         const { childName, childDob, childGender } = req.body;
//         const result = await client.query(
//             'UPDATE children SET child_name = $1, dob = $2, gender = $3 WHERE id = $4 RETURNING *',
//             [childName, childDob, childGender, id]
//         );
//         if (result.rows.length === 0) {
//             return res.status(404).json({ message: 'Child not found.' });
//         }
//         res.status(200).json(result.rows[0]);
//     } catch (error) {
//         console.error('--- ERROR updating child:', error.stack);
//         res.status(500).json({ message: 'Failed to update child.' });
//     } finally {
//         await client.end();
//     }
// });
// app.delete('/children/:id', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const { id } = req.params;
//         const result = await client.query('DELETE FROM children WHERE id = $1 RETURNING *', [id]);
//         if (result.rowCount === 0) {
//             return res.status(404).json({ message: 'Child not found.' });
//         }
//         res.status(200).json({ message: 'Child deleted successfully.' });
//     } catch (error) {
//         console.error('--- ERROR deleting child:', error.stack);
//         res.status(500).json({ message: 'Failed to delete child.' });
//     } finally {
//         await client.end();
//     }
// });

// // --- Doctor Endpoints ---
// app.get('/doctors', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const result = await client.query('SELECT * FROM doctors ORDER BY doctor_name ASC');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('--- ERROR fetching doctors:', error.stack);
//         res.status(500).json({ message: 'Failed to fetch doctors.' });
//     } finally {
//         await client.end();
//     }
// });

// // --- Session Endpoints ---
// app.get('/sessions', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const result = await client.query(`
//             SELECT s.id, s.session_date, s.notes, c.child_name, d.doctor_name 
//             FROM sessions s
//             JOIN children c ON s.child_id = c.id
//             LEFT JOIN doctors d ON s.doctor_id = d.id
//             ORDER BY s.session_date DESC
//         `);
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('--- ERROR fetching sessions:', error.stack);
//         res.status(500).json({ message: 'Failed to fetch sessions.' });
//     } finally {
//         await client.end();
//     }
// });
// // In server.js

// // POST a new session (with monthly validation)
// app.post('/sessions', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const { childId, doctorId, sessionDate, notes } = req.body;
//         if (!childId || !doctorId || !sessionDate) {
//             return res.status(400).json({ message: 'Child, Doctor, and Date are required.' });
//         }

//         // --- NEW VALIDATION LOGIC ---
//         // 1. Count existing sessions for the selected child IN THE SAME MONTH.
//         // The DATE_TRUNC function is a standard SQL way to get the first day of the month.
//         const countResult = await client.query(
//             `SELECT COUNT(*) FROM sessions 
//              WHERE child_id = $1 AND DATE_TRUNC('month', session_date) = DATE_TRUNC('month', $2::date)`,
//             [childId, sessionDate]
//         );
//         const sessionCount = parseInt(countResult.rows[0].count, 10);

//         // 2. Check if the limit has been reached
//         if (sessionCount >= 2) {
//             return res.status(400).json({ message: 'Validation Error: This child has already booked the maximum of 2 sessions for this month.' });
//         }
//         // --- END VALIDATION ---

//         // 3. If validation passes, insert the new session
//         const result = await client.query(
//             'INSERT INTO sessions (child_id, doctor_id, session_date, notes) VALUES ($1, $2, $3, $4) RETURNING *',
//             [childId, doctorId, sessionDate, notes]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error('--- ERROR creating session:', error.stack);
//         res.status(500).json({ message: 'Failed to create session.' });
//     } finally {
//         await client.end();
//     }
// });

// app.listen(port, () => {
//     console.log(`--- [4] ✅ Server is listening on http://localhost:${port} ---`);
// });






// CODE 2//
// console.log("--- [1] Server script starting ---");

// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();
// const { Client } = require('pg');

// console.log("--- [2] Dependencies loaded ---");

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(express.json());

// const dbConfig = {
//   user: process.env.PG_USER,
//   host: '127.0.0.1',
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// };

// console.log("--- [3] Database config loaded ---");

// // === API ENDPOINTS ===

// // --- Children Endpoints ---
// app.get('/children', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const result = await client.query('SELECT * FROM children ORDER BY id DESC');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('--- ERROR fetching children:', error.stack);
//         res.status(500).json({ message: 'Failed to fetch children.' });
//     } finally {
//         await client.end();
//     }
// });
// app.post('/children', async (req, res) => {
//   const client = new Client(dbConfig);
//   try {
//     await client.connect();
//     const { childName, childDob, childGender } = req.body;
//     const result = await client.query(
//       'INSERT INTO children (child_name, dob, gender) VALUES ($1, $2, $3) RETURNING *',
//       [childName, childDob, childGender]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('--- ERROR adding child:', error.stack);
//     res.status(500).json({ message: 'Database operation failed.' });
//   } finally {
//     await client.end();
//   }
// });
// app.put('/children/:id', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const { id } = req.params;
//         const { childName, childDob, childGender } = req.body;
//         const result = await client.query(
//             'UPDATE children SET child_name = $1, dob = $2, gender = $3 WHERE id = $4 RETURNING *',
//             [childName, childDob, childGender, id]
//         );
//         if (result.rows.length === 0) {
//             return res.status(404).json({ message: 'Child not found.' });
//         }
//         res.status(200).json(result.rows[0]);
//     } catch (error) {
//         console.error('--- ERROR updating child:', error.stack);
//         res.status(500).json({ message: 'Failed to update child.' });
//     } finally {
//         await client.end();
//     }
// });
// app.delete('/children/:id', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const { id } = req.params;
//         const result = await client.query('DELETE FROM children WHERE id = $1 RETURNING *', [id]);
//         if (result.rowCount === 0) {
//             return res.status(404).json({ message: 'Child not found.' });
//         }
//         res.status(200).json({ message: 'Child deleted successfully.' });
//     } catch (error) {
//         console.error('--- ERROR deleting child:', error.stack);
//         res.status(500).json({ message: 'Failed to delete child.' });
//     } finally {
//         await client.end();
//     }
// });

// // --- Doctor Endpoints ---
// app.get('/doctors', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const result = await client.query('SELECT * FROM doctors ORDER BY doctor_name ASC');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('--- ERROR fetching doctors:', error.stack);
//         res.status(500).json({ message: 'Failed to fetch doctors.' });
//     } finally {
//         await client.end();
//     }
// });

// // --- Session Endpoints ---
// app.get('/sessions', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const result = await client.query(`
//             SELECT 
//                 s.id, 
//                 s.session_date, 
//                 s.notes, 
//                 c.child_name, 
//                 d.doctor_name,
//                 s.child_id
//             FROM sessions s
//             JOIN children c ON s.child_id = c.id
//             LEFT JOIN doctors d ON s.doctor_id = d.id
//             ORDER BY s.session_date DESC
//         `);
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('--- ERROR fetching sessions:', error.stack);
//         res.status(500).json({ message: 'Failed to fetch sessions.' });
//     } finally {
//         await client.end();
//     }
// });
// app.post('/sessions', async (req, res) => {
//     const client = new Client(dbConfig);
//     try {
//         await client.connect();
//         const { childId, doctorId, sessionDate, notes } = req.body;
//         if (!childId || !doctorId || !sessionDate) {
//             return res.status(400).json({ message: 'Child, Doctor, and Date are required.' });
//         }
        
//         const countResult = await client.query(
//             `SELECT COUNT(*) FROM sessions WHERE child_id = $1 AND DATE_TRUNC('month', session_date) = DATE_TRUNC('month', $2::date)`,
//             [childId, sessionDate]
//         );
//         const sessionCount = parseInt(countResult.rows[0].count, 10);

//         if (sessionCount >= 2) {
//             return res.status(400).json({ message: 'Validation Error: This child has already booked the maximum of 2 sessions for this month.' });
//         }
        
//         const result = await client.query(
//             'INSERT INTO sessions (child_id, doctor_id, session_date, notes) VALUES ($1, $2, $3, $4) RETURNING *',
//             [childId, doctorId, sessionDate, notes]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error('--- ERROR creating session:', error.stack);
//         res.status(500).json({ message: 'Failed to create session.' });
//     } finally {
//         await client.end();
//     }
// });

// // --- WhatsApp Endpoint ---
// app.post('/send-message', async (req, res) => {
//     console.log("--- Received POST /send-message request ---");
//     const { to, message } = req.body;
//     const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
//     const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

//     if (!to || !message || !WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
//         return res.status(400).json({ message: 'Missing required information for WhatsApp.' });
//     }

//     const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
//     const data = {
//         messaging_product: 'whatsapp',
//         to: to,
//         type: 'text',
//         text: { body: message }
//     };
//     const headers = {
//         'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
//         'Content-Type': 'application/json'
//     };

//     try {
//         await axios.post(url, data, { headers });
//         console.log("--- WhatsApp message sent successfully ---");
//         res.status(200).json({ message: 'Message sent successfully!' });
//     } catch (error) {
//         const errorMessage = error.response ? error.response.data.error.message : error.message;
//         console.error('--- ERROR sending WhatsApp message:', errorMessage);
//         res.status(500).json({ message: `Failed to send message: ${errorMessage}` });
//     }
// });


// app.listen(port, () => {
//     console.log(`--- [4] ✅ Server is listening on http://localhost:${port} ---`);
// });






//AWS CODE//

// server.js - Final version with all features
console.log("--- [1] Server script starting ---");

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { Client } = require('pg');
const path = require('path'); // <-- CHANGE 1: Import the 'path' module

console.log("--- [2] Dependencies loaded ---");

const app = express();
// CHANGE 2: Use the port provided by AWS, or 4000 for local development
const port = process.env.PORT || 4000; 

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.PG_USER,
  host: '127.0.0.1', // This will be overridden by PG_HOST from your .env file on AWS
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

console.log("--- [3] Database config loaded ---");

// --- CHANGE 3: SERVE THE REACT APP'S STATIC FILES ---
// This tells Express to look in the 'build' folder for the website's files.
app.use(express.static(path.join(__dirname, 'build')));


// === API ENDPOINTS ===
// --- Children Endpoints ---
app.get('/children', async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM children ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('--- ERROR fetching children:', error.stack);
        res.status(500).json({ message: 'Failed to fetch children.' });
    } finally {
        await client.end();
    }
});

app.post('/children', async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const { childName, childDob, childGender } = req.body;
    const result = await client.query(
      'INSERT INTO children (child_name, dob, gender) VALUES ($1, $2, $3) RETURNING *',
      [childName, childDob, childGender]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('--- ERROR adding child:', error.stack);
    res.status(500).json({ message: 'Database operation failed.' });
  } finally {
    await client.end();
  }
});

app.put('/children/:id', async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const { id } = req.params;
        const { childName, childDob, childGender } = req.body;
        const result = await client.query(
            'UPDATE children SET child_name = $1, dob = $2, gender = $3 WHERE id = $4 RETURNING *',
            [childName, childDob, childGender, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Child not found.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('--- ERROR updating child:', error.stack);
        res.status(500).json({ message: 'Failed to update child.' });
    } finally {
        await client.end();
    }
});

app.delete('/children/:id', async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const { id } = req.params;
        const result = await client.query('DELETE FROM children WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Child not found.' });
        }
        res.status(200).json({ message: 'Child deleted successfully.' });
    } catch (error) {
        console.error('--- ERROR deleting child:', error.stack);
        res.status(500).json({ message: 'Failed to delete child.' });
    } finally {
        await client.end();
    }
});


// --- Doctor Endpoints ---
app.get('/doctors', async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM doctors ORDER BY doctor_name ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('--- ERROR fetching doctors:', error.stack);
        res.status(500).json({ message: 'Failed to fetch doctors.' });
    } finally {
        await client.end();
    }
});

// --- Session Endpoints ---
app.get('/sessions', async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const result = await client.query(`
            SELECT 
                s.id, 
                s.session_date, 
                s.notes, 
                c.child_name, 
                d.doctor_name,
                s.child_id
            FROM sessions s
            JOIN children c ON s.child_id = c.id
            LEFT JOIN doctors d ON s.doctor_id = d.id
            ORDER BY s.session_date DESC
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('--- ERROR fetching sessions:', error.stack);
        res.status(500).json({ message: 'Failed to fetch sessions.' });
    } finally {
        await client.end();
    }
});

app.post('/sessions', async (req, res) => {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const { childId, doctorId, sessionDate, notes } = req.body;
        if (!childId || !doctorId || !sessionDate) {
            return res.status(400).json({ message: 'Child, Doctor, and Date are required.' });
        }
        
        const countResult = await client.query(
            `SELECT COUNT(*) FROM sessions WHERE child_id = $1 AND DATE_TRUNC('month', session_date) = DATE_TRUNC('month', $2::date)`,
            [childId, sessionDate]
        );
        const sessionCount = parseInt(countResult.rows[0].count, 10);

        if (sessionCount >= 2) {
            return res.status(400).json({ message: 'Validation Error: This child has already booked the maximum of 2 sessions for this month.' });
        }
        
        const result = await client.query(
            'INSERT INTO sessions (child_id, doctor_id, session_date, notes) VALUES ($1, $2, $3, $4) RETURNING *',
            [childId, doctorId, sessionDate, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('--- ERROR creating session:', error.stack);
        res.status(500).json({ message: 'Failed to create session.' });
    } finally {
        await client.end();
    }
});

// --- WhatsApp Endpoint ---
app.post('/send-message', async (req, res) => {
    console.log("--- Received POST /send-message request ---");
    const { to, message } = req.body;
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

    if (!to || !message || !WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
        return res.status(400).json({ message: 'Missing required information for WhatsApp.' });
    }

    const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
    const data = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message }
    };
    const headers = {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(url, data, { headers });
        console.log("--- WhatsApp message sent successfully ---");
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error.message : error.message;
        console.error('--- ERROR sending WhatsApp message:', errorMessage);
        res.status(500).json({ message: `Failed to send message: ${errorMessage}` });
    }
});


// --- CHANGE 4: THE "CATCHALL" HANDLER ---
// This must be the LAST route in the file.
// It sends back React's index.html file for any request that doesn't match an API route.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
    // I am updating this log message to match the new port logic
    console.log(`--- [4] ✅ Server is listening on port: ${port} ---`);
});
