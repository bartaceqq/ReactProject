import { useState } from 'react'
import type { PasswordData } from './passwordTypes'

type PasswordInputProps = {
  passwordData: PasswordData
  setPassword: (value: string) => void
}

function PasswordInput({ passwordData, setPassword }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="password-input card shadow-sm">
      <label htmlFor="password">Heslo</label>
      <div className="input-row">
        <input
          className="form-control"
          id="password"
          type={isVisible ? 'text' : 'password'}
          enterKeyHint="done"
          value={passwordData.value}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Zadejte heslo"
        />
        <button type="button" className="btn btn-primary" onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? 'Skrýt' : 'Zobrazit'}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
