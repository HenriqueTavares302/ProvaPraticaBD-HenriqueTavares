# 📚 Projeto React + Vite + Firebase (Firestore)

Este é um projeto desenvolvido utilizando **React**, **Vite** e **Firebase (Firestore)**, com o objetivo de criar uma aplicação web moderna, rápida e integrada a um banco de dados em tempo real.

---

## 🚀 Tecnologias utilizadas

* ⚛️ React
* ⚡ Vite
* 🔥 Firebase
* 🗄️ Firestore (Banco de dados NoSQL em tempo real)
* 🎨 CSS

---

## 📁 Estrutura do Projeto

```
vite-project/
│
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│
├── public/
├── package.json
├── vite.config.js
```

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

* Node.js (versão recomendada: 18+)
* npm ou yarn

---

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Acesse a pasta do projeto:

```bash
cd vite-project
```

3. Instale as dependências:

```bash
npm install
```

---

## ▶️ Como executar o projeto

Após instalar tudo, execute o seguinte comando dentro da pasta **vite-project**:

```bash
npm run dev
```

Depois disso, o projeto estará disponível em:

```
http://localhost:5173
```

---

## 🔥 Configuração do Firebase

Para utilizar o Firestore, você precisa configurar o Firebase:

1. Acesse o site do Firebase
2. Crie um projeto
3. Ative o Firestore Database
4. Copie as credenciais do seu projeto
5. Crie um arquivo (ex: `firebase.js`) dentro de `src/` com sua configuração:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

---

## 📌 Funcionalidades

* Cadastro de dados no Firestore
* Leitura de dados em tempo real
* Interface dinâmica com React
* Build rápido com Vite

---

## 📦 Build para produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build:

```bash
npm run preview
```

---

## 👨‍💻 Autor

Desenvolvido por **Henrique Tavares**

---

## 📄 Licença

Este projeto está sob a licença MIT.
