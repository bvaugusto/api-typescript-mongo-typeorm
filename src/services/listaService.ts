import { Service, Inject } from "typedi";
import { Repository } from "typeorm";
import { Lista } from "../models/lista";
import { ITLista } from "../../src/models/interfaces/lista.interfaces";

@Service("listaService")
export class ListaService {
  private listaRepository: Repository<Lista>;

  constructor(@Inject("listaRepository") listaRepository: Repository<Lista>) {
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

  public async atualizarLista(id:string, params: ITLista): Promise<Lista> {
    const { descricao, quantidade } = params;
    const itemLista = await this.listaRepository.findOne(id);

    itemLista.descricao = descricao;
    itemLista.quantidade = quantidade;

    return await this.listaRepository.manager.save(itemLista);
  }

  public async removerItemLista(id:string): Promise<void> {
    const itemLista = await this.listaRepository.findOne(id);

    await this.listaRepository.manager.remove(itemLista);
  }
}
