export interface Artikal
{
    id_artikla:string;
    naziv_artikla : string;
    kolicina: number;
    cijena:number;
    iznosBezPDV :number;
    postoRabata :number;
    rabat:number;
    iznostSaRabatomBezPDV:number;
    pdv:number;
    ukupno:number;
    id_fakture:string;
}