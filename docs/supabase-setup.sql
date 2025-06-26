-- =====================================================
-- CONFIGURAÇÃO COMPLETA DO SUPABASE PARA LOJA ONLINE
-- =====================================================

-- Criar tabela users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Criar tabela address
CREATE TABLE IF NOT EXISTS address (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  "zipCode" TEXT NOT NULL,
  "userId" TEXT UNIQUE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES users(id)
);

-- Criar tabela eletronics
CREATE TABLE IF NOT EXISTS eletronics (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand TEXT NOT NULL,
  sizes TEXT NOT NULL
);

-- Criar tabela mensclothing
CREATE TABLE IF NOT EXISTS mensclothing (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand TEXT NOT NULL,
  sizes TEXT NOT NULL
);

-- Criar tabela mensshoes
CREATE TABLE IF NOT EXISTS mensshoes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand TEXT NOT NULL,
  sizes TEXT NOT NULL
);

-- Criar tabela toys
CREATE TABLE IF NOT EXISTS toys (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand TEXT NOT NULL,
  sizes TEXT NOT NULL
);

-- Criar tabela womensclothing
CREATE TABLE IF NOT EXISTS womensclothing (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand TEXT NOT NULL,
  sizes TEXT NOT NULL
);

-- Criar tabela womenshoes
CREATE TABLE IF NOT EXISTS womenshoes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand TEXT NOT NULL,
  sizes TEXT NOT NULL
);

-- =====================================================
-- DESABILITAR RLS TEMPORARIAMENTE PARA MIGRAÇÃO
-- =====================================================

-- Desabilitar RLS em todas as tabelas para permitir inserções
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE address DISABLE ROW LEVEL SECURITY;
ALTER TABLE eletronics DISABLE ROW LEVEL SECURITY;
ALTER TABLE mensclothing DISABLE ROW LEVEL SECURITY;
ALTER TABLE mensshoes DISABLE ROW LEVEL SECURITY;
ALTER TABLE toys DISABLE ROW LEVEL SECURITY;
ALTER TABLE womensclothing DISABLE ROW LEVEL SECURITY;
ALTER TABLE womenshoes DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- MENSAGEM DE CONFIRMAÇÃO
-- =====================================================

-- As tabelas foram criadas com sucesso!
-- Agora você pode executar a migração dos dados. 