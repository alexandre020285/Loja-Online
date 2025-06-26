const { Client } = require("pg");
const { createClient } = require("@supabase/supabase-js");

// Configuração do PostgreSQL local (banco antigo)
const postgresClient = new Client({
  host: "localhost",
  port: 5432,
  database: "Loja_online",
  user: "postgres",
  password: "0708",
});

// Configuração do Supabase (novo banco)
const supabaseUrl = "https://jlkxpkfidbwgooanvjyt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3hwa2ZpZGJ3Z29vYW52anl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4OTAwOTUsImV4cCI6MjA2NjQ2NjA5NX0.YRqsskPESA-Xy-tDtPeP9KdAFhxJqjncbuOWXLN2IXI";

console.log(
  "⚠️  ATENÇÃO: Configure as URLs do Supabase no script antes de executar!"
);
console.log("📝 Edite o arquivo scripts/migrate-direct-postgres.js");
console.log("🔧 Substitua as variáveis supabaseUrl e supabaseKey");
console.log("");

if (
  supabaseUrl === "https://sua-url-do-supabase.supabase.co" ||
  supabaseKey === "sua-chave-anonima-do-supabase"
) {
  console.log("❌ ERRO: Configure as URLs do Supabase primeiro!");
  console.log("");
  console.log("📋 Para obter suas credenciais do Supabase:");
  console.log("1. Acesse: https://supabase.com/dashboard");
  console.log("2. Selecione seu projeto");
  console.log("3. Vá em Settings > API");
  console.log("4. Copie a URL e a anon key");
  console.log("5. Cole no script e execute novamente");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateFromDirectPostgresToSupabase() {
  try {
    console.log("🚀 Iniciando migração do PostgreSQL local para o Supabase...");
    console.log(
      "📡 Conectando ao PostgreSQL local: localhost:5432/Loja_online"
    );
    console.log(`📡 Conectando ao Supabase: ${supabaseUrl}`);

    // Conectar ao PostgreSQL
    await postgresClient.connect();
    console.log("✅ Conexão com PostgreSQL local estabelecida!");

    // Migrar dados de eletronics
    console.log("📱 Migrando dados de eletronics...");
    const eletronicsResult = await postgresClient.query(
      "SELECT * FROM eletronics"
    );
    const eletronics = eletronicsResult.rows;
    console.log(
      `Encontrados ${eletronics.length} produtos eletrônicos no PostgreSQL local`
    );

    for (const item of eletronics) {
      const { error } = await supabase.from("eletronics").insert({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        brand: item.brand,
        sizes: item.sizes,
      });

      if (error) {
        console.error("Erro ao inserir eletronics:", error);
      } else {
        console.log(`✅ Inserido: ${item.name}`);
      }
    }
    console.log(`✅ ${eletronics.length} produtos eletrônicos migrados`);

    // Migrar dados de mensclothing
    console.log("👔 Migrando dados de mensclothing...");
    const mensclothingResult = await postgresClient.query(
      "SELECT * FROM mensclothing"
    );
    const mensclothing = mensclothingResult.rows;
    console.log(
      `Encontrados ${mensclothing.length} produtos de roupa masculina no PostgreSQL local`
    );

    for (const item of mensclothing) {
      const { error } = await supabase.from("mensclothing").insert({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        brand: item.brand,
        sizes: item.sizes,
      });

      if (error) {
        console.error("Erro ao inserir mensclothing:", error);
      } else {
        console.log(`✅ Inserido: ${item.name}`);
      }
    }
    console.log(`✅ ${mensclothing.length} roupas masculinas migradas`);

    // Migrar dados de mensshoes
    console.log("👞 Migrando dados de mensshoes...");
    const mensshoesResult = await postgresClient.query(
      "SELECT * FROM mensshoes"
    );
    const mensshoes = mensshoesResult.rows;
    console.log(
      `Encontrados ${mensshoes.length} calçados masculinos no PostgreSQL local`
    );

    for (const item of mensshoes) {
      const { error } = await supabase.from("mensshoes").insert({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        brand: item.brand,
        sizes: item.sizes,
      });

      if (error) {
        console.error("Erro ao inserir mensshoes:", error);
      } else {
        console.log(`✅ Inserido: ${item.name}`);
      }
    }
    console.log(`✅ ${mensshoes.length} calçados masculinos migrados`);

    // Migrar dados de toys
    console.log("🧸 Migrando dados de toys...");
    const toysResult = await postgresClient.query("SELECT * FROM toys");
    const toys = toysResult.rows;
    console.log(`Encontrados ${toys.length} brinquedos no PostgreSQL local`);

    for (const item of toys) {
      const { error } = await supabase.from("toys").insert({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        brand: item.brand,
        sizes: item.sizes,
      });

      if (error) {
        console.error("Erro ao inserir toys:", error);
      } else {
        console.log(`✅ Inserido: ${item.name}`);
      }
    }
    console.log(`✅ ${toys.length} brinquedos migrados`);

    // Migrar dados de womensclothing
    console.log("👗 Migrando dados de womensclothing...");
    const womensclothingResult = await postgresClient.query(
      "SELECT * FROM womensclothing"
    );
    const womensclothing = womensclothingResult.rows;
    console.log(
      `Encontrados ${womensclothing.length} roupas femininas no PostgreSQL local`
    );

    for (const item of womensclothing) {
      const { error } = await supabase.from("womensclothing").insert({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        brand: item.brand,
        sizes: item.sizes,
      });

      if (error) {
        console.error("Erro ao inserir womensclothing:", error);
      } else {
        console.log(`✅ Inserido: ${item.name}`);
      }
    }
    console.log(`✅ ${womensclothing.length} roupas femininas migradas`);

    // Migrar dados de womenshoes
    console.log("👠 Migrando dados de womenshoes...");
    const womenshoesResult = await postgresClient.query(
      "SELECT * FROM womenshoes"
    );
    const womenshoes = womenshoesResult.rows;
    console.log(
      `Encontrados ${womenshoes.length} calçados femininos no PostgreSQL local`
    );

    for (const item of womenshoes) {
      const { error } = await supabase.from("womenshoes").insert({
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        brand: item.brand,
        sizes: item.sizes,
      });

      if (error) {
        console.error("Erro ao inserir womenshoes:", error);
      } else {
        console.log(`✅ Inserido: ${item.name}`);
      }
    }
    console.log(`✅ ${womenshoes.length} calçados femininos migrados`);

    // Migrar dados de users (se necessário)
    console.log("👤 Migrando dados de users...");
    const usersResult = await postgresClient.query("SELECT * FROM users");
    const users = usersResult.rows;
    console.log(`Encontrados ${users.length} usuários no PostgreSQL local`);

    for (const user of users) {
      const { error } = await supabase.from("users").insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      if (error) {
        console.error("Erro ao inserir user:", error);
      } else {
        console.log(`✅ Inserido usuário: ${user.name}`);
      }
    }
    console.log(`✅ ${users.length} usuários migrados`);

    // Migrar dados de address (se necessário)
    console.log("🏠 Migrando dados de address...");
    const addressesResult = await postgresClient.query("SELECT * FROM address");
    const addresses = addressesResult.rows;
    console.log(
      `Encontrados ${addresses.length} endereços no PostgreSQL local`
    );

    for (const address of addresses) {
      const { error } = await supabase.from("address").insert({
        id: address.id,
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        userId: address.userId,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      });

      if (error) {
        console.error("Erro ao inserir address:", error);
      } else {
        console.log(`✅ Inserido endereço para usuário: ${address.userId}`);
      }
    }
    console.log(`✅ ${addresses.length} endereços migrados`);

    console.log("🎉 Migração concluída com sucesso!");
    console.log("📊 Resumo da migração:");
    console.log(`   - Eletrônicos: ${eletronics.length}`);
    console.log(`   - Roupas Masculinas: ${mensclothing.length}`);
    console.log(`   - Calçados Masculinos: ${mensshoes.length}`);
    console.log(`   - Brinquedos: ${toys.length}`);
    console.log(`   - Roupas Femininas: ${womensclothing.length}`);
    console.log(`   - Calçados Femininos: ${womenshoes.length}`);
    console.log(`   - Usuários: ${users.length}`);
    console.log(`   - Endereços: ${addresses.length}`);
  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
  } finally {
    await postgresClient.end();
  }
}

migrateFromDirectPostgresToSupabase();
