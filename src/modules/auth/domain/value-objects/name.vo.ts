export class Name {
  private readonly value: string;

  constructor(name: string) {
    this.validate(name);
    this.value = name;
  }

  private validate(name: string): void {
    // Valida si se recibe un nombre no vacío
    if (!name || name.trim() === '') {
      throw new Error('El nombre de usuario no puede estar vacío.');
    }

    // Valida si el nombre es alfanumérico
    const nameRegEx = /^[a-zA-Z0-9]+$/;
    if (!nameRegEx.test(name)) {
      throw new Error('Nombre de usuario solo debe contener letras y/o números');
    }
  }

  getValue(): string {
    return this.value;
  }

  // Para realizar comparación por su VALOR, no por identidad
  equals(other: Name): boolean {
    return this.value === other.value;
  }

  // Convierte el valor a un string
  toString(): string {
    return this.value;
  }
}
