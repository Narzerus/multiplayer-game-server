'use strict';

module.exports = function (schema) {
  schema.add({
    created_at: Date,
    updated_at: Date,
  });

  schema.pre('save', function (next) {
    let currentDate;

    currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
      this.created_at = currentDate;
    }

    next();
  });
};
