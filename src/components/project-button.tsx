'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ProjectButton() {
  return (
    <Button 
      variant="secondary" 
      className="flex items-center mt-8"
      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
    >
      View My Projects <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  )
}