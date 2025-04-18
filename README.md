# Aula 18 - MongoDB

# MongoDB Tutorial

Este projeto contém um script de exemplo para manipulação de dados no MongoDB. Ele demonstra como criar, consultar, atualizar e excluir documentos em uma coleção, além de exemplos de índices, projeções e operadores avançados.

## Estrutura do Projeto

- **scripts/tutorial.mongodb.js**: Script principal contendo exemplos de operações no MongoDB.

## Pré-requisitos

- **MongoDB**: Certifique-se de que o MongoDB está instalado e em execução no seu ambiente.
- **Node.js e npm**: Pré-instalados no ambiente de desenvolvimento para executar scripts relacionados, se necessário.

## Ambiente de Desenvolvimento com Container

Este projeto inclui um ambiente de desenvolvimento configurado com um container DevContainer. Ele fornece as ferramentas necessárias para trabalhar com MongoDB e Node.js, incluindo:

- **MongoDB**: Pré-instalado e configurado no container.
- **Node.js e npm**: Pré-instalados para desenvolvimento em JavaScript/TypeScript.
- **Extensões do VS Code**: Configuradas para facilitar o desenvolvimento, com suporte a MongoDB.

### Como Usar o DevContainer (GitHub Codespaces ou VS Code)

1. Abra o projeto no GitHub Codespaces ou no Visual Studio Code.
2. Se estiver usando o VS Code, instale a extensão "Remote - Containers".
3. Clique no ícone de "Reabrir na pasta do container" na barra inferior do VS Code.
4. O VS Code irá construir o container e abrir o projeto dentro dele.
5. Após a inicialização, você terá acesso ao terminal do container, onde poderá executar comandos do MongoDB e Node.js.
6. Para acessar o MongoDB, use o terminal do container e execute `mongosh` para abrir o shell do MongoDB.
7. Você pode executar os scripts diretamente no shell do MongoDB ou usar o terminal do container para executar scripts Node.js.


### Estrutura do Container

- **Dockerfile**: Configura o ambiente base com Node.js, MongoDB e ferramentas adicionais.
- **docker-compose.yml**: Define os serviços do container, incluindo o banco de dados MongoDB e o ambiente de desenvolvimento.
- **devcontainer.json**: Configurações específicas do DevContainer, como extensões do VS Code, variáveis de ambiente e portas encaminhadas.

### Comandos Úteis no Container

- Para acessar o shell do MongoDB:
  ```bash
  mongosh
  ```
- Para executar scripts Node.js:
  ```bash
  node <script_name>.js
  ```

## Funcionalidades

O script cobre os seguintes tópicos:

1. **Criação de Coleções e Inserção de Documentos**
   - Criação de uma coleção chamada `cities`.
   - Inserção de documentos representando cidades com atributos como população, área, densidade populacional, etc.

2. **Consultas**
   - Recuperação de documentos com critérios simples e avançados.
   - Uso de projeções para incluir ou excluir campos específicos.
   - Ordenação, limite e salto de resultados.

3. **Atualizações**
   - Atualização de documentos com operadores como `$set` e `$inc`.
   - Atualização de múltiplos documentos simultaneamente.

4. **Remoções**
   - Remoção de documentos com base em critérios específicos.

5. **Índices**
   - Criação de índices únicos para evitar duplicação de dados.
   - Listagem de índices criados.

6. **IDs Auto-incrementados**
   - Configuração de um contador para gerar IDs auto-incrementados.
   - Inserção de documentos com IDs gerados automaticamente.

7. **Operadores Avançados**
   - Uso de operadores como `$or`, `$nor`, `$expr` e `$where`.

## Como Executar

1. Inicie o MongoDB no seu ambiente.
2. Acesse o shell do MongoDB.
3. Copie e cole o conteúdo do arquivo `scripts/tutorial.mongodb.js` no shell para executar os comandos.

## Observações

- **Segurança**: Evite usar o operador `$where` em produção, pois ele executa código JavaScript no servidor e pode ser perigoso.
- **Eficiência**: Sempre prefira operadores como `$expr` para consultas avançadas, pois eles utilizam índices e são mais eficientes.

- **Documentação**: Consulte a [documentação oficial do MongoDB](https://docs.mongodb.com/) para mais informações sobre os comandos e operadores disponíveis.
- **MongoDB Atlas**: Se preferir, e é altamente recomendável, você pode usar o MongoDB Atlas, um serviço de banco de dados como serviço (DBaaS) que oferece uma instância do MongoDB na nuvem. Você pode criar uma conta gratuita e seguir as instruções para conectar seu aplicativo ao MongoDB Atlas. O cliente `mongosh` pode ser usado para se conectar ao MongoDB Atlas, assim como o driver do Node.js.

