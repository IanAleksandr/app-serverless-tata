import PersonajeBuilder from './PersonajeBuilder'

export class Personaje {

    builder = new PersonajeBuilder();
    builder = builder.getAllValues();

    constructor(builder) {
        this.nombre = builder.nombre ;
        this.anio_nacimiento = builder.anio_nacimiento ;
        this.color_ojos = builder.color_ojos ;
        this.genero = builder.genero ;
        this.color_cabello = builder.color_cabello ;
        this.altura = builder.altura ;
        this.peso = builder.peso ;
        this.color_piel = builder.color_piel ;
        this.planeta = builder.planeta ;
        this.peliculas = builder.peliculas ;
        this.especies = builder.especies ;
        this.naves_estelares = builder.naves_estelares ;
        this.vehiculos = builder.vehiculos ;
        this.url = builder.url ;
        this.fecha_creacion = builder.fecha_creacion ;
        this.fecha_edicion = builder.fecha_edicion ;
    }
}

module.exports = Personaje;