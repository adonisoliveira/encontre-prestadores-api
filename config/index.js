module.exports = {
  nome: "Serviços",
  versao: "1.0.0",
  porta: process.env.PORT || 3000,
  db: {
    uri: process.env.db_url || "mongodb://127.0.0.1:27017/servicos",
    parametros: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
