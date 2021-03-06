import { Container } from "typedi";
import { ListaController } from "../controllers/listaController";

const controller = Container.get<ListaController>("listaController");
exports.handler = controller.updateLista.bind(controller);
