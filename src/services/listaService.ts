import { Service, Inject } from "typedi";
import { Repository, EntityManager } from "typeorm";
import { Lista } from "../models/lista";
import { ITLista } from "../../src/models/interfaces/lista.interfaces";

@Service("listaService")
export class ListaService {
  private listaRepository: Repository<Lista>;
  private entityManager: EntityManager;

  constructor(@Inject("entityManager") entityManager: EntityManager, @Inject("listaRepository") listaRepository: Repository<Lista>) {
    this.entityManager = entityManager;
    this.listaRepository = listaRepository;
  }

  public async buscarLista(): Promise<Lista[]> {
    return await this.listaRepository.find();
  }

  public async criarLista(params: ITLista): Promise<Lista> {
    const { descricao, quantidade } = params;
    const lista = new Lista();
    
    lista.descricao = descricao;
    lista.quantidade = quantidade;

    return await this.listaRepository.manager.save(lista);
  }
}
