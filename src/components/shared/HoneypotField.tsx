interface HoneypotFieldProps {
  name?: string
  register?: (name: string) => Record<string, unknown>
}

export default function HoneypotField({
  name = 'website',
  register,
}: HoneypotFieldProps) {
  return (
    <div
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor={`honeypot-${name}`}>
        Do not fill this out if you are human
      </label>
      <input
        id={`honeypot-${name}`}
        type="text"
        name={name}
        tabIndex={-1}
        autoComplete="off"
        {...(register ? register(name) : {})}
      />
    </div>
  )
}
