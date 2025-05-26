"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { templates } from '@/constants/templates'
import { cn } from '@/lib/utils'
import React from 'react'
import { Plus, FileText } from 'lucide-react'

const TemplatesGallery = () => {
  const isCreating = false

  return (
    <div className='bg-white/80 backdrop-blur-sm border-b border-gray-100'>
      <div className="max-w-screen-xl mx-auto px-8 py-8 flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className='text-lg font-medium text-gray-900'>Start a new document</h3>
            <p className="text-sm text-gray-500">Choose a template to get started</p>
          </div>
          <button 
            className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            disabled={isCreating}
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">New Blank</span>
          </button>
        </div>

        <Carousel className="w-full">
          <CarouselContent className='-ml-4'>
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4'
              >
                <div className={cn(
                  "group relative aspect-[3/4] flex flex-col gap-y-3",
                  isCreating && "pointer-events-none opacity-50"
                )}>
                  <button
                    disabled={isCreating}
                    onClick={() => {}}
                    style={{ backgroundImage: `url(${template.imageUrl})` }}
                    className={cn(
                      'relative bg-cover bg-center bg-no-repeat size-full rounded-lg border border-gray-200',
                      'hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10',
                      'transition-all duration-200 ease-in-out',
                      'bg-white overflow-hidden'
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-gray-900">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium">Use template</span>
                      </div>
                    </div>
                  </button>
                  <p className='text-sm font-medium text-gray-900 truncate'>{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  )
}

export default TemplatesGallery