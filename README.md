# 🦸 Projeto Super-Heróis

Sistema desenvolvido para cadastro e gerenciamento de personagens de super-heróis utilizando **Firebase** e **Supabase**.
A aplicação permite criar personagens, fazer upload de imagens, armazenar dados em nuvem e visualizar informações dos heróis cadastrados.

---

# 🚀 Tecnologias Utilizadas

* React.js
* Firebase
* Supabase
* JavaScript
* HTML5
* CSS3

---

# 📌 Funcionalidades

* ✅ Cadastro de super-heróis
* ✅ Upload de imagens dos personagens
* ✅ Armazenamento em nuvem
* ✅ Listagem de heróis
* ✅ Edição de informações
* ✅ Exclusão de personagens
* ✅ Integração entre Firebase e Supabase

---

# 🗂️ Estrutura do Projeto

```bash
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── firebase/
 ├── supabase/
 ├── assets/
 └── App.jsx
```

---

# 🔥 Firebase

O Firebase é utilizado para:

* Autenticação
* Banco de dados
* Configurações do projeto

## Configuração

Crie um arquivo:

```bash
firebaseConfig.js
```

Exemplo:

```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export default app;
```

---

# ☁️ Supabase

O Supabase é utilizado para:

* Upload de imagens
* Armazenamento de arquivos
* Gerenciamento do bucket

## Configuração

Instale a biblioteca:

```bash
npm install @supabase/supabase-js
```

Crie o arquivo:

```bash
supabaseClient.js
```

Exemplo:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'SUA_URL'
const supabaseKey = 'SUA_CHAVE'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
```

---

# 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/projeto-super-herois.git
```

Entre na pasta:

```bash
cd projeto-super-herois
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

---

# 🖼️ Upload de Imagens

As imagens dos personagens são armazenadas em buckets no Supabase.

Exemplo de upload:

```javascript
const { data, error } = await supabase.storage
  .from('superheroes')
  .upload(`personagens/${file.name}`, file)
```

---

# 📄 Exemplo de Personagem

```json
{
  "nome": "Batman",
  "universo": "DC",
  "poder": "Inteligência e tecnologia",
  "imagem": "url-da-imagem"
}
```

---

# 🔐 Variáveis de Ambiente

Crie um arquivo `.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
```

---

# 🎨 Objetivo do Projeto

Este projeto foi criado com o objetivo de praticar:

* Integração entre serviços em nuvem
* Upload de arquivos
* CRUD completo
* Desenvolvimento Front-End moderno
* Gerenciamento de banco de dados

---

# 📸 Preview

Adicione aqui screenshots do projeto:

```bash
/assets/preview.png
```

---

# 👨‍💻 Autor

Desenvolvido por Henrique Tavares 🚀

---

# 📜 Licença

Este projeto está sob a licença MIT.

