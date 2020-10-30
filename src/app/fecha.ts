
export class FechaEsp{
    constructor() {}
    meses = [
        'enero','febrero','marzo','abril','mayo','junio','julio',
        'agosto','septiembre','octubre','noviembre','diciembre'
    ];

    dias = [
        'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
    ];

    fecha= new Date();

    dia=this.dias[this.fecha.getDay()];
    numero=this.fecha.getDate();
    mes=this.meses[this.fecha.getMonth()];
    anio=this.fecha.getFullYear();

    toString(){
        var resp= this.dia + ", " + this.numero + " de " + this.mes + " de " + this.anio;
        return resp;
    }
}