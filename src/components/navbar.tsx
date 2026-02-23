import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/ui/logo'
import { BaseButton } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/icons'

export function Navbar() {
  return (
    <div className="fixed top-4 right-0 left-0 z-50 flex justify-center px-6">
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass flex items-center justify-between gap-10 rounded-full px-6 py-2.5"
      >
        <Link to="/">
          <Logo size={30} />
        </Link>

        <nav className="flex items-center gap-1">
          <BaseButton
            variant="ghost"
            size="sm"
            asChild
            className="rounded-full"
          >
            <a
              href="https://github.com/MrHacker26/deckgl-playground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="mr-2 size-4" />
              GitHub
            </a>
          </BaseButton>
        </nav>
      </motion.header>
    </div>
  )
}
