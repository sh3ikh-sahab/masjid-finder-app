import express from 'express';
import mosqueRoutes from './src/routes/mosqueRoutes.js';
import errorHandler from './src/middleware/errorsmiddleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api/mosques', mosqueRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
