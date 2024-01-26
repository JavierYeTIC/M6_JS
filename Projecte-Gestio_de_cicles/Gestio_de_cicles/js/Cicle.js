
class Cicle{
    constructor(nom, categoria, numAlumnes, abreviatura){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.ultimaEdicio = null;
        this.moduls = [];
    }

    setNumEdicions(){
        this.numEdicions++;
        this.ultimaEdicio = new Date();
    }

    afegirModul(modul){
        this.moduls.push(modul);
        // Ordenar els mòduls pel seu número
        this.moduls.sort((a, b) => a.num - b.num);
    }

    calcularHores(){
        let hores = 0;
        this.moduls.forEach(modul => {
            hores += parseInt(modul.hores);
        });
        return hores;
    }

    toString(){
        let info = `Nom: ${this.nom}\nCategoria: ${this.categoria}\nNum d'alumnes: ${this.numAlumnes}\nAbreviatura: ${this.abreviatura}\nNum d'edicions: ${this.numEdicions}\nÚltima edició: ${this.ultimaEdicio}\n`;

        if(this.moduls.length > 0){
            info += "Mòduls:\n";
            this.moduls.forEach(modul => {
                info += `  - ${modul.nom} (Num: ${modul.num}, Hores: ${modul.hores})\n`;
            });
        }

        return info;
    }
}

export { Cicle };