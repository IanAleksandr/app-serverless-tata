import Personaje from './Personaje'; 

export default class PersonajeBuilder{
    nombre = "";
    anio_nacimiento = "";
    color_ojos = "";
    genero = "";
    color_cabello = "";
    altura = "";
    peso = "";
    color_piel = "";
    planeta = "";
    peliculas = [];
    especies = [];
    naves_estelares = [];
    vehiculos = [];
    url = "";
    fecha_creacion = "";
    fecha_edicion = "";

    constructor(){

    }

    setNombre(nombre){
        this.nombre= nombre;
    }

    setAnio_nacimiento(anio_nacimiento){
        this.anio_nacimiento= anio_nacimiento;
    }

    setColor_ojos(color_ojos){
        this.color_ojos= color_ojos;
    }
    setGenero(genero){
        this.genero= genero;
    }
    setColor_cabello(color_cabello){
        this.color_cabello= color_cabello;
    }
    setAltura(altura){
        this.altura= altura;
    }
    setPeso(peso){
        this.peso= peso;
    }
    setColor_piel(color_piel){
        this.color_piel= color_piel;
    }
    setPlaneta(planeta){
        this.planeta= planeta;
    }
    setPeliculas(peliculas){
        this.peliculas= peliculas;
    }
    setEspecies(especies){
        this.especies= especies;
    }
    setNaves_estelares(naves_estelares){
        this.naves_estelares= naves_estelares;
    }
    setVehiculos(vehiculos){
        this.vehiculos= vehiculos;
    }
    setUrl(url){
        this.url= url;
    }
    setFecha_creacion(fecha_creacion){
        this.fecha_creacion= fecha_creacion;
    }
    setFecha_edicion(fecha_edicion){
        this.fecha_edicion= fecha_edicion;
    }

    getPersonaje() {
        return new Personaje(this);
    }
    getAllValues() {
        return this;
    }
}