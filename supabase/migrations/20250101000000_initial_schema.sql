-- Create users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create address table
CREATE TABLE address (
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

-- Create eletronics table
CREATE TABLE eletronics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    brand TEXT NOT NULL,
    sizes TEXT NOT NULL
);

-- Create mensclothing table
CREATE TABLE mensclothing (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    brand TEXT NOT NULL,
    sizes TEXT NOT NULL
);

-- Create mensshoes table
CREATE TABLE mensshoes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    brand TEXT NOT NULL,
    sizes TEXT NOT NULL
);

-- Create toys table
CREATE TABLE toys (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    brand TEXT NOT NULL,
    sizes TEXT NOT NULL
);

-- Create womensclothing table
CREATE TABLE womensclothing (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    brand TEXT NOT NULL,
    sizes TEXT NOT NULL
);

-- Create womenshoes table
CREATE TABLE womenshoes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    brand TEXT NOT NULL,
    sizes TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE address ENABLE ROW LEVEL SECURITY;
ALTER TABLE eletronics ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensclothing ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensshoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE toys ENABLE ROW LEVEL SECURITY;
ALTER TABLE womensclothing ENABLE ROW LEVEL SECURITY;
ALTER TABLE womenshoes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products
CREATE POLICY "Allow public read access to eletronics" ON eletronics FOR SELECT USING (true);
CREATE POLICY "Allow public read access to mensclothing" ON mensclothing FOR SELECT USING (true);
CREATE POLICY "Allow public read access to mensshoes" ON mensshoes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to toys" ON toys FOR SELECT USING (true);
CREATE POLICY "Allow public read access to womensclothing" ON womensclothing FOR SELECT USING (true);
CREATE POLICY "Allow public read access to womenshoes" ON womenshoes FOR SELECT USING (true);

-- Create policies for users to manage their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Users can view own address" ON address FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Users can update own address" ON address FOR UPDATE USING (auth.uid()::text = "userId");
CREATE POLICY "Users can insert own address" ON address FOR INSERT WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "Users can delete own address" ON address FOR DELETE USING (auth.uid()::text = "userId"); 