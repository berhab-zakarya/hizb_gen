import FlipBook from '@/components/FlipBookTest'
import React, { Suspense } from 'react'

const Book = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <FlipBook/>
    </Suspense>
  )
}

export default Book