import { useMemo } from 'react'
import type {
  CharacterSequenceValidation,
  CountryFlagValidation,
  PasswordData,
  PasswordTimeValidation,
} from './passwordTypes'

type PasswordStrengthProps = {
  passwordData: PasswordData
  sequenceValidation: CharacterSequenceValidation
  timeValidation: PasswordTimeValidation
  countryValidation: CountryFlagValidation
}

function PasswordStrength({ passwordData, sequenceValidation, timeValidation, countryValidation }: PasswordStrengthProps) {
  const password = passwordData.value

  const checks = useMemo(
    () => [
      { label: 'Minimálně 8 znaků', passed: password.length >= 8 },
      { label: 'Alespoň jedno velké písmeno', passed: /[A-Z]/.test(password) },
      { label: 'Alespoň jedno číslo', passed: /\d/.test(password) },
      {
        label: 'Alespoň jeden speciální znak (!@#$%^&*)',
        passed: /[!@#$%^&*]/.test(password),
      },
      { label: 'Sekvence malý-velký-číslo-speciální', passed: sequenceValidation.isValid },
      { label: `Čas zadání alespoň ${(timeValidation.minMs / 1000).toFixed(0)} s`, passed: timeValidation.isValid },
      {
        label: countryValidation.countryCode
          ? `Obsahuje zkratku země ${countryValidation.countryCode}`
          : 'Obsahuje zkratku vybrané země',
        passed: countryValidation.isValid,
      },
    ],
    [countryValidation.countryCode, countryValidation.isValid, password, sequenceValidation.isValid, timeValidation.isValid, timeValidation.minMs],
  )

  const passedCount = checks.filter((item) => item.passed).length

  let strengthLabel = 'Slabé'
  let barClass = 'weak'

  if (passedCount >= 5) {
    strengthLabel = 'Silné'
    barClass = 'strong'
  } else if (passedCount >= 3) {
    strengthLabel = 'Střední'
    barClass = 'medium'
  }

  const scorePercent = (passedCount / checks.length) * 100

  return (
    <section className="strength-card card shadow-sm">
      <p className="strength-text">
        Síla hesla: <strong>{password ? strengthLabel : 'Zatím nevyhodnoceno'}</strong>
      </p>

      <div className="strength-bar">
        <div className={`strength-fill ${barClass}`} style={{ width: `${password ? scorePercent : 0}%` }} />
      </div>

      {password && passedCount < checks.length && (
        <p className="warning">Heslo zatím nesplňuje všechna bezpečnostní kritéria.</p>
      )}

      {password && passedCount === checks.length && (
        <p className="success">Heslo splňuje všechna požadovaná kritéria.</p>
      )}

      <ul className="criteria-list">
        {checks.map((item) => (
          <li key={item.label} className={item.passed ? 'passed' : 'failed'}>
            {item.passed ? 'Spravne' : 'Spatne'} {item.label}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PasswordStrength
