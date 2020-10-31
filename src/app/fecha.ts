export class FechaEsp{
    private fecha;
    constructor(fechaParam) {
        this.fecha= new Date( fechaParam );
    }
    meses = [
        'enero','febrero','marzo','abril','mayo','junio','julio',
        'agosto','septiembre','octubre','noviembre','diciembre'
    ];

    dias = [
        'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
    ];

    

    

    toString(){
        var dia=this.dias[this.fecha.getDay()];
        var numero=this.fecha.getDate();
        var mes=this.meses[this.fecha.getMonth()];
        var anio=this.fecha.getFullYear();
        var resp= dia + ", " + numero + " de " + mes + " de " + anio;
        return resp;
    }
}