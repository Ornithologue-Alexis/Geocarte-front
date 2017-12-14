// just an interface for type safety.
interface Commune {
  insee: number;
  nom: string;
  latitude: number;
  longitude: number;
  departement: Departement[];
}
