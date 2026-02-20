'use client'

import { UGANDA_DISTRICTS } from '@/lib/data/uganda-districts'

interface UgandaDistrictSelectProps {
  value: string
  onChange: (value: string) => void
  error?: string
  name?: string
  required?: boolean
}

export default function UgandaDistrictSelect({
  value,
  onChange,
  error,
  name = 'location',
  required = false,
}: UgandaDistrictSelectProps) {
  return (
    <div>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-brand-green'
        }`}
      >
        <option value="">Select District</option>
        {UGANDA_DISTRICTS.map((group) => (
          <optgroup key={group.region} label={group.region}>
            {group.districts.map((district) => (
              <option key={`${group.region}-${district}`} value={district}>
                {district}
              </option>
            ))}
          </optgroup>
        ))}
        <option value="other">Other (specify in message)</option>
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
