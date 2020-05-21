import App from './App';

App.listen(process.env.APP_PORT || 3333, () => {
  console.log('Servidor iniciado! 🔥');
});
