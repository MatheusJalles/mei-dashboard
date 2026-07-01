import logoImg from '../assets/logo.png'

interface Props {
  size?: number
}

export default function Logo({ size = 32 }: Props) {
  return (
    <img
      src={logoImg}
      alt="Caixinha MEI"
      width={size}
      height={size}
      style={{ borderRadius: 8 }}
    />
  )
}