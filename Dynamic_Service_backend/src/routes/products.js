import express from 'express';
import {pool} from '../db.js';
import {requireAuth,allowRoles} from '../middleware/auth.js';
const router=express.Router();
router.get('/',async(req,res)=>{try{
 const status=req.query.status||'APPROVED';
 const r=await pool.query(`SELECT p.*,u.full_name seller_name FROM products p LEFT JOIN users u ON u.id=p.seller_id WHERE p.status=$1 ORDER BY p.created_at DESC`,[status]);
 res.json(r.rows);
}catch(e){res.status(500).json({message:e.message})}});
router.get('/mine',requireAuth,allowRoles('SELLER','ADMIN'),async(req,res)=>{
 const r=await pool.query(`SELECT p.*,u.full_name seller_name FROM products p LEFT JOIN users u ON u.id=p.seller_id WHERE p.seller_id=$1 OR $2='ADMIN' ORDER BY p.created_at DESC`,[req.user.id,req.user.role]);res.json(r.rows)
});
router.post('/',requireAuth,allowRoles('SELLER','ADMIN'),async(req,res)=>{try{
 const {name,description,category,price,rental_price,stock,image_url}=req.body;
 if(!name||!category||price===undefined)return res.status(400).json({message:'Name, category and price are required.'});
 const status=req.user.role==='ADMIN'?'APPROVED':'PENDING';
 const r=await pool.query(`INSERT INTO products(seller_id,name,description,category,price,rental_price,stock,image_url,status,approved_at)
 VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,CASE WHEN $9='APPROVED' THEN NOW() ELSE NULL END) RETURNING *`,
 [req.user.id,name,description||'',category,price,rental_price||null,stock||0,image_url||'/media/activity-decoration.svg',status]);
 res.status(201).json(r.rows[0]);
}catch(e){res.status(500).json({message:e.message})}});
router.patch('/:id/status',requireAuth,allowRoles('ADMIN'),async(req,res)=>{
 const {status}=req.body;if(!['PENDING','APPROVED','REJECTED'].includes(status))return res.status(400).json({message:'Invalid status.'});
 const r=await pool.query(`UPDATE products SET status=$1,approved_at=CASE WHEN $1='APPROVED' THEN NOW() ELSE approved_at END WHERE id=$2 RETURNING *`,[status,req.params.id]);
 if(!r.rows[0])return res.status(404).json({message:'Product not found.'});res.json(r.rows[0]);
});
export default router;
