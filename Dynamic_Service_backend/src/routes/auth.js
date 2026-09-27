import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {pool} from '../db.js';
const router=express.Router();
const sign=u=>jwt.sign({id:u.id,email:u.email,role:u.role,full_name:u.full_name},process.env.JWT_SECRET,{expiresIn:'7d'});
router.post('/register',async(req,res)=>{
 try{
  const {full_name,email,phone,password,role='BUYER'}=req.body;
  if(!full_name||!email||!password)return res.status(400).json({message:'Full name, email and password are required.'});
  const safeRole=role==='SELLER'?'SELLER':'BUYER',hash=await bcrypt.hash(password,10);
  const r=await pool.query(`INSERT INTO users(full_name,email,phone,password_hash,role) VALUES($1,$2,$3,$4,$5) RETURNING id,full_name,email,phone,role`,[full_name,email.toLowerCase(),phone||null,hash,safeRole]);
  res.status(201).json({user:r.rows[0],token:sign(r.rows[0])});
 }catch(e){res.status(e.code==='23505'?409:500).json({message:e.code==='23505'?'Email already registered.':e.message})}
});
router.post('/login',async(req,res)=>{
 try{
  const r=await pool.query('SELECT * FROM users WHERE email=$1 AND active=true',[String(req.body.email||'').toLowerCase()]);
  const u=r.rows[0];
  if(!u||!(await bcrypt.compare(req.body.password||'',u.password_hash)))return res.status(401).json({message:'Invalid email or password.'});
  const user={id:u.id,full_name:u.full_name,email:u.email,phone:u.phone,role:u.role};
  res.json({user,token:sign(user)});
 }catch(e){res.status(500).json({message:e.message})}
});
export default router;
