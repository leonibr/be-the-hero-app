import React from 'react';

export default function FormErrors({ errors }) {
  return (
    <div className="formErrors">
      {Object.keys(errors).map((fieldName, i) => {
        if (errors[fieldName].length > 0) {
          return (
            <p key={i}>
              {fieldName} {errors[fieldName]}
            </p>
          );
        } else {
          return '';
        }
      })}
    </div>
  );
}
