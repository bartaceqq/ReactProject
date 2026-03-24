import { useEffect, useMemo } from 'react'
import type { PasswordData, PasswordTimeValidation } from './passwordTypes'

type PasswordTimeValidatorProps = {
  passwordData: PasswordData
  windowMs?: number
  onValidationChange: (result: PasswordTimeValidation) => void
}

function PasswordTimeValidator({ passwordData, windowMs = 5000, onValidationChange }: PasswordTimeValidatorProps) {
  const result = useMemo<PasswordTimeValidation>(() => {
    if (!passwordData.value || passwordData.createdAt === null || passwordData.updatedAt === null) {
      return {
        isValid: false,
        elapsedMs: 0,
        minMs: windowMs,
        message: 'Zadejte heslo pro časovou validaci.',
      }
    }

    const elapsedMs = passwordData.updatedAt - passwordData.createdAt
    const isValid = elapsedMs >= windowMs

    return {
      isValid,
      elapsedMs,
      minMs: windowMs,
      message: isValid
        ? `Čas zadání hesla je v pořádku (${(elapsedMs / 1000).toFixed(1)} s).`
        : `Heslo bylo zadáno příliš rychle (${(elapsedMs / 1000).toFixed(1)} s). Minimum je ${
            windowMs / 1000
          } s.`,
    }
  }, [passwordData.createdAt, passwordData.updatedAt, passwordData.value, windowMs])

  useEffect(() => {
    onValidationChange(result)
  }, [onValidationChange, result])

  return (
    <section className="validator-card card shadow-sm">
      <h2>Časová validace</h2>
      <p className={result.isValid ? 'success' : 'warning'}>{result.message}</p>
    </section>
  )
}

export default PasswordTimeValidator
