import { useState } from 'react'
import '../../../styles/form.css'
import '../../../styles/toast.css'

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState('')
  const [showToast, setShowToast] = useState(false)

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const triggerToast = (msg) => {
    setToast(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSubmit = () => {
    const newErrors = {}
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

  return (
    <>
      <div className="form-card">
        {['name', 'email', 'subject'].map(field => (
          <div className="form-group-custom" key={field}>
            <label className="form-label-custom">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              className={`form-control-rounded ${errors[field] ? 'error' : ''}`}
              placeholder={`Enter ${field}`}
              value={fields[field]}
              onChange={e => setFields({ ...fields, [field]: e.target.value })}
            />
            {errors[field] && <div className="error-msg show">{errors[field]}</div>}
          </div>
        ))}
        <div className="form-group-custom">
          <label className="form-label-custom">Message</label>
          <textarea
            className={`form-control-rounded ${errors.message ? 'error' : ''}`}
            rows="3"
            placeholder="Enter message"
            value={fields.message}
            onChange={e => setFields({ ...fields, message: e.target.value })}
          />
          {errors.message && <div className="error-msg show">{errors.message}</div>}
        </div>
        <div className="form-buttons">
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <div className={`toast-msg ${showToast ? 'show' : ''}`}>{toast}</div>
    </>
  )
}

export default ContactForm