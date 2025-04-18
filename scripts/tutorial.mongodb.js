/** 
 * Conecta ao banco de dados 'tutorial' 
 * Caso não exista, ele será criado automaticamente.
*/
use('tutorial');

/**
 * Remove a coleção 'cities' caso ela já exista
 * Hack para evitar erro de duplicação ao executar o script várias vezes 
 */ 
db.cities.drop();

/**
 * Cria a coleção 'cities'
 * (acaba sendo opcional, pois o MongoDB cria a coleção automaticamente ao inserir o primeiro documento)
 */
db.createCollection("cities");

/** 
 * Insere um documento representando a cidade de Santo André na coleção
 */ 
db.cities.insertOne({
    name: 'Santo André', 
    population: 710_210,
    area_km2: 175.8,
    populationDensity: 4_000,
    elevation_m: 700,
    lastCensus: 2015,
    hdi: 0.815
})

/* Insere um documento representando a cidade de São Bernardo do Campo na coleção */
db.cities.insertOne({
    name: 'São Bernardo do Campo', 
    population: 816_925,
    area_km2: 409.51,
    populationDensity: 2_000,
    elevation_m: 762,
    lastCensus: 2015,
    hdi: 0.805
})

/* Insere um documento representando a cidade de São Caetano do Sul na coleção */
db.cities.insertOne({
    name: 'São Caetano do Sul', 
    population: 158024,
    area_km2: 15.33,
    populationDensity: 10000,
    elevation_m: 744,
    lastCensus: 2015,
    hdi: 0.862,
})

/* Recupera todos os documentos da coleção */
db.cities.find()

/* Conta o número total de documentos na coleção */
db.cities.countDocuments()

/* Mapeia os nomes das cidades presentes na coleção */
db.cities.find().map(city => city.name)

/* Mapeia as cidades com uma string descritiva de seus habitantes */
db.cities.find().map(city => `${city.name} has ${city.population} inhabitants`)

/* Função para formatar uma cidade como string */
function toString(city) {
    return `${city.name} (${city.population} inhabitants, ${city.area_km2} km², ${city.populationDensity} inhabitants/km², ${city.elevation_m} m, ${city.lastCensus}, ${city.hdi})`
}

/* Mostra todas as cidades formatadas como string */
db.cities.find().map(city => toString(city))

/* Cria um objeto representando a cidade de São Paulo com um método para aumentar a população */
const city = {
    name: 'São Paulo',
    population: 12345678,
    area_km2: 1500,
    populationDensity: 8000,
    elevation_m: 760,
    lastCensus: 2015,
    hdi: 0.900,
    increasePopulation: function(amount) {
        this.population += amount;
    }
};

/* Insere o objeto da cidade de São Paulo na coleção */
db.cities.insertOne(city);

/* Recupera todos os documentos da coleção */
db.cities.find()

/* Recupera um documento específico da coleção com base no nome */
const cityFromDB = db.cities.findOne({ name: 'São Paulo' });

/**
 * Vai gerar erro de execução, pois o método increasePopulation foi serializado para string
 */
// cityFromDB.increasePopulation(1000); // error

/* Exemplos de consultas com diferentes critérios e operadores */
/* Busca cidades com nome igual a 'Santo André' */
db.cities.find({name: 'Santo André'})

/* Busca cidades cujo nome começa com 'São' */
db.cities.find({name: /^São/})

/* Busca cidades cujo nome começa com 'São' e população menor que 200.000 */
db.cities.find({name: /^São/, population: {$lt: 200000}})

/* Define um intervalo de população para consulta */
const populationRange = {
    $lt: 800000,
    $gt: 200000
};

/* Busca cidades dentro do intervalo de população definido */
db.cities.find({population: populationRange});

/* Busca cidades dentro do intervalo de população com projeção positiva de campos específicos */
db.cities.find({population: populationRange}, {name: true, population: true, _id: false});

/* Projeção negativa: exclui o hdi e a elevação */
db.cities.find({population: populationRange}, {hdi: false, elevation_m: false, _id: false});

/**
 * Projeção precisa ser apenas positiva, ou apenas negativa, não é possível misturar (contradição de lógica)
 * A exceção é o campo '_id', que pode ser incluído ou excluído
 */
// db.cities.find({population: populationRange}, {name: true, population: true, _id: false, hdi: false}) // error

/* Exemplos de operadores lógicos em consultas */
/* Operador $or: Busca cidades com população menor que 200.000 ou maior que 800.000 */
db.cities.find({
    $or : [
        {population: {$lt: 200000}},
        {population: {$gt: 800000}}
    ]
}, {name: true, population: true, _id: false})

/* Operador $nor: Busca cidades que não têm população menor que 200.000 nem maior que 800.000 */
db.cities.find({
    $nor : [
        {population: {$lt: 200000}},
        {population: {$gt: 800000}}
    ]
}, {name: true, population: true, _id: false})

/* Busca cidades onde o campo 'population' existe */
db.cities.find({population: {$exists: true}})

db.cities.insertOne({
    name: 'Ribeirão Pires',
    area_km2: 100,
    populationDensity: 1000,
    elevation_m: 100,
    lastCensus: 2015,
    hdi: 0.800
})

/* Busca cidades onde o campo 'population' não existe */
db.cities.find({population: {$exists: false}})

/* Busca cidades com população em uma lista específica */
db.cities.find(
    {population: {$in: [710210, 158024]}}, 
    {name: true, population: true, _id: false})

/**
 * Busca cidades onde a área é maior que a elevação usando um método JavaScript
 * A função $where permite executar código JavaScript no servidor
 * Isso pode ser perigoso e deve ser evitado em produção
 * Além de ser ineficiente, pois não utiliza índices
 * Atualmente é considerado obsoleto
 */ 
db.cities.find({
    $where: function() {
        return this.area_km2 > this.elevation_m;
    }
})

/**
 * Uma alternativa mais eficiente é usar o operador $expr (mais avançado)
 */
db.cities.find({
    $expr: {
        $gt: ["$area_km2", "$elevation_m"]
    }
})

/* Exemplos de projeção de campos */
/* Inclui apenas o campo 'name' nos resultados */
db.cities.find({}, {name: true})

/* Exclui o campo 'population' dos resultados */
db.cities.find({}, {population: false})

/* Define uma projeção padrão para nome e população */
popProj = {name: true, population: true, _id: false}

/* Exemplos de ordenação, limite e salto de resultados */
/* Ordena as cidades por população em ordem decrescente */
db.cities.find({}, popProj).sort({population: -1})

/* Limita os resultados a 2 documentos */
db.cities.find({}, popProj).sort({population: -1}).limit(2)

/* Salta os 2 primeiros documentos nos resultados */
db.cities.find({}, popProj).sort({population: -1}).skip(2)

/* Ordena por população em ordem decrescente e nome em ordem crescente */
db.cities.find({}, popProj).sort({population: -1, name: 1})

/* Recupera um documento específico e o atualiza */
scs = db.cities.findOne({'name': 'São Caetano do Sul'})
scs

/**
 * O operador $set atualiza uma propriedade específica de um documento
 */
db.cities.updateOne(
    {_id: scs._id}, 
    {$set : {population: scs.population + 1000}})
db.cities.findOne({'name': 'São Caetano do Sul'})

/* O operador $inc incrementa o valor de uma propriedade numérica */
db.cities.updateOne(
    {_id: scs._id}, 
    {$inc : {population: 1000}})
db.cities.findOne({'name': 'São Caetano do Sul'})

/* Atualiza múltiplos documentos com base em um critério */
db.cities.updateMany(
    {population: {$gt: 100000}},
    {$inc : {population: -1000}})
db.cities.find({population: {$gt: 100000}})

/* Atualiza todos os documentos para refletir estatísticas de 2025 */
db.cities.updateMany(
    {},
    {
        $set: {
            lastCensus: 2025
        },
        $inc: {
            population: 5000
        }
    }
)

/* Remove documentos com base em critérios */
/* Remove um único documento com base no nome */
db.cities.deleteOne(
    {name: 'São Paulo'})

/* Remove todos os documentos que atendem a um critério */
db.cities.deleteMany(
    {population: {$lt: 200000}})

/* Configura um contador para IDs auto-incrementados */
db.cities.deleteMany({});
db.createCollection("counters");
db.counters.insertOne({
    name: "cities",
    seq: 0
});

/* Método para obter o próximo número da sequência */
function getNextSequence(name) {
    const sequenceDocument = db.counters.findOneAndUpdate(
        { name: name },
        { $inc: { seq: 1 } },
        { returnNewDocument: true }
    );
    return sequenceDocument.seq;
}

/* Insere documentos com IDs auto-incrementados */
db.cities.insertOne({
    id: getNextSequence("cities"),
    name: 'São Paulo',
    population: 12345678,
    area_km2: 1500,
    populationDensity: 8000,
    elevation_m: 760,
    lastCensus: 2015,
    hdi: 0.900
})
db.cities.insertOne({
    id: getNextSequence("cities"),
    name: 'Rio de Janeiro',
    population: 6748000,
    area_km2: 1182,
    populationDensity: 5700,
    elevation_m: 0,
    lastCensus: 2015,
    hdi: 0.799
})

/* Cria um índice único no campo 'name' */
db.cities.createIndex({name: 1}, {unique: true});

/* Lista os índices criados */
db.cities.getIndexes()

/* Testa a inserção de um documento com índice único */
db.cities.insert({
    name: 'Santo André', 
    population: 710_210,
    area_km2: 175.8,
    populationDensity: 4_000,
    elevation_m: 700,
    lastCensus: 2015,
    hdi: 0.815
})

db.cities.getIndexes()
