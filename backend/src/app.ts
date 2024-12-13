import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import photoRoutes from './routes/photoRoutes';

const app = express();
app.use(express.json());

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.use('/externalapi/photos', photoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
