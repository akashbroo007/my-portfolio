'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProjectButton() {
  const projectPath = process.env.NODE_ENV === 'production' ? '/my-portfolio/projects' : '/projects';
  
  return (
    <Link href={projectPath}>
      <Button 
        variant="secondary" 
        className="flex items-center mt-8"
      >
        View My Projects <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  )
}