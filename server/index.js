import app from './app';
import routes from './routes';

const port = process.env.PORT || 7990;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
