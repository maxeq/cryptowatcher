import Image from 'next/image'

function Logo() {
  return <Image src="/logo.png" alt="logo" width="128" height="128" className="hover:animate-spin" />
}

export default Logo