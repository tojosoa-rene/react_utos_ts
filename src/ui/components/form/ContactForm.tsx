// Fichier du formulaire de contact
// - il gère l'état local du formulaire (champs, erreurs, toast)
// - il valide les champs et affiche les erreurs correspondantes
// - il affiche un toast de succès ou d'erreur lors de la soumission du formulaire

import { useState } from 'react'
import '../../../styles/form.css'
import '../../../styles/toast.css'

type Fields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Fields>

function ContactForm() {
  const [fields, setFields]       = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]       = useState<Errors>({})
  const [toast, setToast]         = useState<string>('')
  const [showToast, setShowToast] = useState<boolean>(false)

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const triggerToast = (msg: string) => {
    setToast(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSubmit = () => {
    const newErrors : Errors = {}
    if (!fields.name) newErrors.name = 'Please enter your name'
    if (!fields.email || !isValidEmail(fields.email)) newErrors.email = 'Please enter a valid email'
    if (!fields.subject) newErrors.subject = 'Please enter a subject'
    if (!fields.message) newErrors.message = 'Please enter a message'
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      triggerToast('Form submitted successfully')
      setFields({ name: '', email: '', subject: '', message: '' })
    }
  }

  const handleReset = () => {
    setFields({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    triggerToast('Form cleared')
  }

  const handleChange = (
    field: keyof Fields,
    value: string
  ): void => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <div className="form-card">

        {(['name', 'email', 'subject'] as (keyof Fields)[]).map(field => (
          <div className="form-group-custom" key={field}>
            <label className="form-label-custom">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>

            <input
              type={field === 'email' ? 'email' : 'text'}
              className={`form-control-rounded ${errors[field] ? 'error' : ''}`}
              placeholder={`Enter ${field}`}
              value={fields[field]}
              onChange={e => handleChange(field, e.target.value)}
            />

            {errors[field] && (
              <div className="error-msg show">
                {errors[field]}
              </div>
            )}
          </div>
        ))}

        <div className="form-group-custom">
          <label className="form-label-custom">Message</label>

          <textarea
            className={`form-control-rounded ${errors.message ? 'error' : ''}`}
            rows={3}
            placeholder="Enter message"
            value={fields.message}
            onChange={e => handleChange('message', e.target.value)}
          />

          {errors.message && (
            <div className="error-msg show">
              {errors.message}
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button className="btn-reset" onClick={handleReset}>
            Reset
          </button>

          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className={`toast-msg ${showToast ? 'show' : ''}`}>
        {toast}
      </div>
    </>
  )
}

export default ContactForm