import { Request, Response } from "express";
import { Service, Inject } from "typedi";
import { ListaService } from "../services/listaService";
import { ITLista } from "../../src/models/interfaces/lista.interfaces";

@Service("listaController")
export class ListaController {
  private listaService: ListaService;

  constructor(@Inject("listaService") listaService: ListaService) {
    this.listaService = listaService;
  }

  async getBuscarLista(req: Request, res: Response): Promise<void> {
    try {
      const Lista = await this.listaService.buscarLista();
      res.status(200).json(Lista);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async postCriarLista(req: Request, res: Response): Promise<void> {
    try {
      const params: ITLista = { ...req.body };
      const response = await this.listaService.criarLista(params);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateLista(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const params: ITLista = { ...req.body };
      const response = await this.listaService.atualizarLista(id, params);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteItemLista(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      await this.listaService.removerItemLista(id);
      res.status(200).json({ message: "Registro removido com sucesso!"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
