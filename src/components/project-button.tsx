'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function ProjectButton() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/projects');
  };

  return (
    <Button 
      variant="secondary" 
      className="flex items-center mt-8"
      onClick={handleClick}
    >
      View My Projects <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  )
}