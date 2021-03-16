class Charmander {
    constructor(name = "noname") {
      this._name = name;
      this._type = "Fire";
      this._evolution = "Evolució initial";
    }
    get name() {
      return this._name;
    }
    set name(name) {
      this._name = name;
    }
    get type() {
      return this._type;
    }
    get evolution() {
      return this._evolution;
    }
    attack() {
      return "Foc";
    }
}
   
   class Charmeleon extends Charmander {
    constructor(name) {
      super(name);
      this._evolution = "Evolució mitja";
    }
    attack() {
      return super.attack() + " + cop de cua";
    }
   }
   
   class Charizard extends Charmeleon {
    constructor(name) {
      super(name);
      this._evolution = "Evolució gran";
      this._type = "Fire & Flying";
    }
    attack() {
      return super.attack() + " + tornado alat";
    }
   }

   /*
    Crea un nou objecte anomentat "pokemon1" de classe Charmander i bateja'l amb el nom que vulguis.
    Mostra el nom del pokemon1;
    Mostra el tipus del pokemon1;
    Mostra l'evolució de pokemon1;
   */


function statPoke(nomPokemon){
    return ("Pokemon : " +nomPokemon.constructor.name) +("<br>Nom del pokemon : " +nomPokemon.name) + ("<br>Tipus : " +nomPokemon.type) + ("<br>Evolució : " +nomPokemon.evolution);
}   
pokemon1 = new Charmander("Papu");

document.getElementById("pokemon1").innerHTML = statPoke(pokemon1);

//Fes que ataqui.
document.getElementById("atacar").innerHTML = ("Pokemon1 ha fet el atac " +pokemon1.attack() + " !");

//rea dos altres pokemon de tipus Charmeleon i Charizard i mostra de cadascun d'ells el nom, el tipus, l'evolució i l'atac.
pokemon2 = new Charmeleon("Papusito");
document.getElementById("pokemon2").innerHTML = statPoke(pokemon2);

pokemon3 = new Charizard("Papusote");
document.getElementById("pokemon3").innerHTML = statPoke(pokemon3);

//Crea les classes Bulbasaur i Squirtle amb les seves respectives evolucions.

class Bulbasaur  {
    constructor(name = "noname") {
      this._name = name;
      this._type = "Grass & Poison";
      this._evolution = "Evolució initial";
    }
    get name() {
      return this._name;
    }
    set name(name) {
      this._name = name;
    }
    get type() {
      return this._type;
    }
    get evolution() {
      return this._evolution;
    }
    attack() {
      return "Latigo Cepa";
    }
}
   
   class Ivysaur extends Bulbasaur {
    constructor(name) {
      super(name);
      this._evolution = "Evolució mitja";
    }
    attack() {
      return super.attack() + " + Bomba lodo";
    }
   }
   
   class Venusaur extends Ivysaur {
    constructor(name) {
      super(name);
      this._evolution = "Evolució gran";
    }
    attack() {
      return super.attack() + " + Rayo Solar";
    }
   }

   class Squirtle {
    constructor(name = "noname") {
      this._name = name;
      this._type = "Water";
      this._evolution = "Evolució initial";
    }
    get name() {
      return this._name;
    }
    set name(name) {
      this._name = name;
    }
    get type() {
      return this._type;
    }
    get evolution() {
      return this._evolution;
    }
    attack() {
      return "Burbuja";
    }
}
   
   class Wartortle extends Squirtle {
    constructor(name) {
      super(name);
      this._evolution = "Evolució mitja";
    }
    attack() {
      return super.attack() + " + cañon agua";
    }
   }
   
   class Blastoise extends Wartortle {
    constructor(name) {
      super(name);
      this._evolution = "Evolució gran";
    }
    attack() {
      return super.attack() + " + hydro pump";
    }
   }