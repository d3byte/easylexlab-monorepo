import app from './app';
import routes from './routes';

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
