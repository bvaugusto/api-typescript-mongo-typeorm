import { Container } from "typedi";
import { getManager, getRepository } from "typeorm";

// Model
import { Lista } from "./src/models/lista";

// Service
import "./src/services/listaService";

// Controller
import "./src/controllers/listaController";

// Middlewares

Container.set("listaRepository", getRepository(Lista));
Container.set("entityManager", getManager()); 
