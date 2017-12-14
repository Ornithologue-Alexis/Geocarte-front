// just an interface for type safety.
interface CartePostale {
  id?: VarianteCarte;
  idCarte: VarianteCarte;
  codeEditeur?: number;
  editeur?: Editeur;
  monuments?: Monument;
  commune?: Commune;
  lat?: number;
  lng?: number;
  nomEditeur?: string;
  nomCommune?: string;
  legende: string;
  nomMonument: string;
  icon: string;
}
