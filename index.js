const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ These two lines MUST be here
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orphans', require('./routes/orphanRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
