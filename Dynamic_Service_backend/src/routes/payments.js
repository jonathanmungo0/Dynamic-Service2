import express from 'express';
import {pool} from '../db.js';
import {requireAuth,allowRoles} from '../middleware/auth.js';
const router=express.Router();
router.post('/',requireAuth,allowRoles('BUYER','ADMIN'),async(req,res)=>{
 const {order_id,method,reference=''}=req.body;
 if(!['MOBILE_MONEY','BANK_TRANSFER','CASH'].includes(method))return res.status(400).json({message:'Invalid payment method.'});
 const r=await pool.query('SELECT * FROM orders WHERE id=$1',[order_id]),o=r.rows[0];
 if(!o)return res.status(404).json({message:'Order not found.'});
 if(req.user.role!=='ADMIN'&&o.buyer_id!==req.user.id)return res.status(403).json({message:'Not your order.'});
 const p=(await pool.query(`INSERT INTO payments(order_id,method,reference,amount,status,paid_at) VALUES($1,$2,$3,$4,'CONFIRMED',NOW()) RETURNING *`,[order_id,method,reference,o.total_amount])).rows[0];
 await pool.query(`UPDATE orders SET status='APPROVED',updated_at=NOW() WHERE id=$1`,[order_id]);
 const invoice=(await pool.query(`INSERT INTO invoices(order_id,invoice_number) VALUES($1,$2) RETURNING *`,[order_id,`DS-${new Date().getFullYear()}-${String(Date.now()).slice(-7)}`])).rows[0];
 res.status(201).json({payment:p,invoice});
});
export default router;
