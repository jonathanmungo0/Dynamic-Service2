import express from 'express';
import {pool} from '../db.js';
import {requireAuth,allowRoles} from '../middleware/auth.js';
const router=express.Router();
router.get('/',requireAuth,allowRoles('ADMIN'),async(req,res)=>{const r=await pool.query('SELECT id,full_name,email,phone,role,active,created_at FROM users ORDER BY created_at DESC');res.json(r.rows)});
router.patch('/:id/role',requireAuth,allowRoles('ADMIN'),async(req,res)=>{const role=req.body.role;if(!['ADMIN','EMPLOYEE','SELLER','BUYER'].includes(role))return res.status(400).json({message:'Invalid role'});const r=await pool.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING id,full_name,email,role',[role,req.params.id]);res.json(r.rows[0])});
export default router;
