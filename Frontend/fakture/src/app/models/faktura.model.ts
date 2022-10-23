export interface Faktura
{
    id_fakture:string;
    datum:Date;
    partner : string;
    iznosBezPDV :number;
    postoRabata :number;
    rabat:number;
    iznostSaRabatomBezPDV:number;
    pdv:number;
    ukupno:number;
}