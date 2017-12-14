// just an interface for type safety.
interface CartePostale {
  id?: CartePostale;
  codeEditeur?: number;
  editeur?: Editeur;
  monuments?: Monument;
  commune?: Commune;
  lat?: number;
  lng?: number;
  icon: string;
}
