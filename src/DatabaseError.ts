class ErrorTemplate extends TypeError {
  constructor(...values: any[]) {
    super(values.join(' '));
    this.message = values.join(' ');
  }
  
  toString() {
    return 'DatabaseError: ' + this.message;
  }
}

export class DatabaseError extends ErrorTemplate {}