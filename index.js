import promptsync from 'prompt-sync';
import { validate } from 'bycontract';
const prompt = promptsync({sigint:true});


class vagão{
    #identificador
    #capacidadeCarga

    static #idgen = 0;

constructor(capacidadeCarga){
    validate(arguments, ["Number"]);
    if (capacidadeCarga<=0){
        this.#capacidadeCarga = 0;
        this.#identificador = -1;
    }else{
        this.#capacidadeCarga = capacidadeCarga
        vagão.#idgen++;
        this.#identificador = vagão.#idgen;
    }
}

get identificador(){
    return this.#identificador;
}

get capacidadeCarga(){
    return this.#capacidadeCarga;
}

toString(){
    let str = `Vagão: ${this.#identificador}, capacidade de carga: ${this.#capacidadeCarga}.`;
    return str;
}
}

class garagem{
    #vagões

    constructor(){
        this.#vagões = [];
    }

    estacionar(vagão){
        validate(arguments, [vagão]);
        if (vagão.identificador == -1){
            return false;
        }
        this.#vagões.push(vagão);
        return true
    }

        quantidade(){
            return this.#vagões.length;
        }

        get vagões(){
            return this.#vagões.values();
        }

        retirar(identificador){
            validate(identificador,"Number");
            let r = undefined;
            if (this.quantidade() >0){
                for(let i = 0;i<this.quantidade();i++){
                    if(this.#vagões[i].identificador === identificador){
                        r = this.#vagões.splice(i,1)
                        break;
                    }
                }
            }
            return r;

        }
    }

let gv = new garagem();
gv.estacionar(new vagão(123456));
gv.estacionar(new vagão(234567));
gv.estacionar(new vagão(345678));
gv.estacionar(new vagão(456789));
gv.estacionar(new vagão(567890));
gv.estacionar(new vagão(678901));

for (let r of gv.vagões){
    console.log(r.toString());
}

let r = gv.retirar(1);
r = gv.retirar(2);
r = gv.retirar(3);
r = gv.retirar(4);
r = gv.retirar(5);
r = gv.retirar(6);

gv.estacionar(new vagão(500005));
//console.log("Vagão retirado: "+r.toString());

console.log("Restantes na garagem:")
for(let r of gv.vagões){
    console.log(r.toString());;
}

