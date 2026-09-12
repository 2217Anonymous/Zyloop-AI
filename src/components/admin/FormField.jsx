export default function FormField({
  label,
  id,
  children,
  hint,
  error,
  required = false,
}) {
  return (
    <div className={`cms-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="cms-required">*</span>}
      </label>
      {children}
      {hint && !error && <p className="cms-field-hint">{hint}</p>}
      {error && <p className="cms-field-error">{error}</p>}
    </div>
  )
}
