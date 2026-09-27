import express from 'express';
import {pool} from '../db.js';
import {requireAuth,allowRoles} from '../middleware/auth.js';
const router=express.Router();
router.post('/',requireAuth,allowRoles('BUYER','ADMIN'),async(req,res)=>{
 const client=await pool.connect();
 try{
  const items=req.body.items||[];if(!items.length)throw new Error('Cart is empty.');
  await client.query('BEGIN');let total=0,resolved=[];
  for(const item of items){
   const r=await client.query('SELECT id,name,price,stock,status FROM products WHERE id=$1 FOR UPDATE',[item.product_id]),p=r.rows[0],q=Number(item.quantity||1);
   if(!p||p.status!=='APPROVED')throw new Error('One selected product is unavailable.');
   if(p.stock<q)throw new Error(`Insufficient stock for ${p.name}.`);
   total+=Number(p.price)*q;resolved.push({product_id:p.id,quantity:q,unit_price:p.price});
  }
  const o=(await client.query(`INSERT INTO orders(buyer_id,total_amount,customer_note) VALUES($1,$2,$3) RETURNING *`,[req.user.id,total,req.body.customer_note||''])).rows[0];
  for(const x of resolved){await client.query(`INSERT INTO order_items(order_id,product_id,quantity,unit_price) VALUES($1,$2,$3,$4)`,[o.id,x.product_id,x.quantity,x.unit_price]);await client.query('UPDATE products SET stock=stock-$1 WHERE id=$2',[x.quantity,x.product_id])}
  await client.query('COMMIT');res.status(201).json(o);
 }catch(e){await client.query('ROLLBACK');res.status(400).json({message:e.message})}finally{client.release()}
});
router.get('/my',requireAuth,async(req,res)=>{
 const r=await pool.query(`SELECT o.*,COALESCE(json_agg(json_build_object('product_id',oi.product_id,'name',p.name,'quantity',oi.quantity,'unit_price',oi.unit_price)) FILTER(WHERE oi.id IS NOT NULL),'[]') items FROM orders o LEFT JOIN order_items oi ON oi.order_id=o.id LEFT JOIN products p ON p.id=oi.product_id WHERE o.buyer_id=$1 GROUP BY o.id ORDER BY o.created_at DESC`,[req.user.id]);res.json(r.rows)
});
router.get('/work',requireAuth,allowRoles('ADMIN','EMPLOYEE'),async(req,res)=>{
 const r=await pool.query(`SELECT o.*,u.full_name buyer_name,u.email buyer_email,
 COALESCE(json_agg(json_build_object('name',p.name,'quantity',oi.quantity,'unit_price',oi.unit_price))
 FILTER(WHERE oi.id IS NOT NULL),'[]') items
 FROM orders o JOIN users u ON u.id=o.buyer_id
 LEFT JOIN order_items oi ON oi.order_id=o.id LEFT JOIN products p ON p.id=oi.product_id
 GROUP BY o.id,u.full_name,u.email ORDER BY o.created_at DESC`);
 res.json(r.rows);
});
router.get('/admin',requireAuth,allowRoles('ADMIN'),async(req,res)=>{
 const r=await pool.query(`SELECT o.*,u.full_name buyer_name,u.email buyer_email,COALESCE(json_agg(json_build_object('name',p.name,'quantity',oi.quantity,'unit_price',oi.unit_price)) FILTER(WHERE oi.id IS NOT NULL),'[]') items FROM orders o JOIN users u ON u.id=o.buyer_id LEFT JOIN order_items oi ON oi.order_id=o.id LEFT JOIN products p ON p.id=oi.product_id GROUP BY o.id,u.full_name,u.email ORDER BY o.created_at DESC`);res.json(r.rows)
});
router.patch('/admin/:id/status',requireAuth,allowRoles('ADMIN'),async(req,res)=>{
 const s=req.body.status;if(!['PENDING','APPROVED','PROCESSING','READY','COMPLETED','CANCELLED'].includes(s))return res.status(400).json({message:'Invalid order status.'});
 const r=await pool.query('UPDATE orders SET status=$1,updated_at=NOW() WHERE id=$2 RETURNING *',[s,req.params.id]);if(!r.rows[0])return res.status(404).json({message:'Order not found'});res.json(r.rows[0]);
});
export default router;
