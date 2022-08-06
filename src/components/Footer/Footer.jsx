import React from 'react';
import './Footer.scss'

export default function Footer() {
  const date = new Date()
  const currentYear = date.getFullYear()

  return (
    <footer>Copyright © {currentYear } Yulia Gulimova</footer>
  )
}
