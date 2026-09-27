import dotenv from 'dotenv';import {pool} from './src/db.js';dotenv.config();
const products=[
['Wedding Backdrop Panel','Elegant backdrop panel for weddings and ceremonies.','Decoration',250000,120000,5,'/media/activity-decoration.svg'],
['Wireless Speaker System','Portable sound system for ceremonies and events.','Sonorisation',450000,90000,4,'/media/activity-sales.svg'],
['Event Chairs Set','Decorative chairs for weddings and birthdays.','Furniture',35000,5000,100,'/media/hero(1).jpg'],
['LED Event Lighting','Professional LED lighting kit.','Lighting',280000,65000,8,'/media/activity-rental.svg'],
['MC Starter Training','Accelerated practical event training.','Training',80000,null,20,'/media/activity-training.svg']];
const s=await pool.connect();try{const seller=(await s.query(`SELECT id FROM users WHERE email='seller@dynamicservice.rw'`)).rows[0];if(!seller)throw new Error('Run seed.sql first');for(const p of products)await s.query(`INSERT INTO products(seller_id,name,description,category,price,rental_price,stock,image_url,status,approved_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,'APPROVED',NOW())`,[seller.id,...p]);console.log('Demo products inserted.')}finally{s.release();await pool.end()}
