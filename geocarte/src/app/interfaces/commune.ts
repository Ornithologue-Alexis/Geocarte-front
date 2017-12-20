// just an interface for type safety.
interface Commune {
  insee: string;
  nom: string;
  latitude: number;
  longitude: number;
  departement: Departement[];
}
