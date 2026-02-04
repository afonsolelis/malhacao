# Gym Tracker (Rastreador de Academia)

Aplicativo web para organizar equipamentos, montar treinos e registrar sessões. Inclui painel com KPIs e acompanhamento de progresso.

## Funcionalidades

- Cadastro de equipamentos
- Criação e edição de treinos
- Registro de sessões de treino
- Painel com KPIs e gráfico de progresso
- Demonstrativo de dias sem treino (últimos 7 e 30 dias)
- Suporte a exercícios aeróbicos por minutos

## Requisitos

- Node.js 18+ (recomendado)
- MongoDB (local ou remoto)

## Instalação

1. Instale as dependências

```bash
npm install
```

2. Crie o arquivo `.env`

```bash
MONGO_URI="mongodb://localhost:27017/gym-tracker"
PORT=3000
```

## Como rodar

- Produção/Simples

```bash
npm start
```

- Desenvolvimento (com nodemon)

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## Scripts

- `npm start` — inicia o servidor
- `npm run dev` — inicia com nodemon (hot reload)
- `npm run seed` — popula o banco (seeds)

## Estrutura do Projeto

```
app.js
config/
controllers/
models/
public/
routes/
views/
```

## Cadastro de Treino (Plano B)

O “Plano B” pode ser criado/ajustado pela interface em **Treinos**. Exercícios aeróbicos usam o campo **Min**.

Exemplo de plano:
- Escada: 10 min (Aquecimento)
- Leg Press Horizontal
- Cadeira Extensora
- Cadeira Flexora
- Cadeira Abdutora
- Cadeira Adutora
- Gêmeos Sentado

## Observações

- Reps/Peso/Séries são opcionais para aeróbicos.
- Para treinos de força, preencha reps/peso/séries normalmente.

## Licença

MIT
