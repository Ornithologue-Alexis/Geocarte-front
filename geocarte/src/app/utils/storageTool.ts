export default class StorageTool {

  static isEmpty(): boolean {
    if (localStorage.length === 0) {
      return true;
    }
    return false;
  }

  static setIdUtilisateur(idUser: number): void {
    localStorage.setItem('currentUserId', idUser.toString());
  }

  static getIdUtilisateur(): string {
    if (localStorage.getItem('currentUserId')) {
      return localStorage.getItem('currentUserId');
    }
  }

  static disconnect(): void {
    localStorage.clear();
  }

}
