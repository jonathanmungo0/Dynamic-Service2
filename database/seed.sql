CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (full_name,email,phone,password_hash,role)
VALUES
('Dynamic Service Administrator','admin@dynamicservice.rw','+250793881000',crypt('Admin@12345',gen_salt('bf')),'ADMIN'),
('Dynamic Service Seller','seller@dynamicservice.rw','+250793881001',crypt('Seller@12345',gen_salt('bf')),'SELLER'),
('Dynamic Service Employee','employee@dynamicservice.rw','+250793881002',crypt('Employee@12345',gen_salt('bf')),'EMPLOYEE'),
('Dynamic Service Buyer','buyer@dynamicservice.rw','+250793881003',crypt('Buyer@12345',gen_salt('bf')),'BUYER')
ON CONFLICT (email) DO NOTHING;
