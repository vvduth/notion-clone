"use client"
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import {useMutation} from "convex/react"
import { PlusCircle } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
// src={"https://source.unsplash.com/1600x900/?reading"}

const DocumentsPage = () => {
  const {user} = useUser()
  const create = useMutation(api.documents.create); 
  const router = useRouter(); 

  const onCreate = () => {
    const promise = create({title: "Untitled"}).then((documentId) => router.push(`/documents/${documentId}`) )
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to created, try again later."
    })
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image 
        src={"https://source.unsplash.com/1600x900/?usman"}
        height={"400"}
        width={"400"}
        alt='Empty'
        className='block dark:hidden'
      />
      <Image 
        src={"https://source.unsplash.com/1600x900/?samurai"}
        height={"400"}
        width={"400"}
        alt='Empty'
        className='hidden dark:block'
      /> 
      <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Notion Clone</h2> 
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage
