-- Seed data for eletronics
INSERT INTO eletronics (id, name, price, description, image, brand, sizes) VALUES
(1, 'Smartphone Galaxy S23', 2999.99, 'Smartphone Samsung Galaxy S23 com 128GB, tela de 6.1", câmera tripla de 50MP', '/img/aoa.jpeg', 'Samsung', '128GB, 256GB'),
(2, 'Notebook Dell Inspiron', 4599.99, 'Notebook Dell Inspiron 15 com Intel i5, 8GB RAM, SSD 256GB', '/img/mc.jpg', 'Dell', '8GB RAM, 16GB RAM'),
(3, 'Fone de Ouvido Wireless', 299.99, 'Fone de ouvido bluetooth com cancelamento de ruído ativo', '/img/ms.jpg', 'Sony', 'Único');

-- Seed data for mensclothing
INSERT INTO mensclothing (id, name, price, description, image, brand, sizes) VALUES
(1, 'Camisa Social Azul', 89.99, 'Camisa social masculina em algodão, cor azul marinho', '/img/mc.jpg', 'Renner', 'P, M, G, GG'),
(2, 'Calça Jeans Masculina', 129.99, 'Calça jeans masculina com corte moderno e confortável', '/img/mc.jpg', 'Levi''s', '30, 32, 34, 36'),
(3, 'Blazer Social Preto', 199.99, 'Blazer social masculino em tecido premium, cor preta', '/img/mc.jpg', 'C&A', '40, 42, 44, 46');

-- Seed data for mensshoes
INSERT INTO mensshoes (id, name, price, description, image, brand, sizes) VALUES
(1, 'Tênis Esportivo Nike', 299.99, 'Tênis esportivo Nike para corrida e atividades físicas', '/img/ms.jpg', 'Nike', '39, 40, 41, 42, 43, 44'),
(2, 'Sapato Social Marrom', 159.99, 'Sapato social masculino em couro legítimo, cor marrom', '/img/ms.jpg', 'Arezzo', '39, 40, 41, 42, 43, 44'),
(3, 'Bota Masculina', 189.99, 'Bota masculina resistente para uso casual e trabalho', '/img/ms.jpg', 'Timberland', '40, 41, 42, 43, 44, 45');

-- Seed data for toys
INSERT INTO toys (id, name, price, description, image, brand, sizes) VALUES
(1, 'Lego Star Wars', 199.99, 'Kit de montagem Lego Star Wars com 500 peças', '/img/to.jpg', 'Lego', '6+, 8+, 12+'),
(2, 'Boneca Barbie', 89.99, 'Boneca Barbie com acessórios e roupas inclusas', '/img/to.jpg', 'Mattel', '3+, 6+'),
(3, 'Carrinho Controle Remoto', 149.99, 'Carrinho de controle remoto com alta velocidade', '/img/to.jpg', 'Hot Wheels', '4+, 8+');

-- Seed data for womensclothing
INSERT INTO womensclothing (id, name, price, description, image, brand, sizes) VALUES
(1, 'Vestido Floral', 129.99, 'Vestido feminino com estampa floral, ideal para verão', '/img/wc.jpg', 'Renner', 'P, M, G, GG'),
(2, 'Blusa Feminina', 79.99, 'Blusa feminina em tecido leve e confortável', '/img/wc.jpg', 'C&A', 'P, M, G, GG'),
(3, 'Calça Legging', 69.99, 'Calça legging feminina para atividades físicas', '/img/wc.jpg', 'Nike', 'P, M, G, GG');

-- Seed data for womenshoes
INSERT INTO womenshoes (id, name, price, description, image, brand, sizes) VALUES
(1, 'Sapato Salto Alto', 179.99, 'Sapato feminino com salto alto elegante', '/img/ws.jpg', 'Arezzo', '34, 35, 36, 37, 38, 39'),
(2, 'Tênis Feminino', 199.99, 'Tênis esportivo feminino para corrida', '/img/ws.jpg', 'Adidas', '35, 36, 37, 38, 39, 40'),
(3, 'Sandália Feminina', 89.99, 'Sandália feminina confortável para uso diário', '/img/ws.jpg', 'Melissa', '34, 35, 36, 37, 38, 39'); 