"use client";
export const dynamic = "force-dynamic";
import React, {Suspense} from 'react'
import AdaptiveQuestionnaire from '../../components/questionnaire/questionnaire.jsx'
const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading questionnaire...</div>}>
        <AdaptiveQuestionnaire/>
        </Suspense>
    </div>
  )
}

export default page