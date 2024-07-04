import express, { urlencoded } from 'express';
import config from './config/config.js';
import connetDB from './config/database.js';
import adminRoutes from './routes/admin.routes.js';
import collegeRoutes from './routes/college.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = config.port;

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/colleges', collegeRoutes);

const startServer = async () => {
    try {
        await connetDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();