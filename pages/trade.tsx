import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import Web3CustomButton from '../components/Web3Connect'

export default function Trade() {
  return (
    <>
      {/* Predefined button  */}
      <Web3Button icon="hide" label="Connect Wallet" balance="show" />
      <br />

      {/* Network Switcher Button */}
      <Web3NetworkSwitch />
      <br />

      {/* Custom button */}
      <Web3CustomButton />
    </>
  )
}