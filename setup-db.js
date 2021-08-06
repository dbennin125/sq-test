import db from './lib/utils/db.js';
import app from './lib/app.js';

db.sync({ force: true });
