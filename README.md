# **Projeto de Integração com Google Maps - Cálculo de Rotas (Desafio Shopper)**

Este projeto consiste em uma aplicação full stack **frontend** e **backend** que utiliza a API do Google Maps para calcular rotas entre dois endereços fornecidos pelo usuário. O sistema exibe o tempo estimado de viagem, a distância entre os pontos e o mapa com o trajeto tracejado no frontend. Além disso, o sistema simula a escolha de um motorista para realizar o trajeto e calcula o possível valor da viagem.

---

## **Funcionalidades**

### **Frontend**
- Interface amigável para entrada dos dois endereços pelo usuário.
- Integração com o Google Maps API para renderizar o mapa e exibir o trajeto entre os endereços fornecidos.
- Exibição do tempo estimado de viagem e da distância em tempo real.
- Simulação de escolha de um motorista para o trajeto.
- Cálculo do valor estimado da viagem com base em distância e motorista escolhido.

### **Backend**
- Implementação com Express.js para gerenciar as requisições feitas ao Google Maps API Routes.
- Cálculo da rota entre os dois endereços, incluindo tempo de viagem e distância.
- Simulação de escolha de motorista com base em dados fictícios.
- Endpoint REST que calcula o valor estimado da viagem e serve os dados necessários ao frontend.

---

## **Tecnologias Utilizadas**

### **Frontend**
- **Vite:** Ferramenta de build para desenvolvimento rápido e leve.
- **React:** Framework para construção de interfaces de usuário.
- **Google Maps JavaScript API:** Para renderizar o mapa e o trajeto.
- **Jest:** Para a implementação de testes unitarios.
- **Material UI:** Para a contrução de uma interface mais agradavel e amigavel ao usuário

### **Backend**
- **Node.js com Express:** Framework para gerenciar a API.
- **Axios:** Para realizar as requisições ao Google Maps Routes API
- **Google Maps Routes API:** Para calcular rotas, tempo e distância.
- **TypeORM:** Para gerenciamento do banco de dados.
- **PostgresSQL:** Para armazenar as viagens solicitadas pelo usuário e tambem os motoristas ficticios que são inicalizados por uma seed.

---

## **Como o Sistema Funciona**

### **Frontend**
1. O usuário insere os endereços de origem e destino em um formulário.
2. Os dados são enviados ao backend via requisição **POST**.
3. O mapa exibe a rota tracejada entre os dois pontos.
4. O motorista fictício é exibido com seu nome, avaliação e preço.
5. O valor estimado da viagem é exibido com base na distância e no motorista escolhido.

### **Backend**
1. Recebe os endereços via endpoint REST.
2. Consulta a **API do Google Maps Routes** para obter os dados de rota.
3. Seleciona todos os motoristas disponíveis para a viagem solicitada com base em uma distância mínima configurada para cada motorista.
4. Calcula o valor estimado da viagem.
5. Retorna as informações para o frontend.

---

## **Configuração do Projeto**

### **Pré-requisitos**
1. **Node.js** (v16 ou superior)
2. **npm** ou **yarn**
3. Uma **API Key do Google Cloud** com permissões para:
   - Google Maps JavaScript API
   - Google Maps API Routes

---

### **Passos para Configuração**
O projeto já vem pré-configurado com tudo o necessário para ser inicializado via Docker Compose. A única configuração adicional necessária é a criação da variável de ambiente com a chave de API do Google Maps.

#### **Clonar o Repositório**
```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
````

#### **Configurar as Variáveis de Ambiente**
Crie um arquivo .env na raiz do projeto e adicione as seguintes configurações:
```bash
GOOGLE_API_KEY=your-google-maps-api-key
````

#### **Rodar o Projeto com Docker Compose**

```bash
docker-compose up
````

Frontend: http://localhost:80

Backend: http://localhost:8080
