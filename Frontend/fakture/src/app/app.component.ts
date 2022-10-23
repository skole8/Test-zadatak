import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ɵNG_PROV_DEF } from '@angular/core';
import { Artikal } from './models/artikal.model';
import { Faktura } from './models/faktura.model';
import { ArtikliService } from './services/artikli.service';
import { FaktureService } from './services/fakture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'fakture';
  pomId = '';
  fakture: Faktura[] = [];
  artikli: Artikal[] = [];
  artikliKorpa: Artikal[] = [];
  artikliZaUklanjanje: Artikal[] = [];
  artikliFaktureNaPregledu: Artikal[]=[];

  pomArtikal: Artikal = {
    id_artikla: '',
    naziv_artikla: '',
    kolicina: 0,
    cijena: 0,
    iznosBezPDV: 0,
    postoRabata: 0,
    rabat: 0,
    iznostSaRabatomBezPDV: 0,
    pdv: 0,
    ukupno: 0,
    id_fakture: ''
  }

  artikal: Artikal = {
    id_artikla: '',
    naziv_artikla: '',
    kolicina: 0,
    cijena: 0,
    iznosBezPDV: 0,
    postoRabata: 0,
    rabat: 0,
    iznostSaRabatomBezPDV: 0,
    pdv: 0,
    ukupno: 0,
    id_fakture: ''
  }

  faktura: Faktura = {
    id_fakture: '',
    datum: new Date(0),
    partner: '',
    iznosBezPDV: 0,
    postoRabata: 0,
    rabat: 0,
    iznostSaRabatomBezPDV: 0,
    pdv: 0,
    ukupno: 0
  }

  fakturaNaPregledu: Faktura = {
    id_fakture: '',
    datum: new Date(0),
    partner: '',
    iznosBezPDV: 0,
    postoRabata: 0,
    rabat: 0,
    iznostSaRabatomBezPDV: 0,
    pdv: 0,
    ukupno: 0
  }

  constructor(private faktureService: FaktureService, private artikliService: ArtikliService) {

  }

  dodajAzurirajFakturu()  //dodavanje nove ili azuriranje postojece fakture
  {
    if (this.faktura.ukupno > 0) {
      if (this.faktura.id_fakture != '')  //azuriranje postojece fakture
      {
        this.azurirajFakturu(this.faktura);
        document.getElementById("btnDodajAzurirajFakturu")!.innerText="Dodaj novu fakturu"
        document.getElementById("btnPonistiPromjene")!.innerText="Otkazi dodavanje" 
      }
      else {                       //dodavanje nove fakture
        this.dodajNovuFakturu(this.faktura);
      }
      document.getElementById("hdArtikliNaFakturi")!.style.display='none';

    }
    else
      alert("Morate unijeti bar jedan artikal");
  }

  resetujFormu()    //resetovanje forme
  {
    this.faktura = {
      id_fakture: '',
      datum: new Date(0),
      partner: '',
      iznosBezPDV: 0,
      postoRabata: 0,
      rabat: 0,
      iznostSaRabatomBezPDV: 0,
      pdv: 0,
      ukupno: 0
    }
  }

  resetujArtikal() {
    this.artikal = {
      id_artikla: '',
      naziv_artikla: '',
      kolicina: 0,
      cijena: 0,
      iznosBezPDV: 0,
      postoRabata: 0,
      rabat: 0,
      iznostSaRabatomBezPDV: 0,
      pdv: 0,
      ukupno: 0,
      id_fakture: ''
    }
  }

  izracunajArtikal()   //funkcija racuna vrijednosti artikla
  {
    this.artikal.iznosBezPDV = this.artikal.cijena * this.artikal.kolicina;
    this.artikal.kolicina = parseInt(this.artikal.kolicina.toString());
    this.artikal.rabat = this.artikal.iznosBezPDV * this.artikal.postoRabata / 100;
    this.artikal.iznostSaRabatomBezPDV = this.artikal.iznosBezPDV - this.artikal.rabat;
    this.artikal.pdv = parseFloat((this.artikal.iznostSaRabatomBezPDV * 0.17).toFixed(2));
    this.artikal.ukupno = this.artikal.iznostSaRabatomBezPDV + this.artikal.pdv;
  }

  ponistiPromjene() {
    if (this.faktura.id_fakture != '') //ako se uredjuje postojeca faktura
    {
      if(this.faktura.ukupno!=this.fakturaNaPregledu.ukupno) // ako su se desile izmjene
      {
      this.artikliZaUklanjanje.forEach(element => {
        this.artikliKorpa.push(element);
      });
      this.artikliZaUklanjanje = [];
      this.faktura=Object.assign(this.faktura,this.fakturaNaPregledu);
      this.popuniFormu();
      this.artikliKorpa=Object.assign(this.artikliKorpa,this.artikliFaktureNaPregledu);
      document.getElementById("btnPonistiPromjene")!.innerText="Otkazi izmjenu"; 
    }
    else  //ako nema izmjena
    {
      this.resetujFormu();
      this.artikliKorpa=[];
      document.getElementById("hdDodavanjeFakture")!.innerText="Dodavanje nove fakture"
      document.getElementById("btnDodajAzurirajFakturu")!.innerText="Dodaj novu fakturu"
      document.getElementById("btnPonistiPromjene")!.innerText="Otkazi dodavanje"
      document.getElementById("hdArtikliNaFakturi")!.style.display='none'
      
      
    }
  }
    else  //ako se radi o dodavanju nove fakture
    {
      this.artikliKorpa = [];
      this.resetujArtikal();
      this.resetujFormu();
      document.getElementById("hdArtikliNaFakturi")!.style.display='none'

    }
  }

  ukloniArtikal(artikal:Artikal)
  {
    this.faktura.iznosBezPDV -= artikal.iznosBezPDV;
      this.faktura.iznosBezPDV = parseFloat((this.faktura.iznosBezPDV).toFixed(2));

      this.faktura.rabat -= artikal.rabat;
      this.faktura.rabat = parseFloat((this.faktura.rabat).toFixed(2));

      this.faktura.iznostSaRabatomBezPDV -= artikal.iznostSaRabatomBezPDV;
      this.faktura.iznostSaRabatomBezPDV = parseFloat((this.faktura.iznostSaRabatomBezPDV).toFixed(2));

      if (this.faktura.iznosBezPDV != 0) {
        this.faktura.postoRabata = (this.faktura.rabat / this.faktura.iznosBezPDV) * 100;
        this.faktura.postoRabata = parseFloat((this.faktura.postoRabata).toFixed(2));
      }
      else
        this.faktura.postoRabata = 0;

      this.faktura.pdv -= artikal.pdv;
      this.faktura.pdv = parseFloat((this.faktura.pdv).toFixed(2));

      this.faktura.ukupno -= artikal.ukupno;
      this.faktura.ukupno = parseFloat((this.faktura.ukupno).toFixed(2));
  }

  ukloniArtikalSaFakture(artikal: Artikal) {

    if (artikal.id_artikla == '' || artikal.id_artikla == 'postojeci')  //uklanjanje novog artikla
    {
      this.ukloniArtikal(artikal);
      this.artikliKorpa.splice(this.artikliKorpa.indexOf(artikal), 1);
    }
    else  //uklanjanje postojeceg artikla sa fakture
    {
      this.ukloniArtikal(artikal);
      this.artikliKorpa.splice(this.artikliKorpa.indexOf(artikal), 1);
      this.artikliZaUklanjanje.push(
        this.pomArtikal = {
          id_artikla: artikal.id_artikla,
          naziv_artikla: artikal.naziv_artikla,
          kolicina: artikal.kolicina,
          cijena: artikal.cijena,
          iznosBezPDV: artikal.iznosBezPDV,
          postoRabata: artikal.postoRabata,
          rabat: artikal.rabat,
          iznostSaRabatomBezPDV: artikal.iznostSaRabatomBezPDV,
          pdv: artikal.pdv,
          ukupno: artikal.ukupno,
          id_fakture: artikal.id_fakture
        }
      );
      if(this.faktura.id_fakture!='')
      {
        document.getElementById("btnDodajAzurirajFakturu")!.innerText="Potvrdi izmjenu"
        document.getElementById("btnPonistiPromjene")!.innerText="Ponisti promjene"
      }
    }
  }

  sabiranjeArtiklaNaFakturu() {
    this.faktura.iznosBezPDV += this.artikal.iznosBezPDV;
    this.faktura.iznosBezPDV = parseFloat((this.faktura.iznosBezPDV).toFixed(2));

    this.faktura.rabat += this.artikal.rabat;
    this.faktura.rabat = parseFloat((this.faktura.rabat).toFixed(2));

    this.faktura.iznostSaRabatomBezPDV += this.artikal.iznostSaRabatomBezPDV;
    this.faktura.iznostSaRabatomBezPDV = parseFloat((this.faktura.iznostSaRabatomBezPDV).toFixed(2));

    if (this.faktura.iznosBezPDV != 0) {
      this.faktura.postoRabata = (this.faktura.rabat / this.faktura.iznosBezPDV) * 100;
      this.faktura.postoRabata = parseFloat((this.faktura.postoRabata).toFixed(2));
    }

    this.faktura.pdv += this.artikal.pdv;
    this.faktura.pdv = parseFloat((this.faktura.pdv).toFixed(2));

    this.faktura.ukupno += this.artikal.ukupno;
    this.faktura.ukupno = parseFloat((this.faktura.ukupno).toFixed(2));

  }

  oduzimanjeArtiklaSaFakture() {
    this.faktura.iznosBezPDV -= this.artikal.iznosBezPDV;
    this.faktura.rabat -= this.artikal.rabat;
    this.faktura.iznostSaRabatomBezPDV -= this.artikal.iznostSaRabatomBezPDV;
    this.faktura.postoRabata = (this.faktura.rabat / this.faktura.iznosBezPDV) * 100;
    this.faktura.pdv -= this.artikal.pdv;
    this.faktura.ukupno -= this.artikal.ukupno;
  }

  dodajArtikalNaFakturu() {
  
    if (this.artikal.kolicina % 1 == 0 && this.artikal.cijena>0 && this.artikal.postoRabata>=0) {
        if (this.artikal.id_artikla == '')  //ako se dodaje novi artikal
        {
          this.izracunajArtikal();
          if (this.artikal.ukupno > 0 && this.artikal.postoRabata >= 0) {
            this.sabiranjeArtiklaNaFakturu();
            this.artikliKorpa.push(
              this.pomArtikal = {
                id_artikla: 'postojeci',
                naziv_artikla: this.artikal.naziv_artikla,
                kolicina: this.artikal.kolicina,
                cijena: this.artikal.cijena,
                iznosBezPDV: this.artikal.iznosBezPDV,
                postoRabata: this.artikal.postoRabata,
                rabat: this.artikal.rabat,
                iznostSaRabatomBezPDV: this.artikal.iznostSaRabatomBezPDV,
                pdv: this.artikal.pdv,
                ukupno: this.artikal.ukupno,
                id_fakture: ''
              }
            );
            this.resetujArtikal();
            document.getElementById("hdArtikliNaFakturi")!.style.display='block';
          }
          else
            alert("Molimo da ispravno unesete artikal");
        }
        else  // ako se ispravlja postojeci artikal
        {
          this.oduzimanjeArtiklaSaFakture();  //artikal cemo kompletno da oduzmemo sa fakture pa cemo ga nanovo dodati nakon izmjena
          this.izracunajArtikal();
          if (this.artikal.ukupno > 0 && this.artikal.postoRabata >= 0) {
            this.sabiranjeArtiklaNaFakturu();
            this.resetujArtikal();
          }
        }
      document.getElementById("hdDodavanjeArtikla")!.textContent="Dodavanje artikla na fakturu";
      document.getElementById("btnDodajArtikal")!.textContent="Dodaj novi artikal";
      if(this.faktura.id_fakture!='')
      document.getElementById("btnPonistiPromjene")!.textContent="Ponisti promjene";
    }
    else
      alert("Molimo da ispravno unesete artikal");

  }

  urediArtikalUKorpi(artikal: Artikal) {
    this.artikal = artikal;
    document.getElementById("btnDodajArtikal")!.textContent="Azuriraj artikal";
    document.getElementById("hdDodavanjeArtikla")!.textContent="Azuriranje artikla sa fakture";
  }

  popuniFormu() {
    this.artikliKorpa = [];
    this.artikli.forEach(element => {
      if (element.id_fakture == this.faktura.id_fakture)
        this.artikliKorpa.push(element);
    });
  }

  ngOnInit() {
    this.dobaviSveFakture();
    this.getAllArtikli();
  }

  getAllArtikli() {
    this.artikliService.getAllArtikli().subscribe(data => {
      this.artikli = data;
    });
  }

  updateArtikal(artikal: Artikal) {
    this.artikliService.updateArtikal(artikal.id_artikla, artikal).subscribe(data => {
      this.getAllArtikli();
    })
  }

  dodajArtikalUBazu(artikal: Artikal) {
    this.artikliService.addArtikal(artikal).subscribe(data => {
      this.getAllArtikli();
    })
  }

  deleteArtikal(artikal: Artikal) {
    this.artikliService.deleteArtikal(artikal.id_artikla).subscribe(data => {
      this.getAllArtikli();
    })
  }

  dobaviSveFakture() {
    this.faktureService.getAllFakture().subscribe(data => {
      this.fakture = data;
    });
  }

  deleteFaktura(id: string) {
    this.faktureService.deleteFaktura(id).subscribe(data => {
      this.dobaviSveFakture();
      this.getAllArtikli();
      this.artikliKorpa=[];
      this.resetujFormu();
    });
  }

  dodajNovuFakturu(faktura: Faktura) {
    this.faktureService.addFaktura(faktura).subscribe(data => {
      this.artikliKorpa.forEach(element => {
        element.id_fakture = data.id_fakture;
        this.dodajArtikalUBazu(element);
      });
      this.artikliKorpa = [];
      this.dobaviSveFakture();
    });
    this.resetujFormu();
  }

  azurirajFakturu(faktura: Faktura) {
    if(this.faktura.ukupno!=this.fakturaNaPregledu.ukupno)
    {
    this.faktureService.updateFaktura(faktura.id_fakture, faktura).subscribe(data => {
      this.artikliKorpa.forEach(element => {
        if (element.id_artikla != '' && element.id_artikla != 'postojeci')
          this.updateArtikal(element);
        else {
          element.id_fakture = faktura.id_fakture;
          this.dodajArtikalUBazu(element);
        }
      });
      this.artikliZaUklanjanje.forEach(element => {
        this.deleteArtikal(element);
      });
      this.artikliKorpa = [];
      this.artikliZaUklanjanje = [];
      this.dobaviSveFakture();
      this.getAllArtikli();
      this.resetujPregledFakture();
      document.getElementById("divPregledFakture")!.style.visibility='hidden';
      this.resetujFormu();
    });
  }
  else  //ako se nije desila nijedna izmjena da samo resetujemo formu umjesto da se bespotrebno obracamo serveru
  {
    alert("Fakture su jednake pa se necemo obracati serveru");
    this.artikliKorpa = [];
      this.resetujArtikal();
      this.resetujFormu();
      document.getElementById("hdArtikliNaFakturi")!.style.display='none'
  }
  }

  pregledFakture(faktura:Faktura)
  {
    this.resetujPregledFakture();
    document.getElementById("lblIdFakture")!.textContent=faktura.id_fakture;
    document.getElementById("lblPartner")!.textContent=faktura.partner;
    document.getElementById("lblDatum")!.textContent=faktura.datum.toString().slice(0,10);
    document.getElementById("lblIznosBezPDV")!.textContent=faktura.iznosBezPDV.toString();
    document.getElementById("lblPostoRabata")!.textContent=faktura.postoRabata.toString();
    document.getElementById("lblRabat")!.textContent=faktura.rabat.toString();
    document.getElementById("lblIznosSaRabatomBezPDV")!.textContent=faktura.iznostSaRabatomBezPDV.toString();
    document.getElementById("lblPDV")!.textContent=faktura.pdv.toString();
    document.getElementById("lblUkupno")!.textContent=faktura.ukupno.toString();

    this.artikli.forEach(element => {
      if(element.id_fakture==faktura.id_fakture)
      {
        this.artikliFaktureNaPregledu.push(Object.assign(this.artikliFaktureNaPregledu,element));
      }
    });

    this.fakturaNaPregledu= Object.assign(this.fakturaNaPregledu,faktura);
    document.getElementById("divPregledFakture")!.style.visibility='visible';
    
  }

  resetujPregledFakture()
  {
    this.fakturaNaPregledu  = {
      id_fakture: '',
      datum: new Date(0),
      partner: '',
      iznosBezPDV: 0,
      postoRabata: 0,
      rabat: 0,
      iznostSaRabatomBezPDV: 0,
      pdv: 0,
      ukupno: 0
    }

    document.getElementById("lblIdFakture")!.textContent="";
    document.getElementById("lblPartner")!.textContent="";
    document.getElementById("lblDatum")!.textContent="";
    document.getElementById("lblIznosBezPDV")!.textContent="";
    document.getElementById("lblPostoRabata")!.textContent="";
    document.getElementById("lblRabat")!.textContent="";
    document.getElementById("lblIznosSaRabatomBezPDV")!.textContent="";
    document.getElementById("lblPDV")!.textContent="";
    document.getElementById("lblUkupno")!.textContent="";

    this.artikliFaktureNaPregledu=[];
  }

  brisanjeFakture(id:string)
  {
    this.deleteFaktura(id);
    this.resetujPregledFakture();
    document.getElementById("divPregledFakture")!.style.visibility='hidden';
    document.getElementById("hdArtikliNaFakturi")!.style.display='none';
  }

  izmjenaFakture()
  {
    document.getElementById("hdDodavanjeFakture")!.innerText="Izmjena fakture"
    document.getElementById("btnDodajAzurirajFakturu")!.innerText="Potvrdi izmjenu"
    document.getElementById("btnPonistiPromjene")!.innerText="Otkazi izmjenu"
    document.getElementById("hdArtikliNaFakturi")!.style.display='block';


    this.faktura=Object.assign(this.faktura,this.fakturaNaPregledu);
    this.resetujArtikal();
    this.popuniFormu();
  
  }

  dobaviFakturuIzBaze(id: string) {
    this.faktureService.getSingleFaktura(id).subscribe(data => {
      this.faktura = data;
    })
  }

}

