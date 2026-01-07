export class Password {
  private readonly value: string;

  constructor(password: string) {
    this.validate(password);
    this.value = password;
  }

  private validate(password: string): void {
    // Valida si se recibe un password no vacío
    if (!password || password.trim() === '') {
      throw new Error('La contraseña no puede estar vacía.');
    }
  }

  getValue(): string {
    return this.value;
  }

  // Para realizar comparación por su VALOR, no por identidad
  equals(other: Password): boolean {
    return this.value === other.value;
  }

  // Convierte el valor a un string
  toString(): string {
    return this.value;
  }
}
