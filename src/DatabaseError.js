class ErrorTemplate extends Error {
  constructor(...values) {
    super(values.join(' '));
    this.message = values.join(' ');
  }
  
  toString() {
    return 'DatabaseError: ' + this.message;
  }
}

class DatabaseError extends ErrorTemplate {}
module.exports = DatabaseError;